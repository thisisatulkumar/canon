'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface InvalidRollNumberDialogProps {
    open: boolean;
    onConfirm: () => void;
}

const InvalidRollNumberDialog = ({ open, onConfirm }: InvalidRollNumberDialogProps) => {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Invalid Email Address</AlertDialogTitle>

                    <AlertDialogDescription>
                        Please use your <span className="font-bold">college email address</span> to sign in. Also, ensure you are a <span className="font-bold">first year student</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogCancel onClick={onConfirm}>
                    OK
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default InvalidRollNumberDialog;
