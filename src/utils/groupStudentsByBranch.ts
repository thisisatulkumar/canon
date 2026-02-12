import type { Student, GroupedStudents } from "@/types";

export const groupStudentsByBranch = (students: Student[]): GroupedStudents => {
    return students.reduce((acc, student) => {
        const branch = student.branch;
        if (!acc[branch]) {
            acc[branch] = [];
        }
        acc[branch].push(student);

        return acc;
    }, {} as GroupedStudents);
};
