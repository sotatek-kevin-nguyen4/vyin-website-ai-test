<template>
  <blockquote
    :id="settings.general?.customId"
    :class="[
      'quote-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    <div class="quote-content">
      <p class="quote-text">"{{ content.quote }}"</p>
    </div>
    
    <footer class="quote-footer">
      <div class="quote-author-info">
        <img 
          v-if="content.authorImage" 
          :src="content.authorImage" 
          :alt="`${content.author} photo`"
          class="author-image"
        />
        <div class="author-details">
          <cite class="author-name">{{ content.author }}</cite>
          <div class="author-position">{{ content.position }}</div>
          <div class="author-company">{{ content.company }}</div>
        </div>
      </div>
    </footer>
  </blockquote>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuoteContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: QuoteContentData
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
  }
  
  return styles
})
</script>

<style scoped>
.quote-block {
  margin: 0;
  position: relative;
}

.quote-content {
  margin-bottom: 1rem;
}

.quote-text {
  margin: 0;
  font-style: italic;
}

.quote-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  text-align: left;
}

.author-name {
  display: block;
  font-weight: 600;
  font-style: normal;
  margin-bottom: 0.25rem;
}

.author-position {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.125rem;
}

.author-company {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Responsive styles */
@media (max-width: 768px) {
  .quote-author-info {
    flex-direction: column;
    text-align: center;
  }
  
  .author-details {
    text-align: center;
  }
}
</style>
