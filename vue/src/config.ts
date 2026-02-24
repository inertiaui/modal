export interface ModalTypeConfig {
    closeButton: boolean
    closeExplicitly: boolean
    closeOnClickOutside: boolean
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
}

export interface ModalConfig {
    type: 'modal' | 'slideover'
    navigate: boolean
    useNativeDialog: boolean
    appElement: string | null
    modal: ModalTypeConfig
    slideover: ModalTypeConfig
}

const defaultConfig: ModalConfig = {
    type: 'modal',
    navigate: false,
    useNativeDialog: true,
    appElement: '#app',
    modal: {
        closeButton: true,
        closeExplicitly: false,
        closeOnClickOutside: true,
        maxWidth: '2xl',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white rounded',
        position: 'center',
    },
    slideover: {
        closeButton: true,
        closeExplicitly: false,
        closeOnClickOutside: true,
        maxWidth: 'md',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white min-h-screen',
        position: 'right',
    },
}

class Config {
    private config: ModalConfig

    constructor() {
        this.config = {} as ModalConfig
        this.reset()
    }

    reset(): void {
        this.config = JSON.parse(JSON.stringify(defaultConfig))
    }

    put(key: string | Partial<ModalConfig>, value?: unknown): void {
        if (typeof key === 'object') {
            this.config = {
                type: key.type ?? defaultConfig.type,
                navigate: key.navigate ?? defaultConfig.navigate,
                useNativeDialog: key.useNativeDialog ?? defaultConfig.useNativeDialog,
                appElement: key.appElement !== undefined ? key.appElement : defaultConfig.appElement,
                modal: { ...defaultConfig.modal, ...(key.modal ?? {}) },
                slideover: { ...defaultConfig.slideover, ...(key.slideover ?? {}) },
            }
            return
        }
        const keys = key.split('.')
        let current: Record<string, unknown> = this.config as unknown as Record<string, unknown>
        for (let i = 0; i < keys.length - 1; i++) {
            current = (current[keys[i]] = current[keys[i]] || {}) as Record<string, unknown>
        }
        current[keys[keys.length - 1]] = value
    }

    get(key?: string): unknown {
        if (typeof key === 'undefined') {
            return this.config
        }
        const keys = key.split('.')
        let current: unknown = this.config
        for (const k of keys) {
            if (current === null || current === undefined || typeof current !== 'object') {
                return null
            }
            current = (current as Record<string, unknown>)[k]
        }
        return current === undefined ? null : current
    }
}

const configInstance = new Config()

export const resetConfig = (): void => configInstance.reset()
export const putConfig = (key: string | Partial<ModalConfig>, value?: unknown): void => configInstance.put(key, value)
export const getConfig = (key?: string): unknown => configInstance.get(key)
export const getConfigByType = (isSlideover: boolean, key: string): unknown =>
    configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`)
