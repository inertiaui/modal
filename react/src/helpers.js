import { router } from '@inertiajs/react'
import { generateId, sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from './../../vue/src/helpers.js'

function isInertiaV2() {
    return router.push && typeof router.push === 'function'
}

export { generateId, sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent, isInertiaV2 }
