<script setup>
import { DialogClose } from 'reka-ui'
</script>

<template>
    <DialogClose class="im-close-button text-gray-400 hover:text-gray-500">
        <span class="sr-only">Close</span>
        <svg
            class="size-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            ></path>
        </svg>
    </DialogClose>
</template>
