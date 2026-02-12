import Link from "next/link"

import { SignOutButton } from "@clerk/nextjs"

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

import AvatarWithUserInfo from "./AvatarWithUserInfo"

import {
    IconDotsVertical,
    IconLogout,
} from "@tabler/icons-react"

interface SidebarUserProps {
    email: string;
    imageUrl: string;
}

const SidebarUser = ({
    email,
    imageUrl
}: SidebarUserProps) => {
    const { isMobile, setOpenMobile } = useSidebar();

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
                            <Link
                                href="/profile"
                                onClick={() => setOpenMobile(false)}
                            >
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <AvatarWithUserInfo
                                        email={email}
                                        imageUrl={imageUrl}
                                    />
                                </div>
                            </Link>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {/* Logout Button */}
                        <DropdownMenuItem onClick={() => setOpenMobile(false)}>
                            <IconLogout />

                            {/* TODO: Since SignOutButton's width is not full, a user can't click on the extreme left or right side of the dropdown item to sign out. */}
                            <SignOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default SidebarUser
