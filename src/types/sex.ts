import { SEXES } from "@/lib/constants/sexes";

export type Sex = typeof SEXES[keyof typeof SEXES]['value'];
