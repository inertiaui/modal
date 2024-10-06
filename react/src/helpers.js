import { router } from '@inertiajs/react'
import { except, only, rejectNullValues } from './../../vue/src/helpers.js'

/**
 * Resolves router.page from the Inertia router or waits for it to be available
 */
function resolveInteriaPageFromRouter(waitForSeconds = 3, checkIntervalMilliseconds = 100) {
    const resolvePage = () => router.page || null

    return new Promise((resolve, reject) => {
        let page = resolvePage()

        if (page) {
            resolve(page)
            return
        }

        let maxAttempts = (waitForSeconds * 1000) / checkIntervalMilliseconds

        const interval = setInterval(() => {
            page = resolvePage()

            if (page) {
                clearInterval(interval)
                resolve(page)
            }

            if (--maxAttempts <= 0) {
                clearInterval(interval)
                reject(new Error('Inertia page not available'))
            }
        }, checkIntervalMilliseconds)
    })
}

export { except, only, rejectNullValues, resolveInteriaPageFromRouter }
