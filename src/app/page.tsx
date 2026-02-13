import Link from "next/link";

import { Button } from "@/components/ui/button";

import Header from "@/components/Header/Header";
import Leaderboard from "@/components/Leaderboard/Leaderboard";
import LeaderboardRefreshCountdown from "@/components/Leaderboard/LeaderboardRefreshCountdown";

const Page = () => {
    return (
        <div className="flex flex-col">
            <Header />

            <main className="container mx-auto max-w-7xl flex-1 px-4 py-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
                    <div className="w-full lg:w-[70%]">
                        <Leaderboard />
                    </div>

                    <div className="w-full lg:w-[30%] flex flex-col gap-4 items-center">
                        <Link
                            href="/arena"
                            className="w-full"
                        >
                            <Button className="w-full py-7 text-xl font-black uppercase tracking-tighter bg-linear-to-r from-orange-500 via-rose-500 to-purple-600 hover:from-orange-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-rose-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-none cursor-pointer">
                                Drop your votes 🔥
                            </Button>
                        </Link>

                        <LeaderboardRefreshCountdown />

                        <div className="flex flex-col gap-2 items-center text-xs text-muted-foreground/60 px-1 w-full text-center">
                            <p>
                                Built to cope up with depression by{" "}
                                <a
                                    href="https://www.linkedin.com/in/thisisatulkumar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors underline underline-offset-2"
                                >
                                    Atul Kumar
                                </a>
                            </p>

                            <p>
                                <a
                                    href="https://github.com/thisisatulkumar/canon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors underline underline-offset-2"
                                >
                                    Source Code
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Page;
