<script>
    let { children, ...rest } = $props()
</script>

<button {...rest} class="rounded-md bg-purple-600 px-2 py-1 text-xs font-medium text-white">
    {@render children?.()}
</button>
