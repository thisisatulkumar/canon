import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import type { Sex, LeaderboardType, LeaderboardEntry } from "@/types";

export const getLeaderboard = async (
    type: LeaderboardType,
    gender: Sex,
    categoryId?: string,
    branch?: string
): Promise<LeaderboardEntry[]> => {
    // Determine the correct type based on branch filter
    let queryType: LeaderboardType = type;
    if (branch && branch !== "all") {
        if (type === 'global') {
            queryType = 'branch_global';
        } else if (type === 'category') {
            queryType = 'branch_category';
        }
    }

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
        .eq("type", queryType)
        .eq("gender", gender);

    // For branch-specific queries, filter by roll_number that matches the branch
    if (branch && branch !== "all") {
        query = query.eq("user.student.branch", branch);
    }

    query = query.order("rank", { ascending: true })
        .limit(10);

    if ((type === 'category' || type === 'branch_category') && categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data: latestSnapshot, error: snapshotError } = await supabase
        .from(DB_TABLES.LEADERBOARD_SNAPSHOTS)
        .select("snapshot_hour")
        .eq("type", queryType)
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
}
