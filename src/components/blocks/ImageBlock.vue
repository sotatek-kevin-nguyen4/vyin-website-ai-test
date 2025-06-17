<template>
  <div 
    :id="settings.general?.customId"
    :class="[
      'image-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    <img
      :src="content.imageUrl"
      :alt="content.altText"
      :title="content.title"
      :width="content.dimensions.width"
      :height="content.dimensions.height"
      :loading="settings.content?.lazyLoading ? 'lazy' : 'eager'"
      :style="imageStyles"
      @error="handleImageError"
    />
    <div v-if="content.caption" class="image-caption">
      {{ content.caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ImageContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: ImageContentData
  styles: StyleData
  settings: SettingsData
}

const props = defineProps<Props>()

const computedStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Apply layout styles
  if (props.styles.layout) {
    const layout = props.styles.layout
    if (layout.width) styles.width = layout.width
    if (layout.height) styles.height = layout.height
    if (layout.margin) styles.margin = layout.margin
    if (layout.padding) styles.padding = layout.padding
    if (layout.display) styles.display = layout.display
    if (layout.position) styles.position = layout.position
    if (layout.maxWidth) styles.maxWidth = layout.maxWidth
    if (layout.textAlign) styles.textAlign = layout.textAlign
    if (layout.zIndex) styles.zIndex = layout.zIndex
    if (layout.top) styles.top = layout.top
    if (layout.left) styles.left = layout.left
  }
  
  // Apply background styles
  if (props.styles.background) {
    const background = props.styles.background
    if (background.color) styles.backgroundColor = background.color
  }
  
  // Apply border styles
  if (props.styles.border) {
    const border = props.styles.border
    if (border.width) styles.borderWidth = border.width
    if (border.style) styles.borderStyle = border.style
    if (border.color) styles.borderColor = border.color
    if (border.radius) styles.borderRadius = border.radius
  }
  
  // Apply effects
  if (props.styles.effects) {
    const effects = props.styles.effects
    if (effects.boxShadow) styles.boxShadow = effects.boxShadow
    if (effects.opacity) styles.opacity = effects.opacity
    if (effects.transform) styles.transform = effects.transform
    if (effects.filter) styles.filter = effects.filter
    if (effects.transition) styles.transition = effects.transition
    if (effects.cursor) styles.cursor = effects.cursor
  }
  
  return styles
})

const imageStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Apply image-specific effects
  if (props.styles.effects) {
    const effects = props.styles.effects
    if (effects.objectFit) styles.objectFit = effects.objectFit
    if (effects.filter) styles.filter = effects.filter
  }
  
  return styles
})

const handleImageError = (event: Event) => {
  console.warn('Failed to load image:', props.content.imageUrl)
  // Could implement fallback image logic here
}
</script>

<style scoped>
.image-block {
  /* Base styles for image blocks */
}

.image-block img {
  max-width: 100%;
  height: auto;
}

.image-caption {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
}

/* Responsive styles */
@media (max-width: 768px) {
  .image-block {
    /* Mobile-specific styles will be applied via computed styles */
  }
}
</style>
