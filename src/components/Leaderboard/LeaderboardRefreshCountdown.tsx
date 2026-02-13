'use client'

import { useState, useEffect } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Clock } from "lucide-react";

import { timeLeft as calculateTimeLeft } from "@/utils";

const LeaderboardRefreshCountdown = () => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full lg:w-[30%] space-y-6">
            <Card className="overflow-hidden border-none shadow-premium bg-linear-to-br from-primary/10 via-background to-background">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        Next Update
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="text-4xl font-black tracking-tighter text-primary">
                        {timeLeft}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold">
                        Leaderboard refreshes every hour
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default LeaderboardRefreshCountdown
