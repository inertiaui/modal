import { generateId as vanillaGenerateId } from '@inertiaui/vanilla';
export { except, only, rejectNullValues, kebabCase, isStandardDomEvent, sameUrlPath } from '@inertiaui/vanilla';
export function parseResponseData(data) {
    return typeof data === 'string' ? JSON.parse(data) : data;
}
let generateIdUsingCallback = null;
function generateIdUsing(callback) {
    generateIdUsingCallback = callback;
}
function generateId(prefix = 'inertiaui_modal_') {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback();
    }
    return vanillaGenerateId(prefix);
}
export { generateIdUsing, generateId };
