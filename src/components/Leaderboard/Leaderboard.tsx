"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import LeaderboardTable from "./LeaderboardTable";
import SexTab from "./SexTab";
import BranchSelect from "./BranchSelect";
import LeaderboardHeader from "./LeaderboardHeader";

import { useLeaderboard } from "@/hooks";

const Leaderboard = () => {
    const {
        entries,
        isLoading,
        sex,
        setSex,
        activeTitle,
        navigateNext,
        navigatePrev,
        branch,
        setBranch,
    } = useLeaderboard();

    return (
        <Card className="w-full border-none shadow-none bg-transparent">
            <CardHeader className="flex flex-col space-y-6 items-center">
                <LeaderboardHeader
                    navigateNext={navigateNext}
                    navigatePrev={navigatePrev}
                    activeTitle={activeTitle}
                />

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <SexTab
                        sex={sex}
                        setSex={setSex}
                    />

                    <BranchSelect
                        branch={branch}
                        setBranch={setBranch}
                    />
                </div>
            </CardHeader>

            <CardContent className="px-0">
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <LeaderboardTable
                        entries={entries}
                        isLoading={isLoading}
                        activeTitle={activeTitle}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default Leaderboard;
