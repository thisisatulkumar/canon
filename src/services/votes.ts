import { supabase } from "@/lib/supabase";
import { DB_TABLES } from "@/lib/constants";
import { Sex } from "@/types";

export const hasUserVoted = async (
    voterRoll: string,
    categoryId: string,
    sex: Sex
): Promise<boolean> => {
    const { data, error } = await supabase
        .from(DB_TABLES.VOTES)
        .select("id")
        .eq("voter_roll", voterRoll)
        .eq("category_id", categoryId)
        .eq("voted_gender", sex);

    if (error) {
        return false;
    }

    return data && data.length > 0;
};

export const castVotes = async (
    categoryId: string,
    voterRoll: string,
    votedRolls: string[],
    votedGender: Sex
): Promise<{ success: boolean; error?: string }> => {
    const voteData = votedRolls.map((votedRoll) => ({
        category_id: categoryId,
        voter_roll: voterRoll,
        voted_roll: votedRoll,
        voted_gender: votedGender,
    }));

    const { error } = await supabase.from(DB_TABLES.VOTES).insert(voteData);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
};
