function except(target, keys) {
    if (Array.isArray(target)) {
        return target.filter((key) => !keys.includes(key))
    }

    return Object.keys(target).reduce((acc, key) => {
        if (!keys.includes(key)) {
            acc[key] = target[key] // copy the key-value pair
        }
        return acc
    }, {})
}

function only(target, keys) {
    if (Array.isArray(target)) {
        return target.filter((key) => keys.includes(key))
    }

    return keys.reduce((acc, key) => {
        if (key in target) {
            acc[key] = target[key]
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

export { except, only, rejectNullValues }
