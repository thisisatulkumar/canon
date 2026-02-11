import { SignOutButton } from "@clerk/nextjs"

import AvatarWithUserInfo from "./AvatarWithUserInfo"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    IconDotsVertical,
    IconLogout,
} from "@tabler/icons-react"

interface SidebarUserProps {
    username: string;
    email: string;
    imageUrl: string;
}

const SidebarUser = ({
    username,
    email,
    imageUrl
}: SidebarUserProps) => {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>

                    {/* Dropdown Menu Trigger */}
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <AvatarWithUserInfo
                                username={username}
                                email={email}
                                imageUrl={imageUrl}
                            />

                            <IconDotsVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    {/* Dropdown Menu Content */}
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <AvatarWithUserInfo
                                    username={username}
                                    email={email}
                                    imageUrl={imageUrl}
                                />
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {/* Logout Button */}
                        <DropdownMenuItem>
                            <IconLogout />
                            <SignOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default SidebarUser
