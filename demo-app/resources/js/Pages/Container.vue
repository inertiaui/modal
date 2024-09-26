<template>
    <div class="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <div
            v-if="$page.props.flash.message"
            class="mb-4 border-l-4 border-green-400 bg-green-50 p-4"
        >
            <p class="text-sm text-green-600">
                {{ $page.props.flash.message }}
            </p>
        </div>

        <slot />
    </div>
</template>
