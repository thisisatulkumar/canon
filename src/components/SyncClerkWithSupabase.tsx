'use client'

import { useEffect, useState } from "react";

import { useUser, useClerk } from "@clerk/nextjs";

import { supabase } from "../lib/supabase";

import { DB_TABLES } from "../lib/constants";

import InvalidRollNumberDialog from "@/components/InvalidRollNumberDialog";

const SyncClerkWithSupabase = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    
    const [isInvalidRollNumber, setIsInvalidRollNumber] = useState(false);

    // On each client load, if a user is signed in via Clerk, this effect upserts (updates if row exists else inserts) their data into the supabase 'users' table
    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        const syncUser = async () => {
            // Extract roll number from email
            const rollNumber = user.primaryEmailAddress?.emailAddress?.split('@')[0];

            // Check if roll number exists in 'college_students' table
            const { data, error } = await supabase
                .from(DB_TABLES.COLLEGE_STUDENTS)
                .select('roll_number')
                .eq('roll_number', rollNumber)
                .single();

            if (error || !data) {
                setIsInvalidRollNumber(true);

                return;
            }

            // Upsert user only if roll number exists
            await supabase.from(DB_TABLES.USERS).upsert({
                id: user.id,
                roll_number: rollNumber,
                profile_pic_url: '',
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
