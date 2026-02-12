'use client'

import { use, useState, useEffect } from "react"

import { notFound, useRouter } from "next/navigation"

import { useUser } from "@clerk/nextjs"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import Header from "@/components/Header/Header"
import LoadError from "@/components/LoadError"
import ArenaAccordionSkeletons from "@/components/Skeletons/Arena/ArenaAccordionSkeletons"
import VotingSuccessfulDialog from "@/components/Arena/VotingSuccessfulDialog"

import { hasUserVoted, castVotes, getCategoryBySlug } from "@/services"

import { useStudents } from "@/hooks/useStudents"

import { deSlufigy, groupStudentsByBranch, getBranchLabel, formatStudentName, getRollNumberFromEmail } from "@/utils"

import { BRANCHES } from "@/lib/constants"

import type { Student, Category } from "@/types"

import { X, User, Trophy, Loader2 } from "lucide-react"

const Page = ({ params }: { params: Promise<{ category: string; sex: string }> }) => {
    const { category, sex: sexParam } = use(params);

    const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();

    const router = useRouter();

    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [isCheckingVote, setIsCheckingVote] = useState(true);
    const [isCasting, setIsCasting] = useState(false);
    const [categoryData, setCategoryData] = useState<Category | null>(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [nextUpdateTime, setNextUpdateTime] = useState("");

    const sex = sexParam === 'boys' ? 'm' : 'f';

    const { students, isLoading: isStudentsLoading, error, refetch } = useStudents(sex);

    useEffect(() => {
        const init = async () => {
            const cat = await getCategoryBySlug(category);
            if (!cat) {
                setCategoryData(null);
            } else {
                setCategoryData(cat);
            }

            if (isSignedIn && user && cat) {
                const rollNumber = getRollNumberFromEmail(user.primaryEmailAddress?.emailAddress!);
                if (rollNumber) {
                    const voted = await hasUserVoted(rollNumber, cat.id, sex);
                    setHasVoted(voted);
                }
            }

            setIsCheckingVote(false);
        };

        if (isUserLoaded) {
            init();
        }
    }, [category, user, isUserLoaded, isSignedIn, sex]);

    if (sexParam !== 'boys' && sexParam !== 'girls') {
        return notFound();
    }

    if (!isCheckingVote && !categoryData) {
        return notFound();
    }

    const userRollNumber = getRollNumberFromEmail(user?.primaryEmailAddress?.emailAddress!);
    const filteredStudents = students.filter(student => student.roll_number !== userRollNumber);
    const groupedStudents = groupStudentsByBranch(filteredStudents);

    const toggleStudent = (student: Student) => {
        if (hasVoted) return;

        setSelectedStudents((prev) => {
            const isSelected = prev.some(s => s.roll_number === student.roll_number);
            if (isSelected) {
                return prev.filter(s => s.roll_number !== student.roll_number);
            }
            if (prev.length >= 3) return prev;
            return [...prev, student];
        });
    }

    const calculateNextUpdateTime = () => {
        const now = new Date();
        const nextHour = new Date(now);
        nextHour.setHours(now.getHours() + 1, 0, 0, 0);

        return nextHour.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const handleCastVote = async () => {
        if (!isSignedIn || !user || !categoryData || selectedStudents.length !== 3) return;

        const rollNumber = getRollNumberFromEmail(user.primaryEmailAddress?.emailAddress!);
        if (!rollNumber) return;

        setIsCasting(true);
        const { success, error: castError } = await castVotes(
            categoryData.id,
            rollNumber,
            selectedStudents.map(s => s.roll_number),
            sex
        );

        if (success) {
            setHasVoted(true);
            setSelectedStudents([]);
            setNextUpdateTime(calculateNextUpdateTime());
            setShowSuccessDialog(true);
        } else {
            // TODO: Replace with proper alerts - toast
            alert(castError || "Failed to cast vote. Please try again.");
        }
        setIsCasting(false);
    };

    const isLoading = isStudentsLoading || isCheckingVote;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main className="flex flex-1 flex-col lg:flex-row">
                {/* List of students branch-wise */}
                <div className="w-full lg:w-[70%]">
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex flex-col gap-4">
                                <ArenaAccordionSkeletons count={8} />
                            </div>
                        ) : error ? (
                            <LoadError
                                error={error}
                                refetch={refetch}
                            />
                        ) : (
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue={Object.keys(BRANCHES)[0]}
                                className="w-full"
                            >
                                {Object.entries(BRANCHES).map(([key, branch]) => {
                                    const branchStudents = groupedStudents[branch.value] || [];
                                    if (branchStudents.length === 0) return null;

                                    return (
                                        <AccordionItem
                                            key={key}
                                            value={branch.value}
                                            className="border-b-0 px-1"
                                        >
                                            <AccordionTrigger className="hover:no-underline">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-semibold">{branch.label}</span>

                                                    <Badge
                                                        variant="secondary"
                                                        className="font-mono"
                                                    >
                                                        {branchStudents.length}
                                                    </Badge>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4">
                                                    {branchStudents.map((student) => {
                                                        const isSelected = selectedStudents.some(s => s.roll_number === student.roll_number);
                                                        return (
                                                            <div
                                                                key={student.roll_number}
                                                                onClick={() => toggleStudent(student)}
                                                                className={cn(
                                                                    "group relative cursor-pointer overflow-hidden rounded-md border-2 px-4 py-3 transition-all duration-300 hover:shadow-md",
                                                                    isSelected
                                                                        ? "border-primary bg-primary/5 shadow-inner"
                                                                        : "bg-card border-transparent hover:border-muted-foreground/20",
                                                                    hasVoted && "cursor-default opacity-80"
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex flex-col truncate">
                                                                        <span className="truncate font-medium group-hover:text-primary transition-colors">
                                                                            {formatStudentName(student.name)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}

                                {students.length === 0 && (
                                    <div className="py-20 text-center">
                                        <p className="text-muted-foreground">No students found for this search.</p>
                                    </div>
                                )}
                            </Accordion>
                        )}
                    </div>
                </div>

                {/* Selection Panel */}
                <aside className="w-full lg:w-[30%]">
                    <div className="mt-6 p-6">
                        {hasVoted ? (
                            <Card className="border-2 border-primary/20 shadow-lg bg-primary/5">
                                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Trophy className="size-8 text-primary" />
                                    </div>

                                    <h3 className="text-xl font-bold">Vote Recorded!</h3>

                                    <p className="text-sm text-muted-foreground">
                                        You have already cast your votes for <strong>{deSlufigy(sexParam)}</strong> in the <strong>{categoryData?.name}</strong> category.
                                    </p>

                                    <Badge variant="outline" className="mt-2">
                                        Thank you for participating
                                    </Badge>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border-2 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-bold">Your Picks</h3>

                                        <Badge
                                            variant={selectedStudents.length === 3 ? "default" : "outline"}
                                            className="px-3 py-1"
                                        >
                                            {selectedStudents.length} / 3
                                        </Badge>
                                    </div>

                                    <div className="space-y-3 min-h-[180px]">
                                        {selectedStudents.length > 0 ? (
                                            selectedStudents.map((student) => (
                                                <div
                                                    key={student.roll_number}
                                                    className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3 animate-in fade-in slide-in-from-right-2"
                                                >
                                                    <div className="flex flex-col truncate">
                                                        <span className="truncate text-sm font-semibold">{formatStudentName(student.name)}</span>

                                                        <span className="text-muted-foreground text-[10px] font-mono">{getBranchLabel(student.branch)}</span>
                                                    </div>

                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="size-8 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleStudent(student);
                                                        }}
                                                    >
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex h-[180px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 text-center">
                                                <User className="mb-2 size-8 text-muted-foreground opacity-50" />
                                                <p className="text-sm text-muted-foreground">
                                                    Pick 3 {sexParam} to cast your vote
                                                </p>
                                            </div>
                                        )}

                                        {selectedStudents.length > 0 && selectedStudents.length < 3 && (
                                            Array.from({ length: 3 - selectedStudents.length }).map((_, i) => (
                                                <div
                                                    key={`placeholder-${i}`}
                                                    className="h-[52px] rounded-lg border-2 border-dashed border-muted flex items-center justify-center"
                                                />
                                            ))
                                        )}
                                    </div>

                                    <Button
                                        className="mt-8 w-full py-6 text-lg font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        disabled={selectedStudents.length !== 3 || isCasting}
                                        onClick={handleCastVote}
                                    >
                                        {isCasting ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="size-5 animate-spin" />
                                                Casting...
                                            </div>
                                        ) : (
                                            "Cast Vote"
                                        )}
                                    </Button>

                                    <p className="mt-4 text-center text-xs text-muted-foreground">
                                        Pick exactly 3 {sexParam} to proceed with the vote.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </aside>
            </main>

            <VotingSuccessfulDialog
                showSuccessDialog={showSuccessDialog}
                setShowSuccessDialog={setShowSuccessDialog}
                nextUpdateTime={nextUpdateTime}
            />
        </div>
    )
}

export default Page
