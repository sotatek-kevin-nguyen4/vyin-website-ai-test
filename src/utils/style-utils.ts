import type { StyleData } from '@/types/content-block.types'

/**
 * Utility function to generate CSS styles from StyleData
 */
export function generateStylesFromData(styleData: StyleData): Record<string, string> {
  const styles: Record<string, string> = {}
  
  // Apply layout styles
  if (styleData.layout) {
    const layout = styleData.layout
    if (layout.width) styles.width = layout.width
    if (layout.height) styles.height = layout.height
    if (layout.margin) styles.margin = layout.margin
    if (layout.padding) styles.padding = layout.padding
    if (layout.display) styles.display = layout.display
    if (layout.position) styles.position = layout.position
    if (layout.top) styles.top = layout.top
    if (layout.left) styles.left = layout.left
    if (layout.zIndex) styles.zIndex = layout.zIndex
    if (layout.maxWidth) styles.maxWidth = layout.maxWidth
    if (layout.textAlign) styles.textAlign = layout.textAlign
  }
  
  // Apply typography styles
  if (styleData.typography) {
    const typography = styleData.typography
    if (typography.color) styles.color = typography.color
    if (typography.fontSize) styles.fontSize = typography.fontSize
    if (typography.fontWeight) styles.fontWeight = typography.fontWeight
    if (typography.fontFamily) styles.fontFamily = typography.fontFamily
    if (typography.lineHeight) styles.lineHeight = typography.lineHeight
    if (typography.textAlign) styles.textAlign = typography.textAlign
    if (typography.textDecoration) styles.textDecoration = typography.textDecoration
  }
  
  // Apply background styles
  if (styleData.background) {
    const background = styleData.background
    if (background.color) styles.backgroundColor = background.color
    if (background.image) styles.backgroundImage = `url(${background.image})`
    if (background.size) styles.backgroundSize = background.size
    if (background.position) styles.backgroundPosition = background.position
    if (background.repeat) styles.backgroundRepeat = background.repeat
    if (background.gradient) styles.background = background.gradient
  }
  
  // Apply border styles
  if (styleData.border) {
    const border = styleData.border
    if (border.width) styles.borderWidth = border.width
    if (border.style) styles.borderStyle = border.style
    if (border.color) styles.borderColor = border.color
    if (border.radius) styles.borderRadius = border.radius
  }
  
  // Apply effects
  if (styleData.effects) {
    const effects = styleData.effects
    if (effects.boxShadow) styles.boxShadow = effects.boxShadow
    if (effects.opacity) styles.opacity = effects.opacity
    if (effects.transform) styles.transform = effects.transform
    if (effects.filter) styles.filter = effects.filter
    if (effects.transition) styles.transition = effects.transition
    if (effects.cursor) styles.cursor = effects.cursor
    if (effects.objectFit) styles.objectFit = effects.objectFit
  }
  
  // Apply grid styles
  if (styleData.grid) {
    const grid = styleData.grid
    if (grid.gridTemplateColumns) styles.gridTemplateColumns = grid.gridTemplateColumns
    if (grid.gridGap) styles.gridGap = grid.gridGap
    if (grid.gap) styles.gap = grid.gap
    if (grid.alignItems) styles.alignItems = grid.alignItems
    if (grid.justifyItems) styles.justifyItems = grid.justifyItems
    if (grid.justifyContent) styles.justifyContent = grid.justifyContent
  }
  
  return styles
}

/**
 * Get responsive styles for a specific breakpoint
 */
export function getResponsiveStyles(styleData: StyleData, breakpoint: 'mobile' | 'tablet' | 'desktop'): Record<string, string> {
  if (!styleData.responsive || !styleData.responsive[breakpoint]) {
    return {}
  }
  
  return generateStylesFromData(styleData.responsive[breakpoint])
}

/**
 * Check if current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: 'mobile' | 'tablet' | 'desktop'): boolean {
  const width = window.innerWidth
  
  switch (breakpoint) {
    case 'mobile':
      return width <= 768
    case 'tablet':
      return width > 768 && width <= 1024
    case 'desktop':
      return width > 1024
    default:
      return false
  }
}

/**
 * Merge base styles with responsive styles based on current viewport
 */
export function getMergedStyles(styleData: StyleData): Record<string, string> {
  let styles = generateStylesFromData(styleData)
  
  // Apply responsive styles based on current viewport
  if (matchesBreakpoint('mobile') && styleData.responsive?.mobile) {
    styles = { ...styles, ...generateStylesFromData(styleData.responsive.mobile) }
  } else if (matchesBreakpoint('tablet') && styleData.responsive?.tablet) {
    styles = { ...styles, ...generateStylesFromData(styleData.responsive.tablet) }
  } else if (matchesBreakpoint('desktop') && styleData.responsive?.desktop) {
    styles = { ...styles, ...generateStylesFromData(styleData.responsive.desktop) }
  }
  
  return styles
}

/**
 * Convert camelCase CSS properties to kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Generate CSS string from style object
 */
export function stylesToCSS(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([property, value]) => `${camelToKebab(property)}: ${value}`)
    .join('; ')
}

/**
 * Parse animation effects string and apply to element
 */
export function applyAnimationEffects(element: HTMLElement, effects: string, duration = 150) {
  const originalStyle = element.style.cssText
  element.style.cssText += effects
  
  setTimeout(() => {
    element.style.cssText = originalStyle
  }, duration)
}

/**
 * Debounce function for resize events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
