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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

import {
    IconHome,
} from "@tabler/icons-react"

import MainSidebarGroup from "./MainSidebarGroup"
import SecondarySidebarGroup from "./SecondarySidebarGroup"
import SidebarUser from "./SidebarUser"
import Loading from "./Loading"

const links = {
    mainLinks: [
        {
            title: "Home",
            url: "/",
            icon: IconHome,
        },
    ],
    secondaryLinks: [
    ],
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { isSignedIn, user, isLoaded } = useUser();

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
                            <Link href="/">
                                <span className="text-base font-semibold">Canon</span>
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
                                username={user.username ?? ""}
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
