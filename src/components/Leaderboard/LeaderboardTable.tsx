import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"

import LeaderboardRowSkeletons from "@/components/Skeletons/Leaderboard/LeaderboardRowSkeletons";

import { formatStudentName, getBranchLabel } from "@/utils";

import type { LeaderboardEntry, Branch } from "@/types";

const LeaderboardTable = ({
    entries,
    isLoading,
    activeTitle,
}: {
    entries: LeaderboardEntry[];
    isLoading: boolean;
    activeTitle: string;
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[80px] text-center font-bold">
                        Rank
                    </TableHead>

                    <TableHead className="font-bold">
                        Student
                    </TableHead>

                    <TableHead className="text-right font-bold ${}">
                        <span className={`${activeTitle !== 'Most Popular' ? 'hidden' : ''}`}>
                            Rating
                        </span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {isLoading ? (
                    <LeaderboardRowSkeletons />
                ) : entries.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={3}
                            className="h-32 text-center text-muted-foreground"
                        >
                            No votes yet.
                        </TableCell>
                    </TableRow>
                ) : (
                    entries.map((entry) => (
                        <TableRow
                            key={entry.id}
                            className="hover:bg-muted/30 transition-colors"
                        >
                            <TableCell className="text-center">
                                {entry.rank === 1 ? (
                                    <div className="flex justify-center text-lg">
                                        🥇
                                    </div>
                                ) : entry.rank === 2 ? (
                                    <div className="flex justify-center text-lg">🥈</div>
                                ) : entry.rank === 3 ? (
                                    <div className="flex justify-center text-lg">🥉</div>
                                ) : (
                                    <span className="font-medium text-muted-foreground">{entry.rank}</span>
                                )}
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">
                                            {formatStudentName(entry.user?.student?.name!)}
                                        </span>

                                        <span className="text-[10px] text-muted-foreground uppercase leading-none mt-0.5 font-bold">
                                            {getBranchLabel(entry.user?.student?.branch! as Branch)}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <span className={`${activeTitle !== 'Most Popular' ? 'hidden' : ''}`}>
                                    <Badge
                                        variant="secondary"
                                        className="font-mono bg-primary/10 text-primary border-none"
                                    >
                                        {entry.score.toFixed(0)}
                                    </Badge>
                                </span>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default LeaderboardTable
