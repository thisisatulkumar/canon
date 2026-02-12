'use client'

import { use, useEffect, useState } from "react"

import { notFound } from "next/navigation"
import Link from "next/link"

import Header from "@/components/Header/Header"
import Loader from "@/components/Loader"

import { getCategoryBySlug } from "@/services/categories"
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react"

const Page = ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = use(params);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNotFound, setIsNotFound] = useState<boolean>(false);

    useEffect(() => {
        const validateCategory = async () => {
            setIsLoading(true);

            const categoryData = await getCategoryBySlug(category);
            if (!categoryData) {
                setIsNotFound(true);
                return;
            }

            setIsLoading(false);
        }

        validateCategory();
    }, [category]);


    if (isNotFound) {
        return notFound();
    }

    return (
        <>
            <Header />

            {isLoading ? (
                <div className="h-[90vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="h-[75vh] flex flex-col justify-center gap-6 w-[80%] lg:w-[50%] xl:w-[30%] mx-auto">
                    <Link
                        href={`/arena/${category}/boys`}
                        className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500 focus:outline-none"
                    >
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Boys
                                </h2>

                                <IconGenderMale className="size-10 text-blue-500" />
                            </div>

                            <p className="text-muted-foreground text-sm">
                                Kings of IET Lucknow
                            </p>
                        </div>

                        <div className="absolute inset-0 bg-linear-to-br  from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>

                    <Link
                        href={`/arena/${category}/girls`}
                        className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-pink-500 focus:outline-none"
                    >
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Girls
                                </h2>

                                <IconGenderFemale className="size-10 text-pink-500" />
                            </div>

                            <p className="text-muted-foreground text-sm">
                                Queens of IET Lucknow
                            </p>
                        </div>

                        <div className="absolute inset-0 bg-linear-to-br  from-pink-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                </div>
            )}
        </>
    )
}

export default Page
