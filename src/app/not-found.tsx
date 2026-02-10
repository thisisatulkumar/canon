import Link from "next/link"

import Header from "@/components/Header/Header"

import { Button } from "@/components/ui/button"

import { Compass } from "lucide-react"

const NotFound = () => {
    return (
        <>
            <Header notFound />

            <div className="flex">
                <div className="flex h-[90vh] w-full items-center justify-center bg-background px-6">
                    <div className="mx-auto w-full text-center space-y-6">
                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-muted">
                                <Compass className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Error Code */}
                        <p className="text-sm font-medium text-muted-foreground">
                            404
                        </p>

                        {/* Title */}
                        <h1 className="text-4xl font-bold tracking-tight">
                            Page not found
                        </h1>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">
                            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                        </p>

                        {/* Return Home button */}
                        <div className="flex justify-center">
                            <Button asChild>
                                <Link href="/">
                                    Return Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
