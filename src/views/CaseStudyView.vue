<template>
  <div class="case-study-view">
    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading case study...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <h2>Error Loading Case Study</h2>
      <p>{{ error }}</p>
      <button @click="loadData" class="retry-button">Retry</button>
    </div>

    <!-- Main content -->
    <div v-else-if="pageData" class="case-study-content">
      <!-- SEO Meta tags would be set here in a real app -->

      <!-- Render all content blocks in order -->
      <ContentBlockRenderer
        v-for="block in sortedContentBlocks"
        :key="block.id"
        :block="block"
        class="content-block"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="empty-container">
      <h2>No Content Available</h2>
      <p>The case study content could not be loaded.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ContentBlockRenderer from '../components/ContentBlockRenderer.vue'
import type { Page } from '../types/content-block.types'

// Reactive state
const loading = ref(true)
const error = ref<string | null>(null)
const pageData = ref<Page | null>(null)

// Computed properties
const sortedContentBlocks = computed(() => {
  if (!pageData.value?.contentBlocks) return []

  // Sort blocks by positionOrder
  return [...pageData.value.contentBlocks].sort((a, b) => a.positionOrder - b.positionOrder)
})

// Methods
const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    // In a real application, this would be an API call
    // For now, we'll load the static data.json file
    const response = await fetch('/data.json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    pageData.value = data

    // Set document title and meta tags
    if (data.title) {
      document.title = data.title
    }

    // Set meta description
    if (data.metaOgDescription) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', data.metaOgDescription)
    }

    // Set Open Graph meta tags
    if (data.metaOgTitle) {
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.setAttribute('content', data.metaOgTitle)
    }

    if (data.metaOgDescription) {
      let ogDescription = document.querySelector('meta[property="og:description"]')
      if (!ogDescription) {
        ogDescription = document.createElement('meta')
        ogDescription.setAttribute('property', 'og:description')
        document.head.appendChild(ogDescription)
      }
      ogDescription.setAttribute('content', data.metaOgDescription)
    }

  } catch (err) {
    console.error('Failed to load case study data:', err)
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Add body class for styling
  document.body.classList.add('case-study-view')
  loadData()
})

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.body.classList.remove('case-study-view')
})
</script>

<style scoped>
.case-study-view {
  min-height: 100vh;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  color: #dc3545;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: #0056b3;
}

.case-study-content {
  background: #ffffff;
}

.content-block {
  position: relative;
}
</style>
