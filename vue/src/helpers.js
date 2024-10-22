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

function waitFor(conditionFn, waitForSeconds = 3, checkIntervalMilliseconds = 10) {
    return new Promise((resolve, reject) => {
        const result = conditionFn()

        if (result) {
            resolve(result)
            return
        }

        let maxAttempts = (waitForSeconds * 1000) / checkIntervalMilliseconds

        const interval = setInterval(() => {
            const result = conditionFn()
            if (result) {
                clearInterval(interval)
                resolve(result)
            }

            if (--maxAttempts <= 0) {
                clearInterval(interval)
                reject(new Error('Condition not met in time'))
            }
        }, checkIntervalMilliseconds)
    })
}

export { except, only, rejectNullValues, waitFor }
