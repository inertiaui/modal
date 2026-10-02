export function portal(node) {
    document.body.appendChild(node);
    return () => {
        node.remove();
    };
}
