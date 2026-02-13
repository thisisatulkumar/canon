import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import type { Notification } from "@/types";

export const getUnreadNotificationsCount = async (
    rollNumber: string
): Promise<number> => {
    const { count, error } = await supabase
        .from(DB_TABLES.NOTIFICATIONS)
        .select("*", { count: 'exact', head: true })
        .eq("roll_number", rollNumber)
        .eq("is_read", false);

    if (error) {
        console.error("Error fetching unread notifications count:", error);

        return 0;
    }

    return count ?? 0;
}

export const getNotifications = async (
    rollNumber: string
): Promise<Notification[]> => {
    const { data, error } = await supabase
        .from(DB_TABLES.NOTIFICATIONS)
        .select("*")
        .eq("roll_number", rollNumber)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching notifications:", error);

        return [];
    }

    return data ?? [];
}

export const markAsRead = async (
    notificationId: number
): Promise<boolean> => {
    const { error } = await supabase
        .from(DB_TABLES.NOTIFICATIONS)
        .update({ is_read: true })
        .eq("id", notificationId);

    if (error) {
        console.error("Error marking notification as read:", error);

        return false;
    }

    return true;
}
