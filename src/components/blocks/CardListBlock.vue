<template>
  <div
    :id="settings.general?.customId"
    :class="[
      'card-list-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    <div v-if="content.title" class="card-list-title">
      <h2>{{ content.title }}</h2>
    </div>
    
    <div class="card-grid" :style="gridStyles">
      <div
        v-for="card in content.cards"
        :key="card.id"
        class="card-item"
      >
        <div class="card">
          <div class="card-image">
            <img
              :src="card.image.url"
              :alt="card.image.altText"
              :loading="settings.content?.lazyLoading?.enabled ? 'lazy' : 'eager'"
            />
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.description }}</p>
            
            <div v-if="card.price" class="card-price">
              ${{ card.price }}
            </div>
            
            <a
              :href="card.cta.url"
              :class="['card-cta', `cta-${card.cta.style}`]"
              @click="handleCardClick(card)"
            >
              {{ card.cta.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardListContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: CardListContentData
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
  }
  
  return styles
})

const handleCardClick = (card: any) => {
  console.log('Card clicked:', card.title)
  // Analytics tracking could be added here
}
</script>

<style scoped>
.card-list-block {
  /* Base styles */
}

.card-list-title h2 {
  margin: 0 0 2rem 0;
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
}

.card-grid {
  display: grid;
}

.card-item {
  /* Individual card container */
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0 0 1.5rem 0;
  color: #666;
  line-height: 1.6;
  flex: 1;
}

.card-price {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #28a745;
}

.card-cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-top: auto;
}

.card-cta:hover {
  background: #0056b3;
}

.cta-primary {
  background: #007bff;
}

.cta-primary:hover {
  background: #0056b3;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
