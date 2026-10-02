import type { Snippet } from 'svelte';
interface Props {
    data: string | string[];
    children?: Snippet;
    fallback?: Snippet;
}
declare const Deferred: import("svelte").Component<Props, {}, "">;
type Deferred = ReturnType<typeof Deferred>;
export default Deferred;
