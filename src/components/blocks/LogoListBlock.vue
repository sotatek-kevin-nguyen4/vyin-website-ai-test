<template>
  <div
    :id="settings.general?.customId"
    :class="[
      'logo-list-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    <div v-if="content.title" class="logo-list-title">
      <h2>{{ content.title }}</h2>
    </div>
    
    <div v-if="content.description" class="logo-list-description">
      <p>{{ content.description }}</p>
    </div>
    
    <div class="logo-grid" :style="gridStyles">
      <div
        v-for="logo in content.logos"
        :key="logo.id"
        class="logo-item"
        :class="{ 'logo-clickable': logo.websiteUrl }"
      >
        <component
          :is="logo.websiteUrl ? 'a' : 'div'"
          :href="logo.websiteUrl || undefined"
          :target="logo.openInNewTab ? '_blank' : '_self'"
          :rel="logo.openInNewTab ? 'noopener noreferrer' : undefined"
          class="logo-wrapper"
          @click="handleLogoClick(logo)"
        >
          <img
            :src="logo.imageUrl"
            :alt="logo.altText"
            :title="logo.name"
            class="logo-image"
            :loading="(settings.content as any)?.lazyLoading?.enabled ? 'lazy' : 'eager'"
          />
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LogoListContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: LogoListContentData
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
    if (layout.textAlign) styles.textAlign = layout.textAlign
  }
  
  // Apply background styles
  if (props.styles.background) {
    const background = props.styles.background
    if (background.color) styles.backgroundColor = background.color
    if (background.gradient) styles.background = background.gradient
  }
  
  return styles
})

const gridStyles = computed(() => {
  const styles: Record<string, string> = {
    display: 'grid'
  }
  
  if (props.styles.grid) {
    const grid = props.styles.grid
    if (grid.gridTemplateColumns) styles.gridTemplateColumns = grid.gridTemplateColumns
    if (grid.gridGap) styles.gridGap = grid.gridGap
    if (grid.gap) styles.gap = grid.gap
    if (grid.alignItems) styles.alignItems = grid.alignItems
    if (grid.justifyItems) styles.justifyItems = grid.justifyItems
    if (grid.justifyContent) styles.justifyContent = grid.justifyContent
  }
  
  return styles
})

const handleLogoClick = (logo: any) => {
  console.log('Logo clicked:', logo.name)
  // Analytics tracking could be added here
}
</script>

<style scoped>
.logo-list-block {
  /* Base styles */
}

.logo-list-title h2 {
  margin: 0 0 1rem 0;
  text-align: center;
  color: #ffffff;
}

.logo-list-description p {
  margin: 0 0 2rem 0;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
}

.logo-grid {
  display: grid;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrapper {
  display: block;
  transition: all 0.3s ease;
  text-decoration: none;
}

.logo-clickable .logo-wrapper:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

.logo-image {
  max-width: 100%;
  max-height: 60px;
  width: auto;
  height: auto;
  filter: brightness(0) invert(1); /* Make logos white */
  transition: filter 0.3s ease;
}

.logo-clickable:hover .logo-image {
  filter: brightness(0) invert(0.8);
}

/* Responsive styles */
@media (max-width: 768px) {
  .logo-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 20px !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .logo-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
</style>
