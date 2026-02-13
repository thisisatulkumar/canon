import NotificationItemSkeleton from "./NotificationItemSkeleton";

interface NotificationItemSkeletonsProps {
    count?: number;
}

const NotificationItemSkeletons = ({ count = 5 }: NotificationItemSkeletonsProps) => {
    return (
        Array.from({ length: count }).map((_, i) => (
            <NotificationItemSkeleton key={i} />
        ))
    )
}

export default NotificationItemSkeletons
