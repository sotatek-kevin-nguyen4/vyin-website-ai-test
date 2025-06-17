<template>
  <div 
    :id="settings.general?.customId"
    :class="[
      'rich-text-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
    v-html="processedContent"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RichTextContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: RichTextContentData
  styles: StyleData
  settings: SettingsData
}

const props = defineProps<Props>()

const processedContent = computed(() => {
  let html = props.content.htmlContent
  
  // Apply highlight configuration if present
  if (props.content.highlightConfig) {
    const { highlightColor, highlightStyle, highlightedPhrases } = props.content.highlightConfig
    
    highlightedPhrases.forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi')
      const highlightClass = highlightStyle === 'background' ? 'highlight-bg' : 'highlight-text'
      html = html.replace(regex, `<span class="${highlightClass}" style="color: ${highlightColor}; ${highlightStyle === 'background' ? `background-color: ${highlightColor}; color: white; padding: 2px 4px; border-radius: 3px;` : ''}">${phrase}</span>`)
    })
  }
  
  return html
})

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
  }
  
  // Apply typography styles
  if (props.styles.typography) {
    const typography = props.styles.typography
    if (typography.color) styles.color = typography.color
    if (typography.fontSize) styles.fontSize = typography.fontSize
    if (typography.fontWeight) styles.fontWeight = typography.fontWeight
    if (typography.fontFamily) styles.fontFamily = typography.fontFamily
    if (typography.lineHeight) styles.lineHeight = typography.lineHeight
    if (typography.textAlign) styles.textAlign = typography.textAlign
    if (typography.textDecoration) styles.textDecoration = typography.textDecoration
  }
  
  // Apply background styles
  if (props.styles.background) {
    const background = props.styles.background
    if (background.color) styles.backgroundColor = background.color
    if (background.image) styles.backgroundImage = `url(${background.image})`
    if (background.size) styles.backgroundSize = background.size
    if (background.position) styles.backgroundPosition = background.position
    if (background.repeat) styles.backgroundRepeat = background.repeat
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
    if (effects.opacity) styles.opacity = effects.opacity
    if (effects.transform) styles.transform = effects.transform
    if (effects.filter) styles.filter = effects.filter
    if (effects.transition) styles.transition = effects.transition
    if (effects.cursor) styles.cursor = effects.cursor
  }
  
  return styles
})
</script>

<style scoped>
.rich-text-block {
  /* Base styles for rich text blocks */
}

.rich-text-block :deep(h1),
.rich-text-block :deep(h2),
.rich-text-block :deep(h3) {
  margin: 0;
  font-weight: inherit;
}

.rich-text-block :deep(.highlight) {
  /* Highlight styles will be applied inline */
}

/* Responsive styles */
@media (max-width: 768px) {
  .rich-text-block {
    /* Mobile-specific styles will be applied via computed styles */
  }
}
</style>
