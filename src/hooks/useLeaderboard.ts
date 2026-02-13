import { useState, useEffect, useCallback } from "react";

import { getLeaderboard, getActiveCategories } from "@/services";

import type { Category, Branch, Sex, LeaderboardEntry, LeaderboardType } from "@/types";

export const useLeaderboard = () => {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(-1); // -1 for Global
    const [sex, setSex] = useState<Sex>("m");
    const [branch, setBranch] = useState<Branch | "all">("all");

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getActiveCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const fetchLeaderboard = useCallback(async () => {
        setIsLoading(true);

        const type: LeaderboardType = activeCategoryIndex === -1 ? "global" : "category";
        const categoryId = activeCategoryIndex === -1 ? undefined : categories[activeCategoryIndex]?.id;

        const data = await getLeaderboard(type, sex, categoryId, branch);
        setEntries(data);

        setIsLoading(false);
    }, [activeCategoryIndex, sex, categories, branch]);


    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    const navigateNext = () => {
        setActiveCategoryIndex((prev) => (prev + 1 >= categories.length ? -1 : prev + 1));
    };

    const navigatePrev = () => {
        setActiveCategoryIndex((prev) => (prev - 1 < -1 ? categories.length - 1 : prev - 1));
    };

    const activeTitle = activeCategoryIndex === -1 ? "Most Popular" : categories[activeCategoryIndex]?.name;

    return {
        entries,
        isLoading,
        sex,
        setSex,
        activeTitle,
        navigateNext,
        navigatePrev,
        activeCategoryIndex,
        branch,
        setBranch,
    };
}
