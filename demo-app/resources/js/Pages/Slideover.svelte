<script>
    import { Modal } from '@inertiaui/modal-svelte'
</script>

<Modal
    closeButton={false}
    closeExplicitly={true}
    slideover={true}
    paddingClasses="p-8"
    panelClasses="bg-red-100 min-h-screen"
    maxWidth="2xl"
    position="left"
    >
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Slideover with Props</h2>
    </div>
</Modal>
