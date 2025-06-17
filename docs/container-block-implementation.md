# CONTAINER Block Type Implementation

## Overview
This document outlines the implementation of the new CONTAINER content block type for the Vyin AI CMS visual page builder. The CONTAINER block functions as a wrapper element similar to an HTML div tag, enabling users to create layout sections and group related content blocks together.

## Implementation Summary

### Core Changes Made

**1. Entity Updates (`biz-content-block.entity.ts`):**
- ✅ Added `CONTAINER = 'CONTAINER'` to `BizContentBlockTypeEnum`

**2. Interface Updates (`content-block-data.interface.ts`):**
- ✅ Created `ContainerContentData` interface
- ✅ Created `ContainerContentSettings` interface  
- ✅ Updated `ContentData` union type
- ✅ Updated `SettingsData` content union type

**3. DTO Updates (`content-block-response.dto.ts`):**
- ✅ Added CONTAINER to block type documentation

**4. Sample Data (`case-study-new-content-blocks.sql`):**
- ✅ Added sample CONTAINER block implementation
- ✅ Updated verification queries

## ContainerContentData Interface

### Core Properties
```typescript
export interface ContainerContentData {
  /** HTML semantic element type for the container */
  containerType?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
  
  /** Container title/label for identification in the visual builder */
  title?: string;
  
  /** Container description for documentation purposes */
  description?: string;
  
  /** Custom HTML attributes to be applied to the container element */
  customAttributes?: Record<string, string>;
  
  /** CSS class names to be applied to the container */
  cssClasses?: string[];
  
  /** Container layout type for visual builder hints */
  layoutType?: 'flex' | 'grid' | 'block' | 'inline-block';
  
  /** Minimum height constraint for the container */
  minHeight?: string;
  
  /** Maximum width constraint for the container */
  maxWidth?: string;
  
  /** Whether the container should be collapsible in the editor */
  isCollapsible?: boolean;
  
  /** Default collapsed state in the editor */
  isCollapsed?: boolean;
  
  /** Accessibility role for the container */
  ariaRole?: string;
  
  /** Accessibility label for the container */
  ariaLabel?: string;
}
```

### Key Features
- ✅ **Semantic HTML**: Support for semantic elements (section, article, aside, etc.)
- ✅ **Custom Attributes**: Flexible HTML attribute system
- ✅ **CSS Classes**: Multiple class assignment capability
- ✅ **Layout Hints**: Visual builder layout type indicators
- ✅ **Constraints**: Size and dimension controls
- ✅ **Editor Features**: Collapsible containers for better UX
- ✅ **Accessibility**: ARIA role and label support

## ContainerContentSettings Interface

### Layout Configuration
```typescript
layout?: {
  display?: 'block' | 'flex' | 'grid' | 'inline-block';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: string;
}
```

### Spacing Configuration
```typescript
spacing?: {
  padding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
```

### Background Configuration
```typescript
background?: {
  color?: string;
  image?: string;
  size?: 'cover' | 'contain' | 'auto';
  position?: string;
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
}
```

### Border Configuration
```typescript
border?: {
  width?: string;
  style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  color?: string;
  radius?: string;
}
```

### Responsive Behavior
```typescript
responsive?: {
  breakpoints?: {
    mobile?: Record<string, any>;
    tablet?: Record<string, any>;
    desktop?: Record<string, any>;
  };
  hideOn?: ('mobile' | 'tablet' | 'desktop')[];
}
```

### Visual Builder Settings
```typescript
editor?: {
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  dropZone?: {
    showIndicators?: boolean;
    allowedTypes?: string[];
    maxChildren?: number;
  };
}
```

## Use Cases and Examples

### 1. Layout Sections
```typescript
// Header Container
{
  containerType: 'header',
  title: 'Page Header',
  layoutType: 'flex',
  cssClasses: ['page-header', 'sticky-header']
}

// Main Content Container
{
  containerType: 'main',
  title: 'Main Content',
  layoutType: 'grid',
  ariaRole: 'main'
}

// Footer Container
{
  containerType: 'footer',
  title: 'Page Footer',
  layoutType: 'block',
  cssClasses: ['page-footer']
}
```

### 2. Content Grouping
```typescript
// Feature Section
{
  containerType: 'section',
  title: 'Features Section',
  description: 'Container for product features',
  layoutType: 'grid',
  customAttributes: {
    'data-section': 'features',
    'id': 'features-section'
  }
}

// Testimonials Container
{
  containerType: 'aside',
  title: 'Customer Testimonials',
  layoutType: 'flex',
  isCollapsible: true
}
```

### 3. Responsive Grid Layouts
```typescript
// Responsive Card Grid
{
  containerType: 'div',
  title: 'Card Grid Container',
  layoutType: 'grid',
  minHeight: '400px',
  maxWidth: '1200px',
  cssClasses: ['card-grid', 'responsive-container']
}
```

### 4. Component Containers
```typescript
// Reusable Hero Section
{
  containerType: 'section',
  title: 'Hero Section',
  description: 'Reusable hero component container',
  layoutType: 'flex',
  customAttributes: {
    'data-component': 'hero',
    'role': 'banner'
  },
  ariaLabel: 'Hero banner section'
}
```

## Sample Implementation

