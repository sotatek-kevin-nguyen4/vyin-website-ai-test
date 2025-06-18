/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * TypeScript interfaces for Content Block styleData and settingsData
 * These interfaces define the structure of JSON data stored in the content_block table
 */

// =============================================================================
// STYLE DATA INTERFACES - Visual Appearance & Layout
// =============================================================================

export interface LayoutStyle {
  width?: string // "100%", "500px", "auto"
  height?: string // "300px", "auto", "100vh"
  minWidth?: string // "200px", "50%"
  maxWidth?: string // "1200px", "100%"
  minHeight?: string // "100px", "50vh"
  maxHeight?: string // "800px", "100vh"
  margin?: string // "10px 20px", "auto"
  padding?: string // "15px", "10px 20px"
  display?: 'block' | 'flex' | 'grid' | 'inline-block' | 'none'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string // "10px", "50%"
  right?: string // "10px", "50%"
  bottom?: string // "10px", "50%"
  left?: string // "10px", "50%"
  zIndex?: number // 1, 10, 100
}

export interface FlexStyle {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: string // "10px", "1rem"
}

export interface GridStyle {
  gridTemplateColumns?: string // "repeat(3, 1fr)", "200px 1fr 100px"
  gridTemplateRows?: string // "repeat(2, 200px)", "auto 1fr"
  gridGap?: string // "20px", "10px 20px"
  gridColumnGap?: string // "20px"
  gridRowGap?: string // "15px"
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'
  alignItems?: 'start' | 'end' | 'center' | 'stretch'
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
}

export interface TypographyStyle {
  fontSize?: string // "16px", "1.2rem", "large"
  fontWeight?: string | number // "normal", "bold", "600", 400
  fontFamily?: string // "Arial", "Helvetica, sans-serif"
  fontStyle?: 'normal' | 'italic' | 'oblique'
  lineHeight?: string | number // "1.5", "24px", 1.6
  letterSpacing?: string // "0.1em", "2px"
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  color?: string // "#333333", "rgb(255,0,0)", "var(--primary-color)"
  textShadow?: string // "1px 1px 2px rgba(0,0,0,0.5)"
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
}

export interface BackgroundStyle {
  color?: string // "#ffffff", "transparent", "rgba(255,0,0,0.5)"
  image?: string // URL or media file ID reference
  size?: 'auto' | 'cover' | 'contain' | string // "100px 200px"
  position?: string // "center", "top left", "50% 50%"
  repeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
  attachment?: 'scroll' | 'fixed' | 'local'
  gradient?: string // "linear-gradient(45deg, #ff0000, #0000ff)"
}

export interface BorderStyle {
  width?: string // "1px", "2px 4px", "thin"
  style?:
    | 'none'
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
  color?: string // "#cccccc", "currentColor"
  radius?: string // "5px", "50%", "10px 20px"
  topWidth?: string // "2px"
  rightWidth?: string // "2px"
  bottomWidth?: string // "2px"
  leftWidth?: string // "2px"
  topLeftRadius?: string // "10px"
  topRightRadius?: string // "10px"
  bottomLeftRadius?: string // "10px"
  bottomRightRadius?: string // "10px"
}

export interface EffectsStyle {
  boxShadow?: string // "0 2px 4px rgba(0,0,0,0.1)", "inset 0 1px 3px #ccc"
  textShadow?: string // "1px 1px 2px rgba(0,0,0,0.5)"
  opacity?: number // 0.8, 1.0 (0-1)
  transform?: string // "rotate(45deg)", "scale(1.1)", "translateX(10px)"
  transformOrigin?: string // "center", "top left", "50% 50%"
  filter?: string // "blur(2px)", "brightness(1.2)", "grayscale(100%)"
  backdropFilter?: string // "blur(10px)", "brightness(0.8)"
  transition?: string // "all 0.3s ease", "opacity 0.5s"
  cursor?: string // "pointer", "grab", "not-allowed"
}

export interface ResponsiveStyleData {
  mobile?: Partial<StyleData> // < 768px
  tablet?: Partial<StyleData> // 768px - 1024px
  desktop?: Partial<StyleData> // > 1024px
  largeDesktop?: Partial<StyleData> // > 1440px
}

export interface StyleData {
  layout?: LayoutStyle
  flex?: FlexStyle
  grid?: GridStyle
  typography?: TypographyStyle
  background?: BackgroundStyle
  border?: BorderStyle
  effects?: EffectsStyle
  responsive?: ResponsiveStyleData
  customCSS?: string // Custom CSS rules
}

