'use client'

import Link from "next/link"
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Loader from "@/components/Loader";

interface CardImageProps {
    title: string;
    slug: string;
}

const CategoryCard = ({ title, slug }: CardImageProps) => {
    const { isLoaded, isSignedIn } = useUser();

    return (
        <div className="group flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground transition-all hover:bg-accent/60 hover:shadow-sm">
            {/* Title Section */}
            <div className="flex-1 pr-4">
                <h3 className="text-sm font-medium leading-none tracking-tight md:text-base">
                    {title}
                </h3>
            </div>

            {/* Action Section */}
            <div className="flex shrink-0 items-center justify-end min-w-[100px]">
                {!isLoaded ? (
                    <div className="h-9 w-9 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : isSignedIn ? (
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full font-semibold transition-colors group-hover:bg-primary group-hover:text-primary-foreground hover:bg-primary/80"
                    >
                        <Link href={`/arena/${slug}`}>
                            Drop Your Choice 🔥
                        </Link>
                    </Button>
                ) : (
                    <SignInButton mode="modal">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs md:text-sm"
                        >
                            Sign in to Participate
                        </Button>
                    </SignInButton>
                )}
            </div>
        </div>
    )
}

export default CategoryCard
