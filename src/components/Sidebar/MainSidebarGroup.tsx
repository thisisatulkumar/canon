import Link from "next/link"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useRouteSegment } from "@/hooks"

import type { Icon } from "@tabler/icons-react"

const MainSidebarGroup = ({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: Icon;
    }[]
}) => {
    const segment = useRouteSegment();
    
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url}>
                                <SidebarMenuButton 
                                    tooltip={item.title} 
                                    isActive={item.url.slice(1) === segment}
                                >
                                    {<item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default MainSidebarGroup
