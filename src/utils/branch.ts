import { BRANCHES } from "@/lib/constants";

import type { Branch } from "@/types";

export const getBranchLabel = (value: Branch): string => {
    const branch = Object.values(BRANCHES).find((b) => b.value === value);
    return branch ? branch.label : value;
}

export const formatNotificationMessage = (message: string): string => {
    if (!message) return message;

    let formattedMessage = message;

    const branchEntries = Object.values(BRANCHES).sort((a, b) => b.value.length - a.value.length);

    branchEntries.forEach(branch => {
        const regex = new RegExp(`\\b${branch.value}\\b`, 'g');

        formattedMessage = formattedMessage.replace(regex, branch.label);
    });

    return formattedMessage;
}
