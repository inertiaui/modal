import type { Snippet } from 'svelte';
import type { ReloadOptions } from './modalStack.svelte.js';
interface Props {
    data?: string | string[];
    params?: ReloadOptions;
    buffer?: number;
    as?: string;
    always?: boolean;
    children?: Snippet;
    fallback?: Snippet;
}
declare const WhenVisible: import("svelte").Component<Props, {}, "">;
type WhenVisible = ReturnType<typeof WhenVisible>;
export default WhenVisible;
