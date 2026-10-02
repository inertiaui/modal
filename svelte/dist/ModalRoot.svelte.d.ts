import { type Component, type Snippet } from 'svelte';
interface Props {
    App?: Component<Record<string, unknown>>;
    appProps?: Record<string, unknown>;
    children?: Snippet;
}
declare const ModalRoot: Component<Props, {}, "">;
type ModalRoot = ReturnType<typeof ModalRoot>;
export default ModalRoot;
