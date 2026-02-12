import type { Branch } from "./branch";
import type { Sex } from "./sex";

export interface Student {
    roll_number: string;
    name: string;
    sex: Sex;
    branch: Branch;
}