// =============================================================================
// BASE COMMON INTERFACES - Shared Configurations to Eliminate Duplication
// =============================================================================

/**
 * Base responsive configuration interface
 * Used across multiple block types for consistent responsive behavior
 */
export interface BaseResponsiveConfig {
  mobile?: Record<string, any>
  tablet?: Record<string, any>
  desktop?: Record<string, any>
  largeDesktop?: Record<string, any>
}

/**
 * Base lazy loading configuration interface
 * Standardizes lazy loading across all block types that support it
 */
export interface BaseLazyLoadingConfig {
  enabled?: boolean
  threshold?: number // Intersection observer threshold (0-1)
}

/**
 * Base analytics configuration interface
 * Consolidates all tracking and analytics options
 */
export interface BaseAnalyticsConfig {
  trackClicks?: boolean
  trackViews?: boolean
  trackHovers?: boolean
  customEvents?: string[]
  customData?: Record<string, any>
  eventName?: string
}

/**
 * Base validation configuration interface
 * Standardizes form validation across all form-related blocks
 */
export interface BaseValidationConfig {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string // Regex pattern
  customValidation?: string
}

/**
 * Base columns configuration interface
 * Standardizes responsive column layouts
 */
export interface BaseColumnsConfig {
  mobile?: number
  tablet?: number
  desktop?: number
}

// =============================================================================
// SETTINGS DATA INTERFACES - Functional Configuration & Behavior
// =============================================================================

export interface GeneralSettings {
  isVisible?: boolean // Show/hide block
  isLocked?: boolean // Prevent editing in builder
  customId?: string // Custom HTML ID attribute
  customClasses?: string[] // Custom CSS classes
  customAttributes?: Record<string, string> // Custom HTML attributes
  seoOptimized?: boolean // SEO optimization flag
  accessibilityLabel?: string // ARIA label
  tabIndex?: number // Tab order
}

export interface AnimationSettings {
  type?:
    | 'none'
    | 'fadeIn'
    | 'fadeOut'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'bounce'
    | 'pulse'
    | 'shake'
    | 'flip'
    | 'zoom'
    | 'rotate'
    | 'custom'
  duration?: number // Animation duration in milliseconds (0-5000)
  delay?: number // Animation delay in milliseconds (0-2000)
  trigger?: 'onLoad' | 'onScroll' | 'onClick' | 'onHover' | 'manual'
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
  repeat?: number | 'infinite' // Number of repetitions
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  customKeyframes?: string // Custom CSS keyframes
}

export interface InteractionSettings {
  clickable?: boolean // Can be clicked
  hoverable?: boolean // Has hover effects
  draggable?: boolean // Can be dragged (in builder)
  selectable?: boolean // Can be selected
  contextMenu?: boolean // Has right-click menu
  tooltip?: {
    enabled?: boolean
    text?: string
    position?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
  }
  modal?: {
    enabled?: boolean
    content?: string
    size?: 'small' | 'medium' | 'large' | 'fullscreen'
  }
}

export interface AnalyticsSettings {
  trackClicks?: boolean
  trackViews?: boolean
  trackHovers?: boolean
  trackScrollDepth?: boolean
  customEvents?: string[]
  gtmDataLayer?: Record<string, any>
  pixelTracking?: {
    facebook?: string
    google?: string
    linkedin?: string
  }
}

export interface SEOSettings {
  structuredData?: Record<string, any> // JSON-LD structured data
  microdata?: Record<string, any> // Microdata attributes
  openGraph?: {
    title?: string
    description?: string
    image?: string
    type?: string
  }
  twitterCard?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
    title?: string
    description?: string
    image?: string
  }
}

export interface IntegrationSettings {
  analytics?: AnalyticsSettings
  seo?: SEOSettings
  thirdParty?: {
    googleMaps?: {
      apiKey?: string
      mapId?: string
      center?: { lat: number; lng: number }
      zoom?: number
    }
    youtube?: {
      videoId?: string
      autoplay?: boolean
      controls?: boolean
      privacy?: boolean // Use youtube-nocookie.com
    }
    socialMedia?: {
      platform?: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
      embedId?: string
      showHeader?: boolean
      showFooter?: boolean
    }
  }
}

// Content-specific settings for different block types
export interface TextContentSettings {
  allowFormatting?: boolean
  maxLength?: number
  autoSave?: boolean
  spellCheck?: boolean
  readingTime?: boolean
  wordCount?: boolean
  rtlSupport?: boolean
}

