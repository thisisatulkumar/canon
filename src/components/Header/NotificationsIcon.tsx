import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNotifications } from "@/hooks";

import { IconBell } from "@tabler/icons-react";

const NotificationsIcon = () => {
    const { unreadCount } = useNotifications();

    return (
        <Link href="/notifications">
            <Button
                variant="outline"
                size="icon"
                className="relative"
            >
                <IconBell size={20} />

                {unreadCount > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full p-0.5 text-[10px]"
                    >
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </Badge>
                )}
            </Button>
        </Link>
    )
}

export default NotificationsIcon
