"use client"

import Header from "@/components/Header/Header"
import CategoryCard from "@/components/Categories/CategoryCard"
import ComponentCardSkeletons from "@/components/Skeletons/Categories/CategoryCardSkeletons"
import LoadError from "@/components/LoadError"
import NoActiveCategoriesFound from "@/components/Categories/NoActiveCategoriesFound"

import { useCategories } from "@/hooks"

const Page = () => {
    const { categories, isLoading, error, refetch } = useCategories();

    return (
        <>
            <Header />

            <div className="flex flex-col w-full lg:w-[60%] mx-auto p-4 gap-4">
                {isLoading ? (
                    <ComponentCardSkeletons />
                ) : error ? (
                    <LoadError
                        error={error}
                        refetch={refetch}
                    />
                ) : (
                    <>
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                title={category.name}
                                slug={category.slug}
                            />
                        ))}

                        {categories.length === 0 && (
                            <NoActiveCategoriesFound />
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default Page
