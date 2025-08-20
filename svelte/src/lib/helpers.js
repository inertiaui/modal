let generateIdUsingCallback = null

function generateIdUsing(callback) {
    generateIdUsingCallback = callback
}

function sameUrlPath(url1, url2) {
    url1 = typeof url1 === 'string' ? new URL(url1, window.location.origin) : url1
    url2 = typeof url2 === 'string' ? new URL(url2, window.location.origin) : url2

    return `${url1.origin}${url1.pathname}` === `${url2.origin}${url2.pathname}`
}

function generateId(prefix = 'inertiaui_modal_') {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback()
    }

    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return `${prefix}${crypto.randomUUID()}`
    }

    // Fallback for environments where crypto.randomUUID is not available
    return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`
}

function strToLowercase(key) {
    return typeof key === 'string' ? key.toLowerCase() : key
}

function except(target, keys, ignoreCase = false) {
    if (ignoreCase) {
        keys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => !keys.includes(ignoreCase ? strToLowercase(key) : key))
    }

    return Object.keys(target).reduce((acc, key) => {
        if (!keys.includes(ignoreCase ? strToLowercase(key) : key)) {
            acc[key] = target[key] // copy the key-value pair
        }

        return acc
    }, {})
}

function only(target, keys, ignoreCase = false) {
    if (ignoreCase) {
        keys = keys.map(strToLowercase)
    }

    if (Array.isArray(target)) {
        return target.filter((key) => keys.includes(ignoreCase ? strToLowercase(key) : key))
    }

    return Object.keys(target).reduce((acc, key) => {
        if (keys.includes(ignoreCase ? strToLowercase(key) : key)) {
            acc[key] = target[key] // copy the key-value pair
        }

        return acc
    }, {})
}

function rejectNullValues(target) {
    if (Array.isArray(target)) {
        return target.filter((item) => item !== null)
    }

    return Object.keys(target).reduce((acc, key) => {
        if (key in target && target[key] !== null) {
            acc[key] = target[key]
        }
        return acc
    }, {})
}

function kebabCase(string) {
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
        .replace(/(?:^|\s|-)+([A-Za-z])/g, (m, p1) => p1.toUpperCase())

    // Add delimiter before uppercase letters
    string = string.replace(/(.)(?=[A-Z])/g, '$1-')

    // Convert to lowercase
    return string.toLowerCase()
}

export { generateIdUsing, sameUrlPath, generateId, except, only, rejectNullValues, kebabCase, onEscape, onClick }
