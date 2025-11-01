import { getContext } from 'svelte'

export default function useModal() {
    return getContext('modalContext')
}
