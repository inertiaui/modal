<script>
    import { page } from '@inertiajs/svelte'
    let { children } = $props()
</script>

<p>Logged in as: { $page.props.auth.user?.id ?? '-' }</p>
<div class="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
    {#if $page.props.flash.message}
        <div class="mb-4 border-l-4 border-green-400 bg-green-50 p-4">
            <p class="text-sm text-green-600">
                { $page.props.flash.message }
            </p>
        </div>
    {/if}

    {@render children()}
</div>
