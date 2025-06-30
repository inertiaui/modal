import type { ModalConfig, ModalType, ModalPosition, MaxWidth } from './types'

interface DefaultModalConfig {
    type: ModalType
    navigate: boolean
    modal: {
        closeButton: boolean
        closeExplicitly: boolean
        maxWidth: MaxWidth
        paddingClasses: string
        panelClasses: string
        position: ModalPosition
    }
    slideover: {
        closeButton: boolean
        closeExplicitly: boolean
        maxWidth: MaxWidth
        paddingClasses: string
        panelClasses: string
        position: ModalPosition
    }
}

const defaultConfig: DefaultModalConfig = {
    type: 'modal',
    navigate: false,
    modal: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: '2xl',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white rounded',
        position: 'center',
    },
    slideover: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: 'md',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white min-h-screen',
        position: 'right',
    },
}

class Config {
    private config: DefaultModalConfig = {} as DefaultModalConfig

    constructor() {
        this.reset()
    }

    reset(): void {
        this.config = JSON.parse(JSON.stringify(defaultConfig))
    }

    put(key: string | Partial<DefaultModalConfig>, value?: any): void {
        if (typeof key === 'object') {
            this.config = {
                type: key.type ?? defaultConfig.type,
                navigate: key.navigate ?? defaultConfig.navigate,
                modal: { ...defaultConfig.modal, ...(key.modal ?? {}) },
                slideover: { ...defaultConfig.slideover, ...(key.slideover ?? {}) },
            }
            return
        }
        const keys = key.split('.')
        let current: any = this.config
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]] = current[keys[i]] || {}
        }
        current[keys[keys.length - 1]] = value
    }

    get(key?: string): any {
        if (typeof key === 'undefined') {
            return this.config
        }
        const keys = key.split('.')
        let current: any = this.config
        for (const k of keys) {
            if (current[k] === undefined) {
                return null
            }
            current = current[k]
        }
        return current
    }
}

const configInstance = new Config()

export const resetConfig = (): void => configInstance.reset()
export const putConfig = (key: string | Partial<DefaultModalConfig>, value?: any): void => configInstance.put(key, value)
export const getConfig = (key?: string): any => configInstance.get(key)
export const getConfigByType = (isSlideover: boolean, key: string): any => configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`)
