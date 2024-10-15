import { router } from '@inertiajs/react'
import { except, only, rejectNullValues, waitFor } from './../../vue/src/helpers.js'

/**
 * Resolves router.page from the Inertia router or waits for it to be available
 */
function resolveInteriaPageFromRouter(waitForSeconds = 3, checkIntervalMilliseconds = 10) {
    return waitFor(() => router.page || null, waitForSeconds, checkIntervalMilliseconds)
}

export { except, only, rejectNullValues, resolveInteriaPageFromRouter, waitFor }
