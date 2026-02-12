"use client"

import { useState, useEffect, useCallback } from "react";

import { getActiveCategories } from "@/services";

import { Category } from "@/types";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getActiveCategories();
            setCategories(data);
        } catch (err) {
            setError("Something went wrong while fetching categories. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        isLoading,
        error,
        refetch: fetchCategories,
    };
}
