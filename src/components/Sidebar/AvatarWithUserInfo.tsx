import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/components/ui/avatar'

interface AvatarWithUserInfoProps {
    username: string;
    email: string;
    imageUrl: string;
}

const AvatarWithUserInfo = ({ 
    username, 
    email,
    imageUrl
}: AvatarWithUserInfoProps) => {
    return (
        <>
            {/* User Avatar */}
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                    src={imageUrl}
                    alt={username}
                />
                <AvatarFallback className="rounded-lg">
					User profile
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
