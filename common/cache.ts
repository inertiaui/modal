interface CacheEntry<T> {
    response: T
    expiresAt: number
}

export class ResponseCache<T> {
    private cache = new Map<string, CacheEntry<T>>()
    private timers = new Map<string, ReturnType<typeof setTimeout>>()
    private inFlight = new Map<string, Promise<T>>()

    static key(method: string, url: string, data: unknown): string {
        return `${method}:${url}:${JSON.stringify(data)}`
    }

    get(key: string): T | null {
        const cached = this.cache.get(key)

        if (!cached) {
            return null
        }

        if (Date.now() > cached.expiresAt) {
            this.delete(key)
            return null
        }

        return cached.response
    }

    set(key: string, response: T, cacheFor: number): void {
        this.delete(key)

        this.cache.set(key, {
            response,
            expiresAt: Date.now() + cacheFor,
        })

        if (cacheFor > 0) {
            this.timers.set(key, setTimeout(() => this.delete(key), cacheFor))
        }
    }

    delete(key: string): void {
        this.cache.delete(key)

        const timer = this.timers.get(key)
        if (timer) {
            clearTimeout(timer)
            this.timers.delete(key)
        }
    }

    getInFlight(key: string): Promise<T> | undefined {
        return this.inFlight.get(key)
    }

    setInFlight(key: string, promise: Promise<T>): void {
        this.inFlight.set(key, promise)
    }

    deleteInFlight(key: string): void {
        this.inFlight.delete(key)
    }
}
