import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

export const getUserGlobalRating = async (rollNumber: string): Promise<number> => {
    const { data, error } = await supabase
        .from(DB_TABLES.USERS)
        .select("elo_rating")
        .eq("roll_number", rollNumber)
        .single();

    if (error || !data) {
        if (error && error.code !== 'PGRST116') {
            console.error("Error fetching user rating from users table:", error);
        }

        return 0;
    }

    return data.elo_rating ?? 0;
}
