"use client"

import ModeToggle from "./ModeToggle"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { useRouteSegment } from "@/hooks"

import { deSlufigy } from "@/utils"

interface HeaderProps {
    notFound?: boolean;
}

const Header = ({ notFound }: HeaderProps) => {
    const segment = useRouteSegment();
    let title = deSlufigy(segment);
    if (title === '/') title = 'Home';
    
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />

                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />

                {/* Page Title */}
                <h1 className="text-base font-medium">{notFound ? '404' : title}</h1>
                
                {/* Mode Toggle */}
                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
