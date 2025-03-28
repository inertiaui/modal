<script setup>
import { Deferred, Modal, WhenVisible } from '@inertiaui/modal-vue'
import { ref } from 'vue';

defineProps({
    defer: String,
    lazy: String,
    optional: String,
})

const visible = ref(false)
</script>

<template>
    <Modal v-slot="{reload}">
        <Deferred data="defer">
            <template #fallback>
                <p dusk="defer">Loading defer...</p>
            </template>

            <p dusk="defer" class="text-green-500">
                {{ defer }}
            </p>
        </Deferred>

        <div class="mt-8">
            <button type="button" @click="reload({only: ['lazy']})" class="underline">
                Load lazy
            </button>

            <p dusk="lazy" :class="lazy ? 'text-green-500' : ''">
                {{ lazy ?? 'No lazy data loaded' }}
            </p>
        </div>

        <div class="mt-8">
            <button type="button" @click="visible = !visible" class="underline">
                Make {{ visible ? 'invisible' : 'visible' }}
            </button>

            <div v-show="visible">
                <WhenVisible data="optional" always>
                    <template #fallback>
                        <p dusk="optional">Loading optional...</p>
                    </template>

                    <p dusk="optional" class="text-green-500">
                        {{ optional }}
                    </p>
                </WhenVisible>
            </div>
        </div>
    </Modal>
</template>
