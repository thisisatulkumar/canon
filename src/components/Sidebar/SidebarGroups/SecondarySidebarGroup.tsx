import Link from "next/link"

import { ComponentPropsWithoutRef } from "react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import { useRouteSegment } from "@/hooks"

import type { Icon } from "@tabler/icons-react"

const SecondarySidebarGroup = ({
    items,
    ...props
}: {
    items: {
        title: string
        url: string
        icon: Icon
    }[]
} & ComponentPropsWithoutRef<typeof SidebarGroup>) => {
    const segment = useRouteSegment();

    const { setOpenMobile } = useSidebar();

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                isActive={item.url.slice(1) === segment}
                                asChild
                            >
                                <Link
                                    href={item.url}
                                    onClick={() => setOpenMobile(false)}
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default SecondarySidebarGroup
