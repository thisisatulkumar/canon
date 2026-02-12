import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import type { Student, Sex } from "@/types";

export const getStudentsBySex = async (sex: Sex): Promise<Student[]> => {
    const { data, error } = await supabase
        .from(DB_TABLES.COLLEGE_STUDENTS)
        .select("roll_number, name, sex, branch")
        .eq("sex", sex)
        .order("name", { ascending: true });

    if (error) {
        return [];
    }

    return (data as Student[]) || [];
};
