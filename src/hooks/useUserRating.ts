import { useState, useEffect } from "react";

import { getUserGlobalRating } from "@/services/leaderboard";

import { getRollNumberFromEmail } from "@/utils";

export const useUserRating = (email: string) => {
    const [rating, setRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            if (!email) {
                setRating(0);
                setIsLoading(false);

                return;
            }

            const rollNumber = getRollNumberFromEmail(email);
            const score = await getUserGlobalRating(rollNumber);
            setRating(score);
            setIsLoading(false);
        };

        fetchRating();
    }, [email]);

    return { rating, isLoading };
};
