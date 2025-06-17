/* eslint-disable @typescript-eslint/no-explicit-any */
// TypeScript interfaces for the content block system
// Based on the data structure from data.json

export interface Page {
  id: number
  slug: string
  title: string
  metaOgTitle: string
  metaOgDescription: string
  metaOgImage: string | null
  metaKeywords: string
  pageType: 'CASE_STUDY' | 'PRODUCT' | 'NEWS' | 'BLOG'
  status: 'PUBLISHED' | 'DRAFT'
  parentPageId: number | null
  publishedAt: number
  creatorUserId: number
  updaterUserId: number
  createdAt: number
  updatedAt: number
  contentBlocks: ContentBlock[]
}

export interface ContentBlock {
  id: number
  selectorId: string
  blockType: BlockType
  positionOrder: number
  contentData: ContentData
  styleData: StyleData
  settingsData: SettingsData
  creatorUserId: number
  updaterUserId: number
  createdAt: number
  updatedAt: number
}

export type BlockType =
  | 'TEXT'
  | 'RICH_TEXT'
  | 'IMAGE'
  | 'LINK'
  | 'CTA'
  | 'QUOTE'
  | 'LOGO_LIST'
  | 'CARD_LIST'
  | 'SELECTOR'
  | 'VIDEO'
  | 'HERO_BANNER'
  | 'CUSTOM_HTML'

// Content Data Interfaces
export type ContentData =
  | TextContentData
  | RichTextContentData
  | ImageContentData
  | LinkContentData
  | CTAContentData
  | QuoteContentData
  | LogoListContentData
  | CardListContentData
  | SelectorContentData

export interface TextContentData {
  text: string
  language: string
}

export interface RichTextContentData {
  htmlContent: string
  highlightConfig?: {
    highlightColor: string
    highlightStyle: string
    highlightedPhrases: string[]
  }
  plainTextFallback: string
}

export interface ImageContentData {
  title: string
  altText: string
  caption: string
  imageUrl: string
  metadata: {
    format: string
    fileSize: string
    colorSpace: string
  }
  dimensions: {
    width: number
    height: number
    aspectRatio: string
  }
  mediaFileId: number
}

export interface LinkContentData {
  rel: string
  url: string
  title: string
  target: '_self' | '_blank'
  linkText: string
}

export interface CTAContentData {
  url: string
  icon?: {
    name: string
    position: 'left' | 'right'
  }
  text: string
  ctaType: 'button' | 'link'
  description: string
}

export interface QuoteContentData {
  quote: string
  author: string
  company: string
  position: string
  authorImage: string
}

export interface LogoListContentData {
  logos: Logo[]
  title: string
  language: string
  description: string
}

export interface Logo {
  id: string
  name: string
  altText: string
  imageUrl: string
  websiteUrl: string
  mediaFileId: number
  openInNewTab: boolean
}

export interface CardListContentData {
  cards: Card[]
  title: string
}

export interface Card {
  id: string
  cta: {
    url: string
    text: string
    style: string
  }
  image: {
    url: string
    altText: string
  }
  price: number | null
  title: string
  description: string
}

export interface SelectorContentData {
  name: string
  label: string
  options: SelectorOption[]
  placeholder: string
  selectorType: 'dropdown' | 'radio' | 'checkbox'
}

export interface SelectorOption {
  label: string
  value: string
  disabled: boolean
  selected: boolean
}

// Style Data Interface
export interface StyleData {
  layout?: LayoutStyle
  typography?: TypographyStyle
  background?: BackgroundStyle
  border?: BorderStyle
  effects?: EffectsStyle
  grid?: GridStyle
  responsive?: ResponsiveStyle
}

export interface LayoutStyle {
  width?: string
  height?: string
  margin?: string
  padding?: string
  display?: string
  position?: string
  top?: string
  left?: string
  zIndex?: string
  maxWidth?: string
  textAlign?: string
}

export interface TypographyStyle {
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  lineHeight?: string
  textAlign?: string
  textDecoration?: string
}

export interface BackgroundStyle {
  color?: string
  image?: string
  size?: string
  position?: string
  repeat?: string
  gradient?: string
}

export interface BorderStyle {
  width?: string
  style?: string
  color?: string
  radius?: string
}

export interface EffectsStyle {
  boxShadow?: string
  opacity?: string
  transform?: string
  filter?: string
  transition?: string
  cursor?: string
  objectFit?: string
}

export interface GridStyle {
  gridTemplateColumns?: string
  gridGap?: string
  gap?: string
  alignItems?: string
  justifyItems?: string
  justifyContent?: string
}

export interface ResponsiveStyle {
  mobile?: Partial<StyleData>
  tablet?: Partial<StyleData>
  desktop?: Partial<StyleData>
}

// Settings Data Interface
export interface SettingsData {
  general?: GeneralSettings
  content?: ContentSettings
  animation?: AnimationSettings
  interaction?: InteractionSettings
  integrations?: IntegrationSettings
}

export interface GeneralSettings {
  customId?: string
  isVisible?: boolean
  customClasses?: string[]
}

export interface ContentSettings {
  lazyLoading?: boolean
  optimization?: string
  analytics?: AnalyticsSettings
  accessibility?: AccessibilitySettings
  [key: string]: any // Allow for flexible content settings
}

export interface AnalyticsSettings {
  trackClicks?: boolean
  trackViews?: boolean
  customEvents?: string[]
}

export interface AccessibilitySettings {
  tabIndex?: number
  ariaLabel?: string
}

export interface AnimationSettings {
  type?: string
  duration?: number
  trigger?: string
  easing?: string
}

export interface InteractionSettings {
  hoverable?: boolean
  clickable?: boolean
}

export interface IntegrationSettings {
  analytics?: AnalyticsSettings
  seo?: SEOSettings
}

export interface SEOSettings {
  structuredData?: Record<string, any>
}
