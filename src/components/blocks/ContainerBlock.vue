<template>
  <component
    :is="containerElement"
    :id="settings.general?.customId"
    :class="containerClasses"
    :style="computedStyles"
    :role="content.ariaRole"
    :aria-label="content.ariaLabel"
    v-bind="content.customAttributes"
    v-show="settings.general?.isVisible !== false"
  >
    <!-- Render child blocks if they exist -->
    <ContentBlockRenderer
      v-for="childBlock in sortedChildren"
      :key="childBlock.id"
      :block="childBlock"
      class="container-child"
    />

    <!-- Drop zone indicator for editor mode (placeholder for future implementation) -->
    <div
      v-if="isEditorMode && (!children || children.length === 0)"
      class="drop-zone-placeholder"
    >
      <p>Drop content blocks here</p>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContainerContentData, StyleData, SettingsData, ContentBlock, ContainerContentSettings } from '@/types/content-block.types'
import { getMergedStyles } from '@/utils/style-utils'
import ContentBlockRenderer from '../ContentBlockRenderer.vue'

interface Props {
  content: ContainerContentData
  styles: StyleData
  settings: SettingsData
  children?: ContentBlock[]
  isEditorMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
  isEditorMode: false
})

// Determine the HTML element to render
const containerElement = computed(() => {
  return props.content.containerType || 'div'
})

// Compute CSS classes for the container
const containerClasses = computed(() => {
  const classes = ['container-block']

  // Add custom CSS classes from content data
  if (props.content.customClasses) {
    classes.push(...props.content.customClasses)
  }

  // Add general custom classes from settings
  if (props.settings.general?.customClasses) {
    classes.push(...props.settings.general.customClasses)
  }

  // Add layout type class for styling hints
  if (props.content.layoutType) {
    classes.push(`layout-${props.content.layoutType}`)
  }

  return classes
})

// Compute styles including container-specific settings
const computedStyles = computed(() => {
  const styles = getMergedStyles(props.styles)

  // Apply container-specific settings from ContainerContentSettings
  const containerSettings = (props.settings.content as ContainerContentSettings)?.container

  if (containerSettings) {
    // Apply layout settings
    if (containerSettings.layout) {
      const layout = containerSettings.layout
      if (layout.display) styles.display = layout.display
      if (layout.flexDirection) styles.flexDirection = layout.flexDirection
      if (layout.flexWrap) styles.flexWrap = layout.flexWrap
      if (layout.justifyContent) styles.justifyContent = layout.justifyContent
      if (layout.alignItems) styles.alignItems = layout.alignItems
      if (layout.gridTemplateColumns) styles.gridTemplateColumns = layout.gridTemplateColumns
      if (layout.gridTemplateRows) styles.gridTemplateRows = layout.gridTemplateRows
      if (layout.gridGap) styles.gridGap = layout.gridGap
    }

    // Apply spacing settings
    // Note: spacing, background, border are now handled via styleData
    // Legacy support for container-specific settings can be added here if needed

  }

  // Apply content data constraints
  if (props.content.minHeight) {
    styles.minHeight = props.content.minHeight
  }

  if (props.content.maxWidth) {
    styles.maxWidth = props.content.maxWidth
  }

  return styles
})

// Sort children by position order
const sortedChildren = computed(() => {
  if (!props.children) return []
  return [...props.children].sort((a, b) => a.positionOrder - b.positionOrder)
})

</script>

<style scoped>
.container-block {
  position: relative;
  box-sizing: border-box;
}

/* Layout type specific styles */
.layout-flex {
  display: flex;
}

.layout-grid {
  display: grid;
}

.layout-block {
  display: block;
}

.layout-inline-block {
  display: inline-block;
}

/* Container child styling */
.container-child {
  /* Individual child block styling if needed */
}

/* Drop zone placeholder for editor mode */
.drop-zone-placeholder {
  min-height: 100px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
  background: #f9f9f9;
  margin: 10px 0;
}

.drop-zone-placeholder p {
  margin: 0;
  font-size: 14px;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .container-block {
    /* Mobile-specific container adjustments */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .container-block {
    /* Tablet-specific container adjustments */
  }
}

@media (min-width: 1025px) {
  .container-block {
    /* Desktop-specific container adjustments */
  }
}
</style>
