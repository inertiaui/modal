<script>
    import { Deferred, Modal, WhenVisible } from '@inertiaui/modal-svelte'

    let { deferA, deferB, lazy, optional } = $props()

    let visible = $state(false)
</script>

<Modal>
    {#snippet children({ reload })}
        <Deferred data={['deferA', 'deferB']}>
            {#snippet fallback()}
                <p dusk="defer">Loading defer...</p>
            {/snippet}

            <p dusk="defer" class="text-green-500">
                {deferA}
            </p>

            <p dusk="defer-b" class="text-green-500">
                {deferB}
            </p>
        </Deferred>

        <div class="mt-8">
            <button type="button" onclick={() => reload({only: ['lazy']})} class="underline">
                Load lazy
            </button>

            <p dusk="lazy" class={lazy ? 'text-green-500' : ''}>
                {lazy ?? 'No lazy data loaded'}
            </p>
        </div>

        <div class="mt-8">
            <button type="button" onclick={() => visible = !visible} class="underline">
                Make {visible ? 'invisible' : 'visible'}
            </button>

            {#if visible}
                <div>
                    <WhenVisible data="optional" always>
                        {#snippet fallback()}
                            <p dusk="optional">Loading optional...</p>
                        {/snippet}

                        <p dusk="optional" class="text-green-500">
                            {optional}
                        </p>
                    </WhenVisible>
                </div>
            {/if}
        </div>
    {/snippet}
</Modal>
