export declare class ResponseCache<T> {
    private cache;
    private timers;
    private inFlight;
    static key(method: string, url: string, data: unknown): string;
    get(key: string): T | null;
    set(key: string, response: T, cacheFor: number): void;
    delete(key: string): void;
    getInFlight(key: string): Promise<T> | undefined;
    setInFlight(key: string, promise: Promise<T>): void;
    deleteInFlight(key: string): void;
}
