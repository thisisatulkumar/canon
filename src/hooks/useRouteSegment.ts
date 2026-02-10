import { usePathname } from "next/navigation";

export const useRouteSegment = (index: number = 1): string => {
    const pathname = usePathname();
    const segment = pathname.split('/')[index] || '';

    return segment;
}
