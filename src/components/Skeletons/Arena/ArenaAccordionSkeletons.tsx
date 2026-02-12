import ArenaAccordionSkeleton from "./ArenaAccordionSkeleton"

interface ArenaAccordionSkeletonsProps {
    count: number;
}

const ArenaAccordionSkeletons = ({ count = 8 }: ArenaAccordionSkeletonsProps) => {
    return (
        Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="flex flex-col gap-4"
            >
                <ArenaAccordionSkeleton />
            </div>
        ))
    )
}

export default ArenaAccordionSkeletons
