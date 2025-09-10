let generateIdUsingCallback = null

function generateIdUsing(callback) {
    generateIdUsingCallback = callback
}

function sameUrlPath(url1, url2) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    url1 = typeof url1 === 'string' ? new URL(url1, origin) : url1
    url2 = typeof url2 === 'string' ? new URL(url2, origin) : url2

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

function isStandardDomEvent(eventName) {
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

function createInertiaHeaders(version, baseUrl, useRouter = false, purpose = null) {
    const headers = {
        Accept: 'text/html, application/xhtml+xml',
        'X-Inertia': true,
        'X-Inertia-Version': version,
        'X-InertiaUI-Modal': generateId(),
        'X-InertiaUI-Modal-Use-Router': useRouter ? 1 : 0,
        'X-InertiaUI-Modal-Base-Url': baseUrl,
    }

    if (purpose) {
        headers.Purpose = purpose
    }

    return headers
}

function objectsAreEqual(obj1, obj2, excludeKeys = []) {
    if (obj1 === obj2) return true

    if (obj1 == null || obj2 == null) return obj1 === obj2

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        // For functions, compare their string representation
        if (typeof obj1 === 'function' && typeof obj2 === 'function') {
            return obj1.toString() === obj2.toString()
        }
        return obj1 === obj2
    }

    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false

    if (Array.isArray(obj1)) {
        if (obj1.length !== obj2.length) return false
        for (let i = 0; i < obj1.length; i++) {
            if (!objectsAreEqual(obj1[i], obj2[i], excludeKeys)) return false
        }
        return true
    }

    const keys1 = Object.keys(obj1).filter((key) => !excludeKeys.includes(key))
    const keys2 = Object.keys(obj2).filter((key) => !excludeKeys.includes(key))

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
        if (!keys2.includes(key)) return false
        if (!objectsAreEqual(obj1[key], obj2[key], excludeKeys)) return false
    }

    return true
}

function withoutPurposeHeader(params) {
    if (!params.headers) return params

    const newParams = { ...params }
    const headers = { ...params.headers }
    delete headers.Purpose
    newParams.headers = headers

    return newParams
}

function paramsAreEqual(params1, params2) {
    const excludeKeys = ['onStart', 'onSuccess', 'onError', 'onFinish', 'onPrefetching', 'onPrefetched', 'cacheFor', 'cacheTags']

    return objectsAreEqual(withoutPurposeHeader(params1), withoutPurposeHeader(params2), excludeKeys)
}

export {
    generateIdUsing,
    sameUrlPath,
    generateId,
    except,
    only,
    rejectNullValues,
    kebabCase,
    isStandardDomEvent,
    createInertiaHeaders,
    objectsAreEqual,
    paramsAreEqual,
}
