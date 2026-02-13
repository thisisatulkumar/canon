import LeaderboardRowSkeleton from './LeaderboardRowSkeleton'

interface LeaderboardRowSkeletonsProps {
    count?: number;
}

const LeaderboardRowSkeletons = ({ count = 5 }: LeaderboardRowSkeletonsProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <LeaderboardRowSkeleton key={i} />
            ))}
        </>
    )
}

export default LeaderboardRowSkeletons