export interface ImageContentSettings {
  lazyLoading?: BaseLazyLoadingConfig // Standardized lazy loading
  optimizeForRetina?: boolean
  compressionQuality?: number // 1-100
  webpFallback?: boolean
  lightbox?: {
    enabled?: boolean
    gallery?: string // Gallery group name
    caption?: boolean
    zoom?: boolean
  }
  watermark?: {
    enabled?: boolean
    text?: string
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
    opacity?: number
  }
}

export interface VideoContentSettings {
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  poster?: string // Poster image URL or media file ID
  playbackRate?: number
  volume?: number // 0-1
  fullscreen?: boolean
  pictureInPicture?: boolean
  captions?: {
    enabled?: boolean
    language?: string
    file?: string // VTT file URL
  }
}

export interface FormContentSettings {
  validation?: BaseValidationConfig // Standardized validation
  submission?: {
    method?: 'POST' | 'GET'
    action?: string
    redirect?: string
    emailNotification?: boolean
    autoResponse?: boolean
  }
  fields?: {
    placeholder?: string
    helpText?: string
    errorMessage?: string
    successMessage?: string
  }
}

/**
 * Settings for LINK block type
 */
export interface LinkContentSettings {
  /** Analytics tracking options */
  analytics?: BaseAnalyticsConfig // Standardized analytics
  /** Custom CSS classes array */
  customClasses?: string[]
  /** Accessibility options */
  accessibility?: {
    ariaLabel?: string
    tabIndex?: number
  }
}

/**
 * Settings for RICH_TEXT block type
 */
export interface RichTextContentSettings {
  /** Allowed HTML tags whitelist */
  allowedTags?: string[]
  /** Editor configuration */
  editor?: {
    toolbar?: string[]
    plugins?: string[]
  }
  /** Content length limits */
  contentLimits?: {
    maxLength?: number
    minLength?: number
  }
  /** Auto-save options */
  autoSave?: {
    enabled?: boolean
    interval?: number // seconds
  }
}

/**
 * Settings for CTA block type
 */
export interface CTAContentSettings {
  /** Analytics tracking configuration */
  analytics?: BaseAnalyticsConfig // Standardized analytics (replaces clickTracking)
  /** Conversion analytics */
  conversionAnalytics?: {
    goalId?: string
    value?: number
  }
  /** Animation effects */
  animationEffects?: {
    hover?: string
    click?: string
  }
  /** A/B testing variants */
  abTesting?: {
    enabled?: boolean
    variants?: Array<{
      id: string
      text: string
      weight: number
    }>
  }
}

/**
 * Settings for LOGO_LIST block type
 */
export interface LogoListContentSettings {
  /** Display mode configuration */
  displayMode?: 'grid' | 'carousel' | 'masonry'
  /** Responsive breakpoints */
  responsive?: BaseColumnsConfig // Standardized responsive columns
  /** Lazy loading configuration */
  lazyLoading?: BaseLazyLoadingConfig // Standardized lazy loading
  /** Carousel settings (when displayMode is 'carousel') */
  carousel?: {
    autoplay?: boolean
    interval?: number // milliseconds
    showDots?: boolean
    showArrows?: boolean
  }
}

/**
 * Settings for SELECTOR block type
 */
export interface SelectorContentSettings {
  /** Validation rules */
  validation?: BaseValidationConfig // Standardized validation
  /** Default selections */
  defaults?: {
    selectedValues?: string[]
  }
  /** Multi-select capability */
  multiSelect?: {
    enabled?: boolean
    maxSelections?: number
  }
  /** Form submission behavior */
  formBehavior?: {
    submitOnChange?: boolean
    resetAfterSubmit?: boolean
  }
}

/**
 * Settings for CARD_LIST block type
 */
export interface CardListContentSettings {
  /** Pagination configuration */
  pagination?: {
    enabled?: boolean
    itemsPerPage?: number
    showPageNumbers?: boolean
  }
  /** Filtering and sorting options */
  filtering?: {
    enabled?: boolean
    filterBy?: string[]
    sortOptions?: Array<{
      label: string
      value: string
    }>
  }
  /** Responsive grid columns */
  responsiveColumns?: BaseColumnsConfig // Standardized responsive columns
  /** Lazy loading configuration */
  lazyLoading?: BaseLazyLoadingConfig // Standardized lazy loading
  /** Card limit per page */
  cardLimit?: {
    max?: number
    default?: number
  }
}

