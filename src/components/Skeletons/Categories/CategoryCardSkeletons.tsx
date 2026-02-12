import ComponentCardSkeleton from "./CategoryCardSkeleton"

interface ComponentCardSkeletonsProps {
    count?: number;
}

const ComponentCardSkeletons = ({ count = 4 }: ComponentCardSkeletonsProps) => {
    return (
        Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="flex flex-col gap-4"
            >
                <ComponentCardSkeleton />
            </div>
        ))
    )
}

export default ComponentCardSkeletons
