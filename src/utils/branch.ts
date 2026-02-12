import { BRANCHES } from "@/lib/constants/branches";
import { Branch } from "@/types";

export const getBranchLabel = (value: Branch): string => {
    const branch = Object.values(BRANCHES).find((b) => b.value === value);
    return branch ? branch.label : value;
};
