"use client"

import Image from "next/image"

import { useState, useEffect } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Trophy, Flame, TrendingUp } from "lucide-react"

const IntroDialog = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const hasSeenIntro = localStorage.getItem("has_seen_intro")
        if (!hasSeenIntro) {
            setOpen(true)
        }
    }, [])

    const handleClose = () => {
        localStorage.setItem("has_seen_intro", "true")
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent
                className="sm:max-w-md [&>button]:hidden"
                onInteractOutside={(event) => event.preventDefault()}
            >
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-2">
                        <Image
                            src="/icon.png"
                            width={20}
                            height={20}
                            alt="Canon"
                        />
                    </div>

                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">
                        Welcome to Canon
                    </DialogTitle>

                    <DialogDescription className="text-md">
                        <strong>100% anonymous.</strong> No names. No exposure. Just votes.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-orange-500/10 p-2 mt-1">
                            <Flame className="size-5 text-orange-500" />
                        </div>

                        <div>
                            <h4 className="font-bold">
                                Drop Your Votes
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                Pick 3 students per category. Your vote is private and cannot be traced.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-blue-500/10 p-2 mt-1">
                            <TrendingUp className="size-5 text-blue-500" />
                        </div>

                        <div>
                            <h4 className="font-bold">
                                Leaderboard Refresh
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                Rankings update every 20 minutes based on{" "}
                                <a
                                    href="https://en.wikipedia.org/wiki/Elo_rating_system"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors underline underline-offset-2"
                                >
                                    Elo rating system
                                </a>.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-yellow-500/10 p-2 mt-1">
                            <Trophy className="size-5 text-yellow-500" />
                        </div>

                        <div>
                            <h4 className="font-bold">
                                Global & Branch Rankings
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                See top students by branch or campus-wide. No one sees who you voted for.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleClose}
                        className="w-full py-6 text-lg font-bold uppercase tracking-wide bg-linear-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-none cursor-pointer"
                    >
                        Let's Go 🔥
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default IntroDialog
