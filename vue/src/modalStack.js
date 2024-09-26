import { computed, readonly, ref } from 'vue'
import { default as Axios } from 'axios'
import { except, only } from './helpers'

const stack = ref([])
const localModals = ref({})

class Modal {
    constructor(component, response, modalProps, onClose, afterLeave) {
        this.id = Modal.generateId()
        this.open = false
        this.listeners = {}

        this.component = component
        this.componentProps = ref(response.props)
        this.response = response
        this.modalProps = modalProps
        this.onCloseCallback = onClose
        this.afterLeaveCallback = afterLeave

        this.index = computed(() => stack.value.findIndex((m) => m.id === this.id))
        this.getParentModal = () => this.getAdjacentModal(-1)
        this.getChildModal = () => this.getAdjacentModal(1)
        this.onTopOfStack = computed(() => this.isOnTopOfStack())
    }

    static generateId() {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return `inertiaui_modal_${crypto.randomUUID()}`
        }
        // Fallback for environments where crypto.randomUUID is not available
        return `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`
    }

    getAdjacentModal = (offset) => {
        const index = this.index.value
        return stack.value[index + offset] ?? null
    }

    isOnTopOfStack = () => {
        return stack.value.length < 2 || stack.value[stack.value.length - 1].id === this.id
    }

    close = () => {
        const index = this.index.value
        if (index > -1) {
            Object.keys(this.listeners).forEach((event) => {
                this.off(event)
            })

            stack.value[index].open = false
            this.onCloseCallback()
        }
    }

    afterLeave = () => {
        // console.log(`After leave modal ${this.id}`)
        stack.value = stack.value.filter((m) => m.id !== this.id)
        this.afterLeaveCallback()
    }

    on = (event, callback) => {
        this.listeners[event] = this.listeners[event] ?? []
        this.listeners[event].push(callback)
    }

    off = (event, callback) => {
        if (callback) {
            this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
        } else {
            delete this.listeners[event]
        }
    }

    emit = (event, ...args) => {
        this.listeners[event]?.forEach((callback) => callback(...args))
    }

    reload = (options = {}) => {
        let keys = Object.keys(this.response.props)

        if (options.only) {
            keys = only(keys, options.only)
        }

        if (options.except) {
            keys = except(keys, options.except)
        }

        Axios.get(this.response.url, {
            headers: {
                'X-Inertia': true,
                'X-Inertia-Partial-Component': this.response.component,
                'X-Inertia-Version': this.response.version,
                'X-Inertia-Partial-Data': keys.join(','),
            },
        }).then((response) => {
            Object.assign(this.componentProps.value, response.data.props)
        })
    }
}

function registerLocalModal(name, callback) {
    localModals.value[name] = { name, callback }
}

function callLocalModal(name, modalProps, onClose, afterLeave) {
    if (localModals.value[name]) {
        const modal = push(null, {}, modalProps, onClose, afterLeave)
        modal.name = name
        localModals.value[name].callback(modal)
        return modal
    }
}

function push(component, response, modalProps, onClose, afterLeave) {
    const newModal = new Modal(component, response, modalProps, onClose, afterLeave)
    stack.value.push(newModal)
    return newModal
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export function useModalStack() {
    return {
        stack: readonly(stack),
        push,
        reset: () => (stack.value = []),
        callLocalModal,
        registerLocalModal,
        removeLocalModal: (name) => delete localModals.value[name],
    }
}
