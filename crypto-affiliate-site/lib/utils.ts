import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function that combines clsx and tailwind-merge.
 * - clsx: conditionally joins classNames together
 * - twMerge: intelligently merges Tailwind CSS classes, resolving conflicts
 *
 * Usage:
 *   cn("px-2 py-1", conditional && "bg-primary", "px-4")
 *   // => "py-1 px-4 bg-primary" (px-4 overrides px-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
