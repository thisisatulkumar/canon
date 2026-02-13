import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import type { Sex, LeaderboardType, LeaderboardEntry } from "@/types";

export const getLeaderboard = async (
    type: LeaderboardType,
    gender: Sex,
    categoryId?: string,
    branch?: string
): Promise<LeaderboardEntry[]> => {
    let query = supabase
        .from(DB_TABLES.LEADERBOARD_SNAPSHOTS)
        .select(`
            *,
            user:users!inner (
                profile_pic_url,
                student:college_students!inner (
                    name,
                    branch
                )
            )
        `)
        .eq("type", type)
        .eq("gender", gender);

    if (branch && branch !== "all") {
        query = query.eq("user.student.branch", branch);
    }

    query = query.order("rank", { ascending: true })
        .limit(10);


    if (type === 'category' && categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data: latestSnapshot, error: snapshotError } = await supabase
        .from(DB_TABLES.LEADERBOARD_SNAPSHOTS)
        .select("snapshot_hour")
        .eq("type", type)
        .eq("gender", gender)
        .order("snapshot_hour", { ascending: false })
        .limit(1);

    if (snapshotError || !latestSnapshot || latestSnapshot.length === 0) {
        if (snapshotError) console.error("Error fetching latest snapshot time:", snapshotError);

        return [];
    }

    const { data, error } = await query.eq("snapshot_hour", latestSnapshot[0].snapshot_hour);

    if (error) {
        console.error("Error fetching leaderboard entries:", error);
        
        return [];
    }

    return data as LeaderboardEntry[];
};
