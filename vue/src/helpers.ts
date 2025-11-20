let generateIdUsingCallback: (() => string) | null = null

function generateIdUsing(callback: (() => string) | null): void {
    generateIdUsingCallback = callback
}

function sameUrlPath(url1: string | URL, url2: string | URL): boolean {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    url1 = typeof url1 === 'string' ? new URL(url1, origin) : url1
    url2 = typeof url2 === 'string' ? new URL(url2, origin) : url2

    return `${url1.origin}${url1.pathname}` === `${url2.origin}${url2.pathname}`
}

function generateId(prefix = 'inertiaui_modal_'): string {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback()
    }

    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `${prefix}${crypto.randomUUID()}`
    }

    // Fallback for environments where crypto.randomUUID is not available
    return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`
}

function strToLowercase(key: string): string {
    return key.toLowerCase()
}

function except(target: string[], keys: string[], ignoreCase?: boolean): string[]
function except<T extends Record<string, any>>(target: T, keys: string[], ignoreCase?: boolean): Partial<T>
function except(target: string[] | Record<string, any>, keys: string[], ignoreCase = false): string[] | Record<string, any> {
    let compareKeys: string[] = keys
    if (ignoreCase) {
        compareKeys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => {
            const comparisonKey = ignoreCase ? strToLowercase(key) : key
            return !compareKeys.includes(comparisonKey)
        })
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const comparisonKey = ignoreCase ? strToLowercase(key) : key
        if (!compareKeys.includes(comparisonKey)) {
            acc[key] = objTarget[key] // copy the key-value pair
        }
        return acc
    }, {})
}

function only(target: string[], keys: string[], ignoreCase?: boolean): string[]
function only<T extends Record<string, any>>(target: T, keys: string[], ignoreCase?: boolean): Partial<T>
function only(target: string[] | Record<string, any>, keys: string[], ignoreCase = false): string[] | Record<string, any> {
    let compareKeys = keys
    if (ignoreCase) {
        compareKeys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => {
            const comparisonKey = ignoreCase ? strToLowercase(key) : key
            return compareKeys.includes(comparisonKey)
        })
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const comparisonKey = ignoreCase ? strToLowercase(key) : key
        if (compareKeys.includes(comparisonKey)) {
            acc[key] = objTarget[key] // copy the key-value pair
        }
        return acc
    }, {})
}

function rejectNullValues(target: string[]): string[]
function rejectNullValues<T extends Record<string, any>>(target: T): Partial<T>
function rejectNullValues(target: string[] | Record<string, any>): string[] | Record<string, any> {
    if (Array.isArray(target)) {
        return target.filter((item) => item !== null)
    }

    const objTarget = target as Record<string, any>
    return Object.keys(objTarget).reduce<Record<string, any>>((acc, key) => {
        const value = objTarget[key]
        if (value !== null) {
            acc[key] = value
        }
        return acc
    }, {})
}

function kebabCase(string: string | null): string {
    if (!string) return ''

    // Replace all underscores with hyphens
    string = string.replace(/_/g, '-')

    // Replace all multiple consecutive hyphens with a single hyphen
    string = string.replace(/-+/g, '-')

    // Check if string is already all lowercase
    if (!/[A-Z]/.test(string)) {
        return string
    }

    // Remove all spaces and convert to word case
    string = string
        .replace(/\s+/g, '')
        .replace(/_/g, '')
        .replace(/(?:^|\s|-)+([A-Za-z])/g, (_m, p1: string) => p1.toUpperCase())

    // Add delimiter before uppercase letters
    string = string.replace(/(.)(?=[A-Z])/g, '$1-')

    // Convert to lowercase
    return string.toLowerCase()
}

function isStandardDomEvent(eventName: string): boolean {
    if (typeof window !== 'undefined') {
        return eventName.toLowerCase() in window
    }

    if (typeof document !== 'undefined') {
        const testElement = document.createElement('div')
        return eventName.toLowerCase() in testElement
    }

    const lowerEventName = eventName.toLowerCase()
    const standardPatterns = [
        /^on(click|dblclick|mousedown|mouseup|mouseover|mouseout|mousemove|mouseenter|mouseleave)$/,
        /^on(keydown|keyup|keypress)$/,
        /^on(focus|blur|change|input|submit|reset)$/,
        /^on(load|unload|error|resize|scroll)$/,
        /^on(touchstart|touchend|touchmove|touchcancel)$/,
        /^on(pointerdown|pointerup|pointermove|pointerenter|pointerleave|pointercancel)$/,
        /^on(drag|dragstart|dragend|dragenter|dragleave|dragover|drop)$/,
        /^on(animationstart|animationend|animationiteration)$/,
        /^on(transitionstart|transitionend|transitionrun|transitioncancel)$/,
    ]

    return standardPatterns.some((pattern) => pattern.test(lowerEventName))
}

export { generateIdUsing, sameUrlPath, generateId, except, only, rejectNullValues, kebabCase, isStandardDomEvent }
