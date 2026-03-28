export function parseResponseData(data: unknown): unknown {
    return typeof data === 'string' ? JSON.parse(data) : data
}
