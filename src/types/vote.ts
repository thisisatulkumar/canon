import { Sex } from "./sex";

export interface Vote {
    id: number;
    category_id: string;
    voter_roll: string;
    voted_roll: string;
    voted_gender: Sex;
    created_at?: string;
}
