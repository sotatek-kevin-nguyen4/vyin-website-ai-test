<template>
  <component
    :is="content.ctaType === 'button' ? 'button' : 'a'"
    :id="settings.general?.customId"
    :class="[
      'cta-block',
      `cta-${content.ctaType}`,
      content.icon?.position ? `cta-icon-${content.icon.position}` : 'cta-no-icon',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    :href="content.ctaType === 'link' ? content.url : undefined"
    :type="content.ctaType === 'button' ? 'button' : undefined"
    v-show="settings.general?.isVisible !== false"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span v-if="content.icon?.position === 'top'" class="cta-icon cta-icon-top">
      <i :class="`icon-${content.icon.name}`"></i>
    </span>

    <div class="cta-content" :class="`cta-content-${content.icon?.position || 'none'}`">
      <span v-if="content.icon?.position === 'left'" class="cta-icon cta-icon-left">
        <i :class="`icon-${content.icon.name}`"></i>
      </span>

      <span class="cta-text">{{ content.text }}</span>

      <span v-if="content.icon?.position === 'right'" class="cta-icon cta-icon-right">
        <i :class="`icon-${content.icon.name}`"></i>
      </span>
    </div>

    <span v-if="content.icon?.position === 'bottom'" class="cta-icon cta-icon-bottom">
      <i :class="`icon-${content.icon.name}`"></i>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CTAContentData, StyleData, SettingsData, CTAContentSettings } from '@/types/content-block.types'

interface Props {
  content: CTAContentData
  styles: StyleData
  settings: SettingsData
}

const props = defineProps<Props>()
const isHovered = ref(false)

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

  // Apply hover effects if hovered
  const ctaSettings = props.settings.content as CTAContentSettings
  if (isHovered.value && ctaSettings?.animationEffects?.hover) {
    const hoverStyles = ctaSettings.animationEffects.hover
    // Parse and apply hover styles
    const hoverRules = hoverStyles.split(';').filter((rule: string) => rule.trim())
    hoverRules.forEach((rule: string) => {
      const [property, value] = rule.split(':').map((s: string) => s.trim())
      if (property && value) {
        // Convert CSS property names to camelCase
        const camelProperty = property.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase())
        styles[camelProperty] = value
      }
    })
  }

  return styles
})

const handleClick = (event: MouseEvent) => {
  const ctaSettings = props.settings.content as CTAContentSettings

  // Apply click animation
  if (ctaSettings?.animationEffects?.click) {
    const clickStyles = ctaSettings.animationEffects.click
    // Apply click animation temporarily
    const element = event.target as HTMLElement
    element.style.cssText += clickStyles
    setTimeout(() => {
      // Reset after animation
      element.style.transform = ''
    }, 150)
  }

  // Handle navigation for button type
  if (props.content.ctaType === 'button') {
    window.location.href = props.content.url
  }

  // Track analytics
  if (ctaSettings?.analytics?.trackClicks) {
    console.log('CTA clicked:', {
      eventName: ctaSettings.analytics.customEvents?.[0] || 'cta_click',
      customData: ctaSettings.analytics.customData
    })
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.cta-block {
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Adjust flex direction based on icon position */
.cta-block.cta-icon-top,
.cta-block.cta-icon-bottom {
  flex-direction: column;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-content-top,
.cta-content-bottom {
  flex-direction: row;
}

.cta-content-left {
  flex-direction: row;
}

.cta-content-right {
  flex-direction: row;
}

.cta-content-none {
  flex-direction: row;
}

.cta-button {
  /* Button-specific styles */
}

.cta-link {
  /* Link-specific styles */
}

.cta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-icon-top,
.cta-icon-bottom {
  align-self: center;
}

.cta-icon-left {
  order: -1;
}

.cta-icon-right {
  order: 1;
}

.cta-text {
  /* Text styles */
}

/* Icon styles - you might want to use a proper icon library */
.icon-arrow-right::before {
  content: '→';
}

/* Responsive styles */
@media (max-width: 768px) {
  .cta-block {
    /* Mobile-specific styles will be applied via computed styles */
  }
}
</style>
