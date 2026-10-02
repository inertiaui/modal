<script>
    import { Modal } from '@inertiaui/modal-svelte'
</script>

<Modal closeButton={false} closeExplicitly={true} maxWidth="2xl" paddingClasses="p-8" panelClasses="bg-red-100 min-h-screen" position="left" slideover={true}>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Slideover with Props</h2>
    </div>
</Modal>
