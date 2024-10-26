import { inject } from 'vue'

export default function useModal() {
    return inject('modalContext', null)
}
