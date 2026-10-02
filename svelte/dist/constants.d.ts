/**
 * Max width classes for modals and slideovers.
 * Uses a map lookup for Tailwind 4 compatibility (scanner picks up full class strings).
 */
export declare const maxWidthClasses: Record<string, string>;
export declare const defaultMaxWidth = "2xl";
export declare function getMaxWidthClass(maxWidth: string): string;
