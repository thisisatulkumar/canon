"use client"

import Link from "next/link"

import {
    useUser,
    SignInButton
} from "@clerk/nextjs"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

import MainSidebarGroup from "./SidebarGroups/MainSidebarGroup"
import SecondarySidebarGroup from "./SidebarGroups/SecondarySidebarGroup"
import SidebarUser from "./SidebarUserProfile/SidebarUser"
import Loading from "./SidebarUserProfile/Loading"

import {
    IconStar,
    IconBell,
    IconSearch,
    IconTrophy,
    IconBrandWhatsapp
} from "@tabler/icons-react"

const whatsAppMessage =
    "👀 You might be on this list.\n\n" +
    "Anonymous college rankings just dropped.\n\n" +
    "See for yourself 👇\n" +
    "https://thecanon.vercel.app\n\n" + 
    "*Sign in using your college email ID*";

const links = {
    mainLinks: [
        {
            title: "Leaderboard",
            url: "/",
            icon: IconTrophy,
        },
        {
            title: "The Arena",
            url: "/arena",
            icon: IconStar,
        },
        {
            title: "Notifications",
            url: "/notifications",
            icon: IconBell,
        }
    ],
    secondaryLinks: [
        {
            title: "Share on WhatsApp",
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppMessage)}`,
            icon: IconBrandWhatsapp
        },
        {
            title: "How it Works?",
            url: "/how-it-works",
            icon: IconSearch,
        }
    ],
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { isSignedIn, user, isLoaded } = useUser();

    const { setOpenMobile } = useSidebar();

    return (
        <Sidebar
            collapsible="offcanvas"
            {...props}
        >
            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <Link
                                href="/"
                                onClick={() => setOpenMobile(false)}
                            >
                                <span className="text-base font-semibold">
                                    Canon
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
                <MainSidebarGroup items={links.mainLinks} />

                <SecondarySidebarGroup
                    items={links.secondaryLinks}
                    className="mt-auto"
                />
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
                {
                    isLoaded ? (
                        isSignedIn ? (
                            <SidebarUser
                                email={user.primaryEmailAddress?.toString() ?? ""}
                                imageUrl={user.imageUrl ?? ""}
                            />
                        ) : (
                            <SignInButton mode="modal">
                                <Button>
                                    Login
                                </Button>
                            </SignInButton>
                        )
                    ) : (
                        <Loading />
                    )
                }
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
