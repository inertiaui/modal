<script setup>
import { Deferred, Modal, WhenVisible } from '@inertiaui/modal-vue'
import { ref } from 'vue';

defineProps({
    deferA: String,
    deferB: String,
    lazy: String,
    optional: String,
})

const visible = ref(false)
</script>

<template>
    <Modal v-slot="{reload}">
        <Deferred :data="['deferA', 'deferB']">
            <template #fallback>
                <p data-testid="defer">Loading defer...</p>
            </template>

            <p data-testid="defer" class="text-green-500">
                {{ deferA }}
            </p>

            <p data-testid="defer-b" class="text-green-500">
                {{ deferB }}
            </p>
        </Deferred>

        <div class="mt-8">
            <button type="button" @click="reload({only: ['lazy']})" class="underline">
                Load lazy
            </button>

            <p data-testid="lazy" :class="lazy ? 'text-green-500' : ''">
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
                        <p data-testid="optional">Loading optional...</p>
                    </template>

                    <p data-testid="optional" class="text-green-500">
                        {{ optional }}
                    </p>
                </WhenVisible>
            </div>
        </div>
    </Modal>
</template>
