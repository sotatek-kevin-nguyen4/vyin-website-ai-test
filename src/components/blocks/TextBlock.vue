<template>
  <div
    :id="settings.general?.customId"
    :class="[
      'text-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    {{ content.text }}
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { TextContentData, StyleData, SettingsData } from '@/types/content-block.types'
import { getMergedStyles, debounce } from '../../utils/style-utils'

interface Props {
  content: TextContentData
  styles: StyleData
  settings: SettingsData
}

const props = defineProps<Props>()
const windowWidth = ref(window.innerWidth)

const computedStyles = computed(() => {
  return getMergedStyles(props.styles)
})

// Handle window resize for responsive styles
const handleResize = debounce(() => {
  windowWidth.value = window.innerWidth
}, 250)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.text-block {
  word-wrap: break-word;
  line-height: 1.5;
}

/* Responsive styles are handled via computed styles */
</style>
