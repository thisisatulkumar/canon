import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Sex } from "@/types";

interface SexTabProps {
    sex: Sex;
    setSex: (newSex: Sex) => void;
}

const SexTab = ({ sex, setSex }: SexTabProps) => {
    return (
        <Tabs
            value={sex}
            onValueChange={(newSex) => setSex(newSex as Sex)}
            className="w-[200px]"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="m"
                    className="font-bold"
                >
                    Boys
                </TabsTrigger>

                <TabsTrigger
                    value="f"
                    className="font-bold"
                >
                    Girls
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default SexTab
