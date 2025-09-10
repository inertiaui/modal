// Framework-agnostic prefetch cache and utilities
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { default as Axios } from 'axios'
import { createInertiaHeaders } from './helpers'

// Simple cache for prefetched responses
let prefetchCache = new Map()
let removalTimers = new Map()

export function createPrefetchCache() {
    return {
        get: (key) => prefetchCache.get(key),
        set: (key, value) => prefetchCache.set(key, value),
        delete: (key) => prefetchCache.delete(key),
        clear: () => prefetchCache.clear(),
        has: (key) => prefetchCache.has(key),
        entries: () => prefetchCache.entries(),
        size: () => prefetchCache.size,
    }
}

function scheduleForRemoval(cacheKey, expiresIn) {
    if (typeof window === 'undefined') {
        return
    }

    clearRemovalTimer(cacheKey)

    if (expiresIn > 0) {
        const timer = window.setTimeout(() => {
            prefetchCache.delete(cacheKey)
            removalTimers.delete(cacheKey)
        }, expiresIn)

        removalTimers.set(cacheKey, timer)
    }
}

function clearRemovalTimer(cacheKey) {
    const timer = removalTimers.get(cacheKey)
    if (timer) {
        clearTimeout(timer)
        removalTimers.delete(cacheKey)
    }
}

export function createCacheKey(method, url, data) {
    return `${method}:${url}:${JSON.stringify(data)}`
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
    for (const [key, entry] of prefetchCache.entries()) {
        if (entry.cacheTags.some((tag) => tagsArray.includes(tag))) {
            clearRemovalTimer(key)
            prefetchCache.delete(key)
        }
    }
}

export function prefetchWithAxios(url, method, data, headers, cacheFor, cacheTags, baseUrl, version, onPrefetching, onPrefetched) {
    const cacheKey = createCacheKey(method, url, data)

    // Check if already cached and not expired
    const cached = prefetchCache.get(cacheKey)
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
            prefetchCache.set(cacheKey, {
                response,
                timestamp: Date.now(),
                cacheTags: Array.isArray(cacheTags) ? cacheTags : [cacheTags].filter(Boolean),
            })

            // Schedule for removal like Inertia does
            scheduleForRemoval(cacheKey, cacheFor)

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