/**
 * Settings for CONTAINER block type
 * NOTE: Layout, spacing, background, and border styling should be handled
 * by the main StyleData interface to avoid duplication
 */
export interface ContainerContentSettings {
  /** Container constraints (container-specific only) */
  constraints?: {
    /** Minimum height */
    minHeight?: string
    /** Maximum height */
    maxHeight?: string
    /** Minimum width */
    minWidth?: string
    /** Maximum width */
    maxWidth?: string
  }
  /** Responsive behavior */
  responsive?: BaseResponsiveConfig & {
    /** Hide on specific devices */
    hideOn?: ('mobile' | 'tablet' | 'desktop')[]
  }
  /** Visual builder settings (container-specific only) */
  editor?: {
    /** Whether container is collapsible in editor */
    collapsible?: boolean
    /** Default collapsed state */
    defaultCollapsed?: boolean
    /** Drop zone configuration */
    dropZone?: {
      /** Whether to show drop indicators */
      showIndicators?: boolean
      /** Allowed block types */
      allowedTypes?: string[]
      /** Maximum number of child blocks */
      maxChildren?: number
    }
  }
}

export interface SettingsData {
  general?: GeneralSettings
  animation?: AnimationSettings
  interaction?: InteractionSettings
  integrations?: IntegrationSettings

  // Content-specific settings (varies by block type)
  content?:
    | TextContentSettings
    | ImageContentSettings
    | VideoContentSettings
    | FormContentSettings
    | LinkContentSettings
    | RichTextContentSettings
    | CTAContentSettings
    | LogoListContentSettings
    | SelectorContentSettings
    | CardListContentSettings
    | ContainerContentSettings
    | Record<string, any>
}

// =============================================================================
// CONTENT DATA INTERFACES - Actual Content Storage
// =============================================================================

export interface TextContentData {
  content: string // HTML or plain text content
  format: 'html' | 'markdown' | 'plain'
  version?: number // Content version for history
}

export interface ImageContentData {
  mediaFileId: number // Reference to media_file table
  altText: string
  caption?: string
  title?: string
  link?: string // Optional link URL
  openInNewTab?: boolean
}

export interface VideoContentData {
  mediaFileId?: number // For uploaded videos
  url?: string // For external videos (YouTube, Vimeo)
  type: 'upload' | 'youtube' | 'vimeo' | 'external'
  title?: string
  description?: string
  thumbnail?: string // Thumbnail image URL or media file ID
}

export interface QuoteContentData {
  quote: string
  author?: string
  source?: string
  date?: string
  link?: string
}

export interface HeroBannerContentData {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  ctaOpenInNewTab?: boolean
  backgroundImage?: number // Media file ID
  backgroundVideo?: number // Media file ID
}

export interface LogoListContentData {
  /** Section title (optional) */
  title?: string
  /** Section description (optional) */
  description?: string
  /** Array of logo items (required, minimum 1 item) */
  logos: Array<{
    /** Media file ID reference */
    mediaFileId: number
    /** Unique identifier for the logo */
    id: string
    /** Logo name/company name */
    name: string
    /** Logo image URL */
    imageUrl: string
    /** Alt text for accessibility */
    altText: string
    /** Optional website URL */
    websiteUrl?: string
    /** Optional link URL (legacy support) */
    link?: string
    /** Whether to open link in new tab */
    openInNewTab?: boolean
  }>
}

export interface ProductGridContentData {
  products: Array<{
    title: string
    description?: string
    image?: number // Media file ID
    link?: string
    price?: string
    badge?: string // "New", "Featured", etc.
  }>
  title?: string
  description?: string
}

export interface NewsListContentData {
  count: number // Number of articles to display
  topicFilter?: number[] // Topic IDs to filter by
  excludeIds?: number[] // Page IDs to exclude
  sortBy: 'date' | 'title' | 'views' | 'custom'
  sortOrder: 'asc' | 'desc'
  showExcerpt?: boolean
  showDate?: boolean
  showAuthor?: boolean
  showTags?: boolean
}

export interface CustomHtmlContentData {
  html: string
  css?: string
  javascript?: string
  externalScripts?: string[] // External script URLs
  externalStyles?: string[] // External stylesheet URLs
}

/**
 * Content data interface for LINK block type
 * Represents clickable links with various target options and SEO attributes
 */
