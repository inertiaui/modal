<script setup>
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const route = useRoute()
const { site } = useData()

// Strip the base path to get the clean route (e.g. /v2/modal-props)
const cleanPath = computed(() => {
  const base = site.value.base || '/'
  if (base !== '/' && route.path.startsWith(base)) {
    return route.path.slice(base.length - 1) // keep leading /
  }
  return route.path
})

const isV0 = computed(() => cleanPath.value.startsWith('/v0/') || cleanPath.value === '/v0')
const isV2 = computed(() => cleanPath.value.startsWith('/v2/') || cleanPath.value === '/v2')

const equivalentV3Path = computed(() => {
  if (isV0.value) {
    return withBase(cleanPath.value.replace(/^\/v0/, '') || '/introduction')
  }
  if (isV2.value) {
    return withBase(cleanPath.value.replace(/^\/v2/, '') || '/introduction')
  }
  return null
})
</script>

<template>
  <div v-if="isV0" class="version-banner beta">
    <strong>v0 (Unsupported)</strong> &mdash; This version is no longer supported.
    <a v-if="equivalentV3Path" :href="equivalentV3Path">Switch to v3 (Inertia 3) &rarr;</a>
  </div>

  <div v-if="isV2" class="version-banner stable">
    <strong>v2 (Inertia 2 only)</strong> &mdash; This version only works with Inertia.js v2. For Inertia.js v3, use Inertia Modal 3.x.
    <a v-if="equivalentV3Path" :href="equivalentV3Path">Switch to v3 docs &rarr;</a>
  </div>
</template>

<style scoped>
.version-banner {
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.version-banner.beta {
  background-color: var(--vp-custom-block-warning-bg);
  border: 1px solid var(--vp-custom-block-warning-border);
  color: var(--vp-custom-block-warning-text);
}

.version-banner.stable {
  background-color: var(--vp-custom-block-info-bg);
  border: 1px solid var(--vp-custom-block-info-border);
  color: var(--vp-custom-block-info-text);
}

.version-banner a {
  font-weight: 600;
  text-decoration: underline;
}
</style>
