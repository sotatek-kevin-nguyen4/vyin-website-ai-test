<template>
  <component
    :is="blockComponent"
    :content="contentData"
    :styles="block.styleData"
    :settings="block.settingsData"
    :children="block.children"
    :key="block.id"
    v-if="blockComponent"
  />
  <div v-else class="unsupported-block">
    <p>Unsupported block type: {{ block.blockType }}</p>
    <pre>{{ JSON.stringify(block, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContentBlock } from '../types/content-block.types'

// Import all block components
import TextBlock from './blocks/TextBlock.vue'
import RichTextBlock from './blocks/RichTextBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import LinkBlock from './blocks/LinkBlock.vue'
import CTABlock from './blocks/CTABlock.vue'
import QuoteBlock from './blocks/QuoteBlock.vue'
import LogoListBlock from './blocks/LogoListBlock.vue'
import CardListBlock from './blocks/CardListBlock.vue'
import SelectorBlock from './blocks/SelectorBlock.vue'
import ContainerBlock from './blocks/ContainerBlock.vue'

interface Props {
  block: ContentBlock
}

const props = defineProps<Props>()

// Map block types to their corresponding components
const blockComponentMap = {
  TEXT: TextBlock,
  RICH_TEXT: RichTextBlock,
  IMAGE: ImageBlock,
  LINK: LinkBlock,
  CTA: CTABlock,
  QUOTE: QuoteBlock,
  LOGO_LIST: LogoListBlock,
  CARD_LIST: CardListBlock,
  SELECTOR: SelectorBlock,
  CONTAINER: ContainerBlock,
  // Add more block types as needed
  VIDEO: null, // Not implemented yet
  HERO_BANNER: null, // Not implemented yet
  CUSTOM_HTML: null, // Not implemented yet
} as const

const blockComponent = computed(() => {
  return blockComponentMap[props.block.blockType] || null
})

const contentData = computed(() => {
  return props.block.contentData as any
})
</script>

<style scoped>
.unsupported-block {
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin: 1rem 0;
}

.unsupported-block p {
  margin: 0 0 1rem 0;
  color: #dc3545;
  font-weight: 600;
}

.unsupported-block pre {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  color: #495057;
}
</style>
