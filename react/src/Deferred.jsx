// See: https://github.com/inertiajs/inertia/blob/48bcd21fb7daf467d0df1bfde2408f161f94a579/packages/react/src/Deferred.ts
import { useEffect, useState } from 'react'
import useModal from './useModal'

const Deferred = ({ children, data, fallback }) => {
    if (!data) {
        throw new Error('`<Deferred>` requires a `data` prop to be a string or array of strings')
    }

    const [loaded, setLoaded] = useState(false)
    const keys = Array.isArray(data) ? data : [data]
    const modalProps = useModal().props

    useEffect(() => {
        setLoaded(keys.every((key) => modalProps[key] !== undefined))
    }, [modalProps, keys])

    return loaded ? children : fallback
}

Deferred.displayName = 'InertiaModalDeferred'

export default Deferred
