import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { BRANCHES } from "@/lib/constants";

import type { Branch } from "@/types";

interface BranchSelectProps {
    branch: Branch | 'all';
    setBranch: (newBranch: Branch) => void;
}

const BranchSelect = ({ branch, setBranch }: BranchSelectProps) => {
    return (
        <Select
            value={branch}
            onValueChange={setBranch}
        >
            <SelectTrigger className="w-[180px] font-bold">
                <SelectValue placeholder="All Branches" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem
                    value="all"
                    className="font-bold"
                >
                    All Branches
                </SelectItem>

                {Object.values(BRANCHES).map((b) => (
                    <SelectItem
                        key={b.value}
                        value={b.value}
                        className="font-bold"
                    >
                        {b.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default BranchSelect
