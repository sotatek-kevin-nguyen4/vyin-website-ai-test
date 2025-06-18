<template>
  <a
    :id="settings.general?.customId"
    :class="[
      'link-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    :href="content.url"
    :target="content.target"
    :rel="content.rel"
    :title="content.title"
    :tabindex="(settings.content as any)?.accessibility?.tabIndex"
    :aria-label="(settings.content as any)?.accessibility?.ariaLabel"
    v-show="settings.general?.isVisible !== false"
    @click="handleClick"
  >
    {{ content.linkText }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LinkContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: LinkContentData
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
    if (layout.zIndex) styles.zIndex = layout.zIndex.toString()
  }

  // Apply typography styles
  if (props.styles.typography) {
    const typography = props.styles.typography
    if (typography.color) styles.color = typography.color
    if (typography.fontSize) styles.fontSize = typography.fontSize
    if (typography.fontWeight) styles.fontWeight = typography.fontWeight.toString()
    if (typography.fontFamily) styles.fontFamily = typography.fontFamily
    if (typography.lineHeight) styles.lineHeight = typography.lineHeight.toString()
    if (typography.textAlign) styles.textAlign = typography.textAlign
    if (typography.textDecoration) styles.textDecoration = typography.textDecoration
  }

  // Apply background styles
  if (props.styles.background) {
    const background = props.styles.background
    if (background.color) styles.backgroundColor = background.color
    if (background.gradient) styles.background = background.gradient
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
    if (effects.opacity) styles.opacity = effects.opacity.toString()
    if (effects.transform) styles.transform = effects.transform
    if (effects.filter) styles.filter = effects.filter
    if (effects.transition) styles.transition = effects.transition
    if (effects.cursor) styles.cursor = effects.cursor
  }

  return styles
})

const handleClick = (event: MouseEvent) => {
  // Track analytics if enabled
  if ((props.settings.content as any)?.analytics?.trackClicks) {
    console.log('Link clicked:', props.content.url)

    // Fire custom events if specified
    if ((props.settings.content as any).analytics.customEvents) {
      (props.settings.content as any).analytics.customEvents.forEach((eventName: string) => {
        console.log('Custom event:', eventName)
        // In a real app, you'd send this to your analytics service
      })
    }
  }
}
</script>

<style scoped>
.link-block {
  /* Base styles for link blocks */
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-block:hover {
  /* Hover effects will be applied via computed styles or CSS */
}

/* Responsive styles */
@media (max-width: 768px) {
  .link-block {
    /* Mobile-specific styles will be applied via computed styles */
  }
}
</style>
