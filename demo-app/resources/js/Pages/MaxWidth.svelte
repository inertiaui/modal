<script>
    import { ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'

    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Max Width</h2>
    </div>

    <div class="flex flex-wrap gap-2">
        {#each sizes as size (size)}
            <ModalLink data-testid={`modal-size-${size}`} maxWidth={size} href="/users/1/edit">Modal {size}</ModalLink>
        {/each}

        {#each sizes as size (`slideover-${size}`)}
            <ModalLink slideover data-testid={`slideover-size-${size}`} maxWidth={size} href="/users/1/edit">Slideover {size}</ModalLink>
        {/each}
    </div>
</Container>
