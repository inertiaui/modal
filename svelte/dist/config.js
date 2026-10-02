const defaultConfig = {
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
};
class Config {
    config;
    constructor() {
        this.config = {};
        this.reset();
    }
    reset() {
        this.config = JSON.parse(JSON.stringify(defaultConfig));
    }
    put(key, value) {
        if (typeof key === 'object') {
            this.config = {
                type: key.type ?? defaultConfig.type,
                navigate: key.navigate ?? defaultConfig.navigate,
                useNativeDialog: key.useNativeDialog ?? defaultConfig.useNativeDialog,
                appElement: key.appElement !== undefined ? key.appElement : defaultConfig.appElement,
                modal: { ...defaultConfig.modal, ...key.modal },
                slideover: { ...defaultConfig.slideover, ...key.slideover },
            };
            return;
        }
        const keys = key.split('.');
        let current = this.config;
        for (let i = 0; i < keys.length - 1; i++) {
            current = (current[keys[i]] = current[keys[i]] || {});
        }
        current[keys[keys.length - 1]] = value;
    }
    get(key) {
        if (typeof key === 'undefined') {
            return this.config;
        }
        const keys = key.split('.');
        let current = this.config;
        for (const k of keys) {
            if (current === null || current === undefined || typeof current !== 'object') {
                return null;
            }
            current = current[k];
        }
        return current === undefined ? null : current;
    }
}
const configInstance = new Config();
export const resetConfig = () => configInstance.reset();
export const putConfig = (key, value) => configInstance.put(key, value);
export const getConfig = (key) => configInstance.get(key);
export const getConfigByType = (isSlideover, key) => configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`);
