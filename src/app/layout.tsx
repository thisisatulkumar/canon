import { Metadata } from "next";

import { CSSProperties } from "react";

import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/lib/theme";

import { shadcn } from "@clerk/themes";

import SyncClerkWithSupabase from "@/components/SyncClerkWithSupabase/SyncClerkWithSupabase";

import {
    SidebarProvider,
    SidebarInset
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import AppSidebar from "@/components/Sidebar/AppSidebar";

import "./globals.css";

export const metadata: Metadata = {
    title: "Canon",
    description: "Canon"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ theme: shadcn }}>
            <html lang="en">
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SyncClerkWithSupabase />

                        <Toaster
                            position="top-right"
                            richColors
                        />

                        <SidebarProvider
                            style={
                                {
                                    "--sidebar-width": "calc(var(--spacing) * 72)",
                                    "--header-height": "calc(var(--spacing) * 12)",
                                } as CSSProperties
                            }
                        >
                            <AppSidebar variant="inset" />

                            <SidebarInset>
                                {/* 
                                    DO NOT REMOVE THESE COMMENTS: THIS IS HOW YOU SHOULD WRITE YOUR PAGE.TSX 

                                    <>
                                        <Header />

                                        <div className="flex">
                                            {actual_stuff}
                                        </div>
                                    </>
                                */}
                                <main>
                                    {children}
                                </main>
                            </SidebarInset>
                        </SidebarProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
