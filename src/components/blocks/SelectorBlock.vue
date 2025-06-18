<template>
  <div
    :id="settings.general?.customId"
    :class="[
      'selector-block',
      ...(settings.general?.customClasses || [])
    ]"
    :style="computedStyles"
    v-show="settings.general?.isVisible !== false"
  >
    <label v-if="content.label" :for="content.name" class="selector-label">
      {{ content.label }}
    </label>
    
    <select
      v-if="content.selectorType === 'dropdown'"
      :id="content.name"
      :name="content.name"
      v-model="selectedValue"
      class="selector-dropdown"
      :style="selectorStyles"
      @change="handleChange"
    >
      <option value="" disabled>{{ content.placeholder }}</option>
      <option
        v-for="option in content.options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    
    <div v-else-if="content.selectorType === 'radio'" class="selector-radio-group">
      <div
        v-for="option in content.options"
        :key="option.value"
        class="radio-option"
      >
        <input
          :id="`${content.name}-${option.value}`"
          type="radio"
          :name="content.name"
          :value="option.value"
          v-model="selectedValue"
          :disabled="option.disabled"
          @change="handleChange"
        />
        <label :for="`${content.name}-${option.value}`">
          {{ option.label }}
        </label>
      </div>
    </div>
    
    <div v-else-if="content.selectorType === 'checkbox'" class="selector-checkbox-group">
      <div
        v-for="option in content.options"
        :key="option.value"
        class="checkbox-option"
      >
        <input
          :id="`${content.name}-${option.value}`"
          type="checkbox"
          :value="option.value"
          v-model="selectedValues"
          :disabled="option.disabled"
          @change="handleChange"
        />
        <label :for="`${content.name}-${option.value}`">
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { SelectorContentData, StyleData, SettingsData } from '@/types/content-block.types'

interface Props {
  content: SelectorContentData
  styles: StyleData
  settings: SettingsData
}

const props = defineProps<Props>()

// Initialize selected values based on content
const selectedValue = ref(
  props.content.options.find(option => option.selected)?.value || ''
)

const selectedValues = ref(
  props.content.options.filter(option => option.selected).map(option => option.value)
)

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
  
  return styles
})

const selectorStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Apply border styles
  if (props.styles.border) {
    const border = props.styles.border
    if (border.width) styles.borderWidth = border.width
    if (border.style) styles.borderStyle = border.style
    if (border.color) styles.borderColor = border.color
    if (border.radius) styles.borderRadius = border.radius
  }
  
  // Apply background styles
  if (props.styles.background) {
    const background = props.styles.background
    if (background.color) styles.backgroundColor = background.color
  }
  
  // Apply typography styles
  if (props.styles.typography) {
    const typography = props.styles.typography
    if (typography.color) styles.color = typography.color
    if (typography.fontSize) styles.fontSize = typography.fontSize
    if (typography.fontFamily) styles.fontFamily = typography.fontFamily
  }
  
  return styles
})

const handleChange = () => {
  console.log('Selector changed:', {
    type: props.content.selectorType,
    selected: props.content.selectorType === 'checkbox' ? selectedValues.value : selectedValue.value
  })
  
  // Handle form behavior settings
  if ((props.settings.content as any)?.formBehavior?.submitOnChange) {
    // In a real app, you might trigger a form submission or API call here
    console.log('Auto-submitting due to change')
  }
}

// Watch for changes and emit events if needed
watch([selectedValue, selectedValues], () => {
  // Could emit custom events here for parent components to listen to
})
</script>

<style scoped>
.selector-block {
  /* Base styles */
}

.selector-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.selector-dropdown {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 1rem;
  color: #333;
}

.selector-dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.selector-radio-group,
.selector-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio-option input,
.checkbox-option input {
  margin: 0;
}

.radio-option label,
.checkbox-option label {
  margin: 0;
  cursor: pointer;
  color: #333;
}

/* Responsive styles */
@media (max-width: 768px) {
  .selector-dropdown {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
</style>
