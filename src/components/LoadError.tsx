import { Button } from "@/components/ui/button";

import { FileSearch } from "lucide-react";

interface CategoryLoadErrorProps {
    error: string;
    refetch: () => void;
}

const LoadError = ({ error, refetch }: CategoryLoadErrorProps) => {
    return (
        <div className="col-span-full flex flex-col gap-4 items-center justify-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <FileSearch className="h-7 w-7 text-muted-foreground" />
            </div>

            <div className="text-center space-y-3 flex items-center justify-center flex-col">
                <p className="text-sm text-muted-foreground">
                    {error}
                </p>

                <Button
                    variant="outline"
                    onClick={refetch}
                >
                    Retry
                </Button>
            </div>
        </div>
    )
}

export default LoadError
