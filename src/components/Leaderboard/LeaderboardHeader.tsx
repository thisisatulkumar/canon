import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight } from "lucide-react";

const LeaderboardHeader = ({
    navigateNext,
    navigatePrev,
    activeTitle,
}: {
    navigateNext: () => void;
    navigatePrev: () => void;
    activeTitle: string;
}) => {
    return (
        <div className="flex items-center gap-6">
            <Button
                variant="outline"
                size="icon"
                onClick={navigatePrev}
                className="rounded-full"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center min-w-[240px]">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
                    {activeTitle}
                </h2>
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={navigateNext}
                className="rounded-full"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default LeaderboardHeader
