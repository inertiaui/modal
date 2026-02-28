<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const isV2 = computed(() => route.path.startsWith('/v2/') || route.path === '/v2')
const isV0 = computed(() => !isV2.value && route.path !== '/')

const equivalentV2Path = computed(() => {
  if (!isV0.value) return null
  return '/v2' + route.path
})

const equivalentV0Path = computed(() => {
  if (!isV2.value) return null
  return route.path.replace(/^\/v2/, '') || '/introduction'
})
</script>

<template>
  <div v-if="isV2" class="version-banner beta">
    <strong>v2 (Beta)</strong> &mdash; You are viewing the v2 beta documentation.
    <a v-if="equivalentV0Path" :href="equivalentV0Path">Switch to v0 (Stable) &rarr;</a>
  </div>
  <div v-else-if="isV0" class="version-banner stable">
    Looking for the v2 beta docs?
    <a v-if="equivalentV2Path" :href="equivalentV2Path">Switch to v2 (Beta) &rarr;</a>
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
