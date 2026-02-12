import { BRANCHES } from "@/lib/constants/branches";

export type Branch = typeof BRANCHES[keyof typeof BRANCHES]['value'];
