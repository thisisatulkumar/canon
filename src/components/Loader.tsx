import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Loader = ({ className, ...props }: React.ComponentProps<"svg">) => {
    return (
        <div className="w-full flex items-center justify-center">
            <LoaderIcon
                role="status"
                aria-label="Loading"
                className={cn("size-5 animate-spin", className)}
                {...props}
            />
        </div>
    )
}

export default Loader
