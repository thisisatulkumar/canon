import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'

import { getRollNumberFromEmail } from '@/utils';

interface AvatarWithUserInfoProps {
    email: string;
    imageUrl: string;
}

const AvatarWithUserInfo = ({ 
    email,
    imageUrl
}: AvatarWithUserInfoProps) => {
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

                {/* Email */}
                <span className="text-muted-foreground truncate text-xs">
                    {email}
                </span>
            </div>
        </>
    )
}

export default AvatarWithUserInfo
