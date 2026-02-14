import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'

import { getRollNumberFromEmail } from '@/utils';
import { useUserRating } from '@/hooks';

interface AvatarWithUserInfoProps {
    email: string;
    imageUrl: string;
}

const AvatarWithUserInfo = ({
    email,
    imageUrl
}: AvatarWithUserInfoProps) => {
    const { rating, isLoading } = useUserRating(email);

    return (
        <>
            {/* User Avatar */}
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                    src={imageUrl}
                    alt={getRollNumberFromEmail(email)}
                />
                <AvatarFallback className="rounded-lg">
                    {getRollNumberFromEmail(email)}
                </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    Your Profile
                </span>

                {/* Rating */}
                <span className="text-muted-foreground truncate text-xs">
                    {isLoading ? "Loading..." : `Rating: ${rating?.toFixed(0) ?? 0}`}
                </span>
            </div>
        </>
    )
}

export default AvatarWithUserInfo
