'use client'

import { useEffect, useState } from "react";

import { useUser, useClerk } from "@clerk/nextjs";

import InvalidRollNumberDialog from "@/components/InvalidRollNumberDialog";

import { supabase } from "@/lib/supabase";

import { DB_TABLES } from "@/lib/constants";

import { getRollNumberFromEmail } from "@/utils";

const SyncClerkWithSupabase = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    const [isInvalidRollNumber, setIsInvalidRollNumber] = useState(false);

    // TODO: Add try-catch statements and show the errors via 'toast'
    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        const syncUser = async () => {
            const rollNumber = getRollNumberFromEmail(user.primaryEmailAddress?.emailAddress!);

            const { data, error } = await supabase
                .from(DB_TABLES.COLLEGE_STUDENTS)
                .select('roll_number')
                .eq('roll_number', rollNumber)
                .single();

            if (error || !data) {
                setIsInvalidRollNumber(true);

                return;
            }

            await supabase.from(DB_TABLES.USERS).upsert({
                id: user.id,
                roll_number: rollNumber,
            });
        }

        syncUser();
    }, [isLoaded, isSignedIn, user]);

    const handleConfirmDeletion = async () => {
        try {
            await user?.delete();
            await signOut();

            setIsInvalidRollNumber(false);
        } catch (err) {
            console.error('Failed to delete Clerk account:', err);
        }
    };

    return (
        <InvalidRollNumberDialog
            open={isInvalidRollNumber}
            onConfirm={handleConfirmDeletion}
        />
    );
}

export default SyncClerkWithSupabase
