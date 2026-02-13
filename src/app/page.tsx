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
