import type { Sex } from "./sex";

export type LeaderboardType = 'global' | 'category';

export interface LeaderboardEntry {
    id: number;
    type: LeaderboardType;
    category_id: string | null;
    gender: Sex;
    roll_number: string;
    rank: number;
    score: number;
    snapshot_hour: string;
    user?: {
        profile_pic_url?: string;
        student?: {
            name: string;
            branch: string;
        }
    }
}
