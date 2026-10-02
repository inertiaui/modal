<script>
    import { Deferred, Modal, WhenVisible } from '@inertiaui/modal-svelte'

    let { deferA, deferB, lazy, optional } = $props()

    let visible = $state(false)
</script>

<Modal>
    {#snippet children({ reload })}
        <Deferred data={['deferA', 'deferB']}>
            {#snippet fallback()}
                <p data-testid="defer">Loading defer...</p>
            {/snippet}

            <p data-testid="defer" class="text-green-500">
                {deferA}
            </p>

            <p data-testid="defer-b" class="text-green-500">
                {deferB}
            </p>
        </Deferred>

        <div class="mt-8">
            <button type="button" onclick={() => reload({ only: ['lazy'] })} class="underline">Load lazy</button>

            <p data-testid="lazy" class={lazy ? 'text-green-500' : ''}>
                {lazy ?? 'No lazy data loaded'}
            </p>
        </div>

        <div class="mt-8">
            <button type="button" onclick={() => (visible = !visible)} class="underline">Make {visible ? 'invisible' : 'visible'}</button>

            <div class={visible ? '' : 'hidden'}>
                <WhenVisible data="optional" always>
                    {#snippet fallback()}
                        <p data-testid="optional">Loading optional...</p>
                    {/snippet}

                    <p data-testid="optional" class="text-green-500">
                        {optional}
                    </p>
                </WhenVisible>
            </div>
        </div>
    {/snippet}
</Modal>
