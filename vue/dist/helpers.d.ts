export { except, only, rejectNullValues, kebabCase, isStandardDomEvent, sameUrlPath } from '@inertiaui/vanilla';
export declare function parseResponseData(data: unknown): unknown;
declare function generateIdUsing(callback: () => string): void;
declare function generateId(prefix?: string): string;
export { generateIdUsing, generateId };
