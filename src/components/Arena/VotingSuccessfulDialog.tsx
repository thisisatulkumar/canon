import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface VotingSuccessfulDialogProps {
    showSuccessDialog: boolean;
    setShowSuccessDialog: (showSuccessDialog: boolean) => void;
    nextUpdateTime: string;
}

const VotingSuccessfulDialog = ({ showSuccessDialog, setShowSuccessDialog, nextUpdateTime }: VotingSuccessfulDialogProps) => {
    const router = useRouter();

    return (
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Votes Recorded Successfully!</AlertDialogTitle>

                    <AlertDialogDescription>
                        The leaderboard will update at <span className="font-bold text-primary">{nextUpdateTime}</span>. Your votes will be reflected then.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="sm:mr-auto"
                        onClick={() => {
                            setShowSuccessDialog(false);
                        }}
                    >
                        Okay
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => {
                            setShowSuccessDialog(false);
                            router.push("/arena");
                        }}
                    >
                        Vote In Other Categories
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VotingSuccessfulDialog
