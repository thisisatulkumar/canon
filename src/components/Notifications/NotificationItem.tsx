import { useRef, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { useIntersectionObserver } from "@/hooks";

import { timeAgo } from "@/utils";

import { Notification } from "@/types";

const NotificationItem = ({
    notification,
    markAsRead
}: {
    notification: Notification;
    markAsRead: (id: number) => Promise<boolean>;
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const entry = useIntersectionObserver(itemRef, {
        threshold: 0.5, // 50% visible means "viewed"
        freezeOnceVisible: true
    });

    useEffect(() => {
        if (entry?.isIntersecting && !notification.is_read) {
            markAsRead(notification.id);
        }
    }, [entry?.isIntersecting, notification.id, notification.is_read, markAsRead]);

    return (
        <Card
            ref={itemRef}
            className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-md rounded-md",
                !notification.is_read
                    ? "border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-sm"
                    : "border-muted/40 shadow-none bg-card/50"
            )}
        >
            <CardContent className="flex items-start gap-4 p-0 px-6">
                <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold leading-none">
                                {notification.meta.message}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium shrink-0">
                            {notification.created_at ? timeAgo(notification.created_at) : 'just now'}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default NotificationItem
