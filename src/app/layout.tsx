import { Metadata } from "next";

import { CSSProperties } from "react";

import { Analytics } from "@vercel/analytics/next"

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
import IntroDialog from "@/components/Intro/IntroDialog";

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
        <ClerkProvider
            appearance={{ theme: shadcn }}
            localization={{
                signIn: {
                    start: {
                        subtitle: "Use your college email ID",
                    }
                },
                signUp: {
                    start: {
                        subtitle: "Use your college email ID",
                    }
                },
                formFieldInputPlaceholder__emailAddress: "Use your IET Email ID"
            }}
        >
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

                            <IntroDialog />

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

                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
