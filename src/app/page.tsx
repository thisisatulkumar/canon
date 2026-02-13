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

                    <LeaderboardRefreshCountdown />
                </div>
            </main>
        </div>
    );
}

export default Page;
