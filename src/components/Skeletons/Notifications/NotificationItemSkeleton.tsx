import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationItemSkeleton = () => {
    return (
        <Card className="overflow-hidden border-muted/40 shadow-sm">
            <CardContent className="flex items-start gap-4 p-4">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </CardContent>
        </Card>
    )
}

export default NotificationItemSkeleton
