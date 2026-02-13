"use client"

import { useUser } from "@clerk/nextjs";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import Header from "@/components/Header/Header";
import NotificationItem from "@/components/Notifications/NotificationItem";
import NotificationItemSkeletons from "@/components/Skeletons/Notifications/NotificationItemSkeletons";

import {
    Bell,
    Inbox,
} from "lucide-react";

import { useNotifications } from "@/hooks";

import { Notification } from "@/types";
import LoadError from "@/components/LoadError";

const Page = () => {
    const { isLoaded: isUserLoaded, isSignedIn } = useUser();

    const {
        notifications,
        isLoading,
        error,
        markAsRead,
        refetch
    } = useNotifications();

    if (!isUserLoaded || (isUserLoaded && !isSignedIn)) {
        return (
            <div className="flex flex-col">
                <Header />

                <main className="flex flex-1 items-center justify-center p-6">
                    <Card className="max-w-md w-full border-2 border-dashed border-muted">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center gap-4">
                            <div className="rounded-full bg-muted p-3">
                                <Bell className="size-8 text-muted-foreground opacity-50" />
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-xl font-bold">Please log in</h2>

                                <p className="text-muted-foreground text-sm">
                                    You need to be logged in to view your notifications.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <Header />

            <main className="container mx-auto max-w-3xl flex-1 px-4 py-8 lg:px-8">
                {/* Header Section */}
                <div className="mb-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">Notifications</h1>
                </div>

                <Separator className="mb-8" />

                {/* Notifications List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <NotificationItemSkeletons />
                    ) : error ? (
                        <LoadError
                            error={error}
                            refetch={refetch}
                        />
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                            <div className="rounded-full bg-muted p-4">
                                <Inbox className="size-12 text-muted-foreground opacity-20" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold">All caught up!</h3>

                                <p className="max-w-[280px] text-muted-foreground text-sm">
                                    You don't have any notifications at the moment.
                                </p>
                            </div>
                        </div>
                    ) : (
                        notifications.map((notification: Notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                markAsRead={markAsRead}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Page
