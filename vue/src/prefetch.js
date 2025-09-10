// Framework-agnostic prefetch cache and utilities
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { default as Axios } from 'axios'
import { createInertiaHeaders, paramsAreEqual } from './helpers'

// Simple cache for prefetched responses
let prefetchCache = new Map()
let removalTimers = new Map()

function findCachedItem(params) {
    for (let [cachedParams, cachedData] of prefetchCache.entries()) {
        if (paramsAreEqual(cachedParams, params)) {
            return cachedData
        }
    }
    return null
}

function findRemovalTimer(params) {
    for (let [cachedParams, timer] of removalTimers.entries()) {
        if (paramsAreEqual(cachedParams, params)) {
            return { params: cachedParams, timer }
        }
    }
    return null
}

export function createPrefetchCache() {
    return {
        get: (params) => findCachedItem(params),
        set: (params, value) => prefetchCache.set(params, value),
        delete: (params) => {
            for (let [cachedParams] of prefetchCache.entries()) {
                if (paramsAreEqual(cachedParams, params)) {
                    prefetchCache.delete(cachedParams)
                    break
                }
            }
        },
        clear: () => prefetchCache.clear(),
        has: (params) => findCachedItem(params) !== null,
        entries: () => prefetchCache.entries(),
        size: () => prefetchCache.size,
    }
}

function scheduleForRemoval(params, expiresIn) {
    if (typeof window === 'undefined') {
        return
    }

    clearRemovalTimer(params)

    if (expiresIn > 0) {
        const timer = window.setTimeout(() => {
            // Find and remove the cached item and timer
            for (let [cachedParams] of prefetchCache.entries()) {
                if (paramsAreEqual(cachedParams, params)) {
                    prefetchCache.delete(cachedParams)
                    break
                }
            }
            for (let [cachedParams] of removalTimers.entries()) {
                if (paramsAreEqual(cachedParams, params)) {
                    removalTimers.delete(cachedParams)
                    break
                }
            }
        }, expiresIn)

        removalTimers.set(params, timer)
    }
}

function clearRemovalTimer(params) {
    const timerInfo = findRemovalTimer(params)
    if (timerInfo) {
        clearTimeout(timerInfo.timer)
        removalTimers.delete(timerInfo.params)
    }
}

export function invalidatePrefetchCache(tags = null) {
    if (!tags) {
        // Clear all timers
        for (const timer of removalTimers.values()) {
            clearTimeout(timer)
        }
        removalTimers.clear()
        prefetchCache.clear()
        return
    }

    const tagsArray = Array.isArray(tags) ? tags : [tags]
    for (const [params, entry] of prefetchCache.entries()) {
        if (entry.cacheTags.some((tag) => tagsArray.includes(tag))) {
            clearRemovalTimer(params)
            prefetchCache.delete(params)
        }
    }
}

export function prefetchWithAxios(url, method, data, headers, cacheFor, cacheTags, baseUrl, version, onPrefetching, onPrefetched) {
    const params = {
        url,
        method,
        data,
        headers,
        cacheFor,
        cacheTags,
    }

    // Check if already cached and not expired
    const cached = findCachedItem(params)
    if (cached && Date.now() - cached.timestamp < cacheFor) {
        onPrefetched?.(cached.response)
        return Promise.resolve(cached.response)
    }

    onPrefetching?.()

    const requestHeaders = {
        ...headers,
        ...createInertiaHeaders(version, baseUrl, false, 'prefetch'),
    }

    return Axios({ url, method, data, headers: requestHeaders })
        .then((response) => {
            // Cache the response
            prefetchCache.set(params, {
                response,
                timestamp: Date.now(),
                cacheTags: Array.isArray(cacheTags) ? cacheTags : [cacheTags].filter(Boolean),
            })

            // Schedule for removal like Inertia does
            scheduleForRemoval(params, cacheFor)

            onPrefetched?.(response)
            return response
        })
        .catch((error) => {
            console.warn('Prefetch failed:', error)
            throw error
        })
}

export function prefetch(
    href,
    method = 'get',
    payload = {},
    headers = {},
    queryStringArrayFormat = 'brackets',
    useBrowserHistory = false,
    cacheFor = 30000,
    cacheTags = [],
    baseUrl = null,
    version = null,
    router = null,
    onPrefetching = null,
    onPrefetched = null,
) {
    if (href.startsWith('#')) {
        // Local modals don't need prefetching
        return Promise.resolve()
    }

    const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

    // Determine if we should use Inertia router or Axios
    if (useBrowserHistory) {
        if (!router?.prefetch) {
            console.error(
                'Prefetch is only available in Inertia v2. Please upgrade to Inertia v2 or set navigate: false to use Axios-based prefetch.',
            )
            return Promise.reject(new Error('Prefetch requires Inertia v2'))
        }

        // Use Inertia router prefetch (v2)
        return router.prefetch(
            url,
            {
                method,
                data,
                headers,
                onPrefetching,
                onPrefetched,
            },
            {
                cacheFor,
                cacheTags,
            },
        )
    }

    // Use Axios for prefetch when not using router
    return prefetchWithAxios(url, method, data, headers, cacheFor, cacheTags, baseUrl, version, onPrefetching, onPrefetched)
}
