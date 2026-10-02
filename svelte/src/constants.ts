/**
 * Max width classes for modals and slideovers.
 * Uses a map lookup for Tailwind 4 compatibility (scanner picks up full class strings).
 */
export const maxWidthClasses: Record<string, string> = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-md md:max-w-lg',
    xl: 'sm:max-w-md md:max-w-xl',
    '2xl': 'sm:max-w-md md:max-w-xl lg:max-w-2xl',
    '3xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl',
    '4xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl',
    '5xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl',
    '6xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl',
    '7xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl',
}

export const defaultMaxWidth = '2xl'

export function getMaxWidthClass(maxWidth: string): string {
    return maxWidthClasses[maxWidth] || maxWidthClasses[defaultMaxWidth]
}
