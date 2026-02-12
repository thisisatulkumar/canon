import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import { Category } from "@/types/category";

export const getActiveCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from(DB_TABLES.CATEGORIES)
        .select("*")
        .eq("is_active", true)
        .order("weight_factor", { ascending: false });

    if (error) {
        throw error;
    }

    return data || [];
}

// TODO: Maybe, this can be replaced by a query that counts instead of fetching the whole row and also the errors can be handled in a better way instead of just logging it into the console
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    const { data, error } = await supabase
        .from(DB_TABLES.CATEGORIES)
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error || !data) {
        if (error && error.code !== 'PGRST116') { // PGRST116 is code for no rows found for .single()
            console.error("Error fetching category by slug:", error);
        }

        return null;
    }

    return data;
}