### Database Record Example
```sql
INSERT INTO biz_content_block (
    selector_id,
    page_id,
    parent_block_id,
    block_type,
    position_order,
    content_data,
    style_data,
    settings_data,
    created_by,
    updated_by,
    created_at,
    updated_at
) VALUES (
    'case_study_main_container',
    1,
    NULL,
    'CONTAINER',
    20,
    '{
        "containerType": "section",
        "title": "Main Content Section",
        "description": "Primary content container for the case study page",
        "customAttributes": {
            "data-section": "main-content",
            "role": "main"
        },
        "cssClasses": ["main-content", "case-study-section"],
        "layoutType": "flex",
        "minHeight": "400px",
        "maxWidth": "1200px",
        "isCollapsible": true,
        "isCollapsed": false,
        "ariaRole": "main",
        "ariaLabel": "Main case study content section"
    }',
    '{
        "layout": {
            "display": "flex",
            "flexDirection": "column",
            "justifyContent": "flex-start",
            "alignItems": "center"
        },
        "spacing": {
            "padding": "60px 20px"
        },
        "background": {
            "color": "#ffffff"
        },
        "border": {
            "radius": "8px"
        }
    }',
    '{
        "content": {
            "editor": {
                "collapsible": true,
                "dropZone": {
                    "showIndicators": true,
                    "allowedTypes": ["TEXT", "IMAGE", "CTA", "RICH_TEXT", "LINK"],
                    "maxChildren": 10
                }
            }
        }
    }'
);
```

## Parent-Child Relationship

### Nesting Support
The CONTAINER block leverages the existing `parent_block_id` relationship system:

```typescript
// Parent Container
{
  id: 100,
  blockType: 'CONTAINER',
  parentBlockId: null,
  positionOrder: 1
}

// Child Blocks
{
  id: 101,
  blockType: 'TEXT',
  parentBlockId: 100,  // References container
  positionOrder: 1
}

{
  id: 102,
  blockType: 'IMAGE',
  parentBlockId: 100,  // References container
  positionOrder: 2
}
```

### Visual Builder Integration
- ✅ **Drop Zones**: Containers show drop indicators
- ✅ **Allowed Types**: Configurable child block restrictions
- ✅ **Max Children**: Limit number of nested blocks
- ✅ **Collapsible**: Improve editor UX with collapsible containers

## Technical Specifications

### Database Compatibility
- ✅ **JSONB Support**: All data structures are JSONB-compatible
- ✅ **Backward Compatibility**: No breaking changes to existing blocks
- ✅ **Relationship System**: Uses existing parent-child relationships

### TypeScript Compliance
- ✅ **Strict Typing**: No `any` types used
- ✅ **Interface Validation**: Proper optional/required field marking
- ✅ **Union Type Updates**: All union types include new interfaces

### API Integration
- ✅ **Controller Support**: Included in biz-page controller responses
- ✅ **Service Compatibility**: Works with existing service methods
- ✅ **DTO Documentation**: Swagger documentation updated

## Frontend Implementation Guidelines

### React Component Structure
```typescript
interface ContainerBlockProps {
  block: {
    contentData: ContainerContentData;
    styleData: Record<string, any>;
    settingsData: { content: ContainerContentSettings };
  };
  children: React.ReactNode;
  isEditing?: boolean;
}

const ContainerBlock: React.FC<ContainerBlockProps> = ({ 
  block, 
  children, 
  isEditing 
}) => {
  const { containerType = 'div', customAttributes, cssClasses } = block.contentData;
  
  const Element = containerType as keyof JSX.IntrinsicElements;
  
  return (
    <Element
      className={cssClasses?.join(' ')}
      {...customAttributes}
      style={generateStyleFromData(block.styleData)}
    >
      {children}
    </Element>
  );
};
```

### Drag and Drop Integration
```typescript
const DropZone: React.FC<{ container: ContainerBlock }> = ({ container }) => {
  const { allowedTypes, maxChildren } = container.settingsData.content.editor.dropZone;
  
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="drop-zone"
    >
      {/* Drop indicators and child blocks */}
    </div>
  );
};
```

## Usage Example: Hero Section with Nested Blocks

```sql
-- 1. Create CONTAINER block (Hero Section)
INSERT INTO biz_content_block (
    selector_id, page_id, parent_block_id, block_type, position_order,
    content_data, style_data, settings_data
) VALUES (
    'hero_container', 1, NULL, 'CONTAINER', 1,
    '{"containerType": "section", "title": "Hero Section", "layoutType": "flex"}',
    '{"layout": {"display": "flex", "flexDirection": "column", "alignItems": "center"}}',
    '{"content": {"editor": {"dropZone": {"allowedTypes": ["TEXT", "CTA", "IMAGE"]}}}}'
);

-- 2. Create child TEXT block (Hero Title)
INSERT INTO biz_content_block (
    selector_id, page_id, parent_block_id, block_type, position_order,
    content_data
) VALUES (
    'hero_title', 1, (SELECT id FROM biz_content_block WHERE selector_id = 'hero_container'), 'TEXT', 1,
    '{"text": "Welcome to Our Platform", "language": "EN"}'
);

-- 3. Create child CTA block (Hero Button)
INSERT INTO biz_content_block (
    selector_id, page_id, parent_block_id, block_type, position_order,
    content_data
) VALUES (
    'hero_cta', 1, (SELECT id FROM biz_content_block WHERE selector_id = 'hero_container'), 'CTA', 2,
    '{"text": "Get Started", "url": "/signup", "ctaType": "button"}'
);
```

This creates a hero section container with a title and CTA button as child blocks, demonstrating the parent-child relationship system.

## Next Steps

1. **Frontend Components**: Implement React components for CONTAINER blocks
2. **Visual Builder**: Add drag-and-drop functionality for containers
3. **Template System**: Create pre-built container templates
4. **Nested Validation**: Implement validation for nested block structures
5. **Performance**: Optimize rendering for deeply nested containers

This CONTAINER block implementation provides a powerful foundation for creating flexible, semantic, and accessible layout structures in the Vyin AI CMS visual page builder.
