import { inject, toValue } from 'vue'

export default function useModal() {
    return toValue(inject('modalContext', null))
}
