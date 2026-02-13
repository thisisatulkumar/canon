import { useState, useEffect, useCallback } from "react";

import { useUser } from "@clerk/nextjs";

import {
    getNotifications,
    markAsRead as markAsReadService
} from "@/services";

import type { Notification } from "@/types";

export const useNotifications = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const rollNumber = user?.primaryEmailAddress?.emailAddress?.split('@')[0];

    const fetchNotifications = useCallback(async () => {
        if (!isSignedIn || !rollNumber) {
            setIsLoading(false);

            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getNotifications(rollNumber);
            setNotifications(data);
        } catch (err) {
            setError("Something went wrong while fetching notifications. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [isSignedIn, rollNumber]);

    // TODO: Setup real-time notifications

    const markAsRead = useCallback(async (notificationId: number) => {
        if (!isSignedIn || !rollNumber) return false;

        try {
            const success = await markAsReadService(notificationId);

            return success;
        } catch (err) {
            return false;
        }
    }, [isSignedIn, rollNumber]);

    useEffect(() => {
        if (isLoaded) {
            fetchNotifications();
        }
    }, [isLoaded, fetchNotifications]);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return {
        notifications,
        unreadCount,
        isLoading,
        error,
        refetch: fetchNotifications,
        markAsRead,
    };
}