export interface LinkContentData {
  /** The destination URL (required, must be valid URL) */
  url: string
  /** Display text for the link (required) */
  linkText: string
  /** Link target behavior (default: '_self') */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /** SEO attributes like 'nofollow', 'noopener' (optional) */
  rel?: string
  /** Tooltip text displayed on hover (optional) */
  title?: string
}

/**
 * Content data interface for RICH_TEXT block type
 * Supports rich HTML content with highlighting and accessibility features
 */
export interface RichTextContentData {
  /** Sanitized HTML content (required) */
  htmlContent: string
  /** Plain text fallback for accessibility (optional) */
  plainTextFallback?: string
  /** Text highlighting configuration (optional) */
  highlightConfig?: {
    /** Color for highlighted text */
    highlightColor: string
    /** Style of highlighting */
    highlightStyle: 'background' | 'underline' | 'border'
    /** Array of phrases to highlight */
    highlightedPhrases: string[]
  }
}

/**
 * Content data interface for CTA (Call-to-Action) block type
 * Represents actionable elements like buttons and promotional banners
 */
export interface CTAContentData {
  /** CTA text content (required) */
  text: string
  /** Destination URL (required) */
  url: string
  /** Visual display style (required) */
  ctaType: 'button' | 'link' | 'banner'
  /** Icon configuration (optional) */
  icon?: {
    /** Icon name/identifier */
    name: string
    /** Icon position relative to text */
    position: 'left' | 'right' | 'top' | 'bottom'
  }
  /** Supporting descriptive text (optional) */
  description?: string
}

/**
 * Content data interface for SELECTOR block type
 * Represents form input elements like dropdowns, radio buttons, and checkboxes
 */
export interface SelectorContentData {
  /** Field label (optional) */
  label?: string
  /** Form field name (required) */
  name: string
  /** Type of selector (required) */
  selectorType: 'dropdown' | 'radio' | 'checkbox' | 'toggle'
  /** Array of selectable options (required, minimum 1 option) */
  options: Array<{
    /** Option value */
    value: string
    /** Display label */
    label: string
    /** Whether option is pre-selected */
    selected?: boolean
    /** Whether option is disabled */
    disabled?: boolean
  }>
  /** Placeholder text for dropdown (optional) */
  placeholder?: string
}

/**
 * Content data interface for CARD_LIST block type
 * Displays a grid/list of cards with images, descriptions, and CTAs
 */
export interface CardListContentData {
  /** Section title (optional) */
  title?: string
  /** Array of card items (required, minimum 1 card) */
  cards: Array<{
    /** Unique card identifier */
    id: string
    /** Card image configuration */
    image: {
      /** Image URL */
      url: string
      /** Alt text for accessibility */
      altText: string
    }
    /** Card title */
    title: string
    /** Card description (optional) */
    description?: string
    /** Call-to-action configuration */
    cta: {
      /** CTA button text */
      text: string
      /** Destination URL */
      url: string
      /** Button style */
      style: 'primary' | 'secondary' | 'outline'
    }
  }>
}

/**
 * Content data interface for CONTAINER block type
 * Functions as a wrapper element that can contain other content blocks
 */
export interface ContainerContentData {
  /** HTML semantic element type for the container */
  containerType?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
  /** Container title/label for identification in the visual builder */
  title?: string
  /** Container description for documentation purposes */
  description?: string
  /** Custom HTML attributes to be applied to the container element */
  customAttributes?: Record<string, string>
  /** CSS class names to be applied to the container */
  customClasses?: string[] // Standardized naming (was cssClasses)
  /** Container layout type for visual builder hints */
  layoutType?: 'flex' | 'grid' | 'block' | 'inline-block'
  /** Minimum height constraint for the container */
  minHeight?: string
  /** Maximum width constraint for the container */
  maxWidth?: string
  /** Whether the container should be collapsible in the editor */
  isCollapsible?: boolean
  /** Default collapsed state in the editor */
  isCollapsed?: boolean
  /** Accessibility role for the container */
  ariaRole?: string
  /** Accessibility label for the container */
  ariaLabel?: string
}

// Union type for all content data types
export type ContentData =
  | TextContentData
  | ImageContentData
  | VideoContentData
  | QuoteContentData
  | HeroBannerContentData
  | LogoListContentData
  | ProductGridContentData
  | NewsListContentData
  | CustomHtmlContentData
  | LinkContentData
  | RichTextContentData
  | CTAContentData
  | SelectorContentData
  | CardListContentData
  | ContainerContentData
  | Record<string, any> // For extensibility
