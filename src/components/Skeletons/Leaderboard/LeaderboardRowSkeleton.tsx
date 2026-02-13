import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

const LeaderboardRowSkeleton = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-6 w-8 mx-auto" />
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </TableCell>

            <TableCell>
                <Skeleton className="h-4 w-12 ml-auto" />
            </TableCell>
        </TableRow>
    )
}

export default LeaderboardRowSkeleton
