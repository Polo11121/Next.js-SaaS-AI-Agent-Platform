import { clsx, type ClassValue } from "clsx";
import humanizeDuration from "humanize-duration";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDuration = (seconds: number) =>
  humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
