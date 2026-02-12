"use client"

import { useState, useEffect } from "react";

import { getStudentsBySex } from "@/services/students";

import type { Student, Sex } from "@/types";

export const useStudents = (sex: Sex) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getStudentsBySex(sex);

            setStudents(data);
        } catch (err) {
            setError("Something went wrong while fetching students. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [sex]);

    return {
        students,
        isLoading,
        error,
        refetch: fetchStudents,
    };
};
