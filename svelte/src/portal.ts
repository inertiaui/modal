export function portal(node: HTMLElement): () => void {
    document.body.appendChild(node)

    return () => {
        node.remove()
    }
}
