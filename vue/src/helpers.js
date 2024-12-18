const modalDOMHandler = {
    modifiedElements: [],
    bodyState: {
        hasOverflowHidden: false,
        hasPointerEventsNone: false,
        originalPaddingRight: '',
    },

    prepare() {
        // Calculate scrollbar width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        // Store original padding-right and add scrollbar width
        this.bodyState.originalPaddingRight = document.body.style.paddingRight
        const currentPaddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10)
        document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`

        // Handle overflow
        if (!document.body.classList.contains('overflow-hidden')) {
            document.body.classList.add('overflow-hidden')
            this.bodyState.hasOverflowHidden = true
        }

        // Handle pointer events
        if (!document.body.classList.contains('pointer-events-none')) {
            document.body.classList.add('pointer-events-none')
            this.bodyState.hasPointerEventsNone = true
        }

        // Set aria-hidden on non-modal elements
        Array.from(document.body.children).forEach((element) => {
            if (!element.classList.contains('im-dialog') && element.getAttribute('aria-hidden') !== 'true') {
                element.setAttribute('aria-hidden', 'true')
                this.modifiedElements.push(element)
            }
        })
    },

    cleanup() {
        // Restore body classes
        if (this.bodyState.hasOverflowHidden) {
            document.body.classList.remove('overflow-hidden')
            this.bodyState.hasOverflowHidden = false
        }

        if (this.bodyState.hasPointerEventsNone) {
            document.body.classList.remove('pointer-events-none')
            this.bodyState.hasPointerEventsNone = false
        }

        // Restore original padding-right
        document.body.style.paddingRight = this.bodyState.originalPaddingRight
        this.bodyState.originalPaddingRight = ''

        // Remove aria-hidden
        this.modifiedElements.forEach((element) => {
            element.removeAttribute('aria-hidden')
        })
        this.modifiedElements = []
    },
}

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
export { modalDOMHandler, except, only, rejectNullValues, waitFor, kebabCase }
