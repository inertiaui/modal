export class ResponseCache {
    cache = new Map();
    timers = new Map();
    inFlight = new Map();
    static key(method, url, data) {
        return `${method}:${url}:${JSON.stringify(data)}`;
    }
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) {
            return null;
        }
        if (Date.now() > cached.expiresAt) {
            this.delete(key);
            return null;
        }
        return cached.response;
    }
    set(key, response, cacheFor) {
        this.delete(key);
        this.cache.set(key, {
            response,
            expiresAt: Date.now() + cacheFor,
        });
        if (cacheFor > 0) {
            this.timers.set(key, setTimeout(() => this.delete(key), cacheFor));
        }
    }
    delete(key) {
        this.cache.delete(key);
        const timer = this.timers.get(key);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(key);
        }
    }
    getInFlight(key) {
        return this.inFlight.get(key);
    }
    setInFlight(key, promise) {
        this.inFlight.set(key, promise);
    }
    deleteInFlight(key) {
        this.inFlight.delete(key);
    }
}
