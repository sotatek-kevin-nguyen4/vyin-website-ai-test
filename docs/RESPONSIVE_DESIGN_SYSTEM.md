# Responsive Design System

## Overview

The content block system implements a comprehensive responsive design system using the `responsive` property in `styleData`. This system supports four breakpoints with cascading inheritance.

## Breakpoint Configuration

```typescript
// Default breakpoints (configurable)
const BREAKPOINTS = {
  mobile: '0px',        // 0px - 767px
  tablet: '768px',      // 768px - 1023px  
  desktop: '1024px',    // 1024px - 1439px
  largeDesktop: '1440px' // 1440px+
};
```

## Cascading Inheritance System

### Base → Mobile → Tablet → Desktop → Large Desktop

```json
{
  "styleData": {
    // BASE STYLES (applied to all breakpoints)
    "layout": {
      "padding": "40px",
      "display": "flex",
      "flexDirection": "column"
    },
    "typography": {
      "fontSize": "18px",
      "lineHeight": "1.6",
      "color": "#333333"
    },
    
    // RESPONSIVE OVERRIDES
    "responsive": {
      "mobile": {
        // Overrides base styles for mobile (0-767px)
        "layout": {
          "padding": "20px",
          "flexDirection": "column"
        },
        "typography": {
          "fontSize": "16px"
        }
      },
      "tablet": {
        // Inherits mobile + overrides for tablet (768-1023px)
        "layout": {
          "padding": "30px",
          "flexDirection": "row"
        }
        // fontSize stays 16px from mobile
      },
      "desktop": {
        // Inherits tablet + overrides for desktop (1024-1439px)
        "typography": {
          "fontSize": "20px"
        }
        // padding stays 30px from tablet
        // flexDirection stays "row" from tablet
      },
      "largeDesktop": {
        // Inherits desktop + overrides for large desktop (1440px+)
        "layout": {
          "padding": "60px"
        }
        // fontSize stays 20px from desktop
        // flexDirection stays "row" from tablet
      }
    }
  }
}
```

## Media Query Generation

### Frontend CSS Generation

```typescript
// utils/responsive-styles.ts
interface ResponsiveStyleGenerator {
  generateCSS(blockId: string, styleData: StyleData): string;
}

export class ResponsiveStyleGenerator {
  private breakpoints = {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1440
  };

  generateCSS(blockId: string, styleData: StyleData): string {
    let css = '';
    
    // Base styles (mobile-first)
    css += this.generateBaseStyles(blockId, styleData);
    
    // Responsive overrides
    if (styleData.responsive) {
      // Tablet styles
      if (styleData.responsive.tablet) {
        css += `@media (min-width: ${this.breakpoints.tablet}px) {
          ${this.generateBlockStyles(blockId, styleData.responsive.tablet)}
        }`;
      }
      
      // Desktop styles  
      if (styleData.responsive.desktop) {
        css += `@media (min-width: ${this.breakpoints.desktop}px) {
          ${this.generateBlockStyles(blockId, styleData.responsive.desktop)}
        }`;
      }
      
      // Large desktop styles
      if (styleData.responsive.largeDesktop) {
        css += `@media (min-width: ${this.breakpoints.largeDesktop}px) {
          ${this.generateBlockStyles(blockId, styleData.responsive.largeDesktop)}
        }`;
      }
    }
    
    return css;
  }

  private generateBaseStyles(blockId: string, styleData: StyleData): string {
    const selector = `[data-block-id="${blockId}"]`;
    let styles = '';
    
    // Merge base styles with mobile responsive styles
    const mobileStyles = {
      ...styleData,
      ...styleData.responsive?.mobile
    };
    
    if (mobileStyles.layout) {
      styles += this.convertLayoutToCSS(mobileStyles.layout);
    }
    
    if (mobileStyles.typography) {
      styles += this.convertTypographyToCSS(mobileStyles.typography);
    }
    
    if (mobileStyles.background) {
      styles += this.convertBackgroundToCSS(mobileStyles.background);
    }
    
    return `${selector} { ${styles} }`;
  }

  private generateBlockStyles(blockId: string, responsiveStyles: Partial<StyleData>): string {
    const selector = `[data-block-id="${blockId}"]`;
    let styles = '';
    
    if (responsiveStyles.layout) {
      styles += this.convertLayoutToCSS(responsiveStyles.layout);
    }
    
    if (responsiveStyles.typography) {
      styles += this.convertTypographyToCSS(responsiveStyles.typography);
    }
    
    if (responsiveStyles.background) {
      styles += this.convertBackgroundToCSS(responsiveStyles.background);
    }
    
    return `${selector} { ${styles} }`;
  }
}
```

## Practical Examples

### Example 1: Hero Banner Responsive Layout

```json
{
  "blockType": "HERO_BANNER",
  "contentData": {
    "title": "Transform Your Business with AI",
    "subtitle": "Discover the power of artificial intelligence",
    "ctaText": "Get Started",
    "language": "EN"
  },
  "styleData": {
    // BASE STYLES (Mobile-first)
    "layout": {
      "height": "400px",
      "padding": "40px 20px",
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center",
      "alignItems": "center"
    },
    "typography": {
      "textAlign": "center",
      "color": "#ffffff"
    },
    "background": {
      "image": "hero-bg-mobile.jpg",
      "size": "cover",
      "position": "center"
    },
    
    // RESPONSIVE OVERRIDES
    "responsive": {
      "tablet": {
        "layout": {
          "height": "500px",
          "padding": "60px 40px"
        },
        "background": {
          "image": "hero-bg-tablet.jpg"
        }
      },
      "desktop": {
        "layout": {
          "height": "600px",
          "padding": "80px 60px",
          "flexDirection": "row",
          "textAlign": "left"
        },
        "background": {
          "image": "hero-bg-desktop.jpg"
        }
      },
      "largeDesktop": {
        "layout": {
          "height": "700px",
          "padding": "100px 80px"
        },
        "background": {
          "image": "hero-bg-large.jpg"
        }
      }
    }
  }
}
```

### Generated CSS Output:

```css
/* Base + Mobile Styles (0px+) */
[data-block-id="hero-1"] {
  height: 400px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background-image: url('hero-bg-mobile.jpg');
  background-size: cover;
  background-position: center;
}

/* Tablet Styles (768px+) */
@media (min-width: 768px) {
  [data-block-id="hero-1"] {
    height: 500px;
    padding: 60px 40px;
    background-image: url('hero-bg-tablet.jpg');
  }
}

/* Desktop Styles (1024px+) */
@media (min-width: 1024px) {
  [data-block-id="hero-1"] {
    height: 600px;
    padding: 80px 60px;
    flex-direction: row;
    text-align: left;
    background-image: url('hero-bg-desktop.jpg');
  }
}

/* Large Desktop Styles (1440px+) */
@media (min-width: 1440px) {
  [data-block-id="hero-1"] {
    height: 700px;
    padding: 100px 80px;
    background-image: url('hero-bg-large.jpg');
  }
}
```

### Example 2: Product Grid Responsive Layout

```json
{
  "blockType": "PRODUCT_GRID",
  "styleData": {
    // BASE STYLES
    "layout": {
      "padding": "40px 20px"
    },
    "grid": {
      "display": "grid",
      "gridTemplateColumns": "1fr",
      "gap": "20px"
    },
    
    // RESPONSIVE GRID SYSTEM
    "responsive": {
      "tablet": {
        "layout": {
          "padding": "50px 30px"
        },
        "grid": {
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "30px"
        }
      },
      "desktop": {
        "layout": {
          "padding": "60px 40px"
        },
        "grid": {
          "gridTemplateColumns": "repeat(3, 1fr)",
          "gap": "40px"
        }
      },
      "largeDesktop": {
        "grid": {
          "gridTemplateColumns": "repeat(4, 1fr)",
          "gap": "50px"
        }
      }
    }
  }
}
```

### Example 3: Typography Responsive Scaling

```json
{
  "blockType": "TEXT",
  "styleData": {
    // BASE TYPOGRAPHY
    "typography": {
      "fontSize": "16px",
      "lineHeight": "1.5",
      "fontWeight": "400"
    },
    
    // RESPONSIVE TYPOGRAPHY
    "responsive": {
      "tablet": {
        "typography": {
          "fontSize": "18px",
          "lineHeight": "1.6"
        }
      },
      "desktop": {
        "typography": {
          "fontSize": "20px",
          "lineHeight": "1.7",
          "fontWeight": "500"
        }
      },
      "largeDesktop": {
        "typography": {
          "fontSize": "22px",
          "lineHeight": "1.8"
        }
      }
    }
  }
}
```

## Frontend Implementation

### React Component with Responsive Styles

```typescript
// components/ResponsiveContentBlock.tsx
import React, { useEffect, useState } from 'react';
import { ContentBlock } from '../types/content-block.types';
import { ResponsiveStyleGenerator } from '../utils/responsive-styles';

interface ResponsiveContentBlockProps {
  block: ContentBlock;
}

export const ResponsiveContentBlock: React.FC<ResponsiveContentBlockProps> = ({ block }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');
  const styleGenerator = new ResponsiveStyleGenerator();

  useEffect(() => {
    // Generate and inject CSS
    const css = styleGenerator.generateCSS(block.id.toString(), block.styleData);
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [block.styleData]);

  useEffect(() => {
    // Listen for breakpoint changes
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1440) setCurrentBreakpoint('largeDesktop');
      else if (width >= 1024) setCurrentBreakpoint('desktop');
      else if (width >= 768) setCurrentBreakpoint('tablet');
      else setCurrentBreakpoint('mobile');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      data-block-id={block.id}
      data-breakpoint={currentBreakpoint}
      className={`content-block content-block--${block.blockType.toLowerCase()}`}
    >
      {/* Block content rendered here */}
      {renderBlockContent(block)}
    </div>
  );
};
```

### Visual Page Builder Responsive Controls

```typescript
// components/ResponsiveStylePanel.tsx
export const ResponsiveStylePanel: React.FC<{ block: ContentBlock }> = ({ block }) => {
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>('mobile');
  const [styleData, setStyleData] = useState(block.styleData);

  const breakpoints = [
    { key: 'mobile', label: 'Mobile', icon: '📱', width: '< 768px' },
    { key: 'tablet', label: 'Tablet', icon: '📱', width: '768px - 1023px' },
    { key: 'desktop', label: 'Desktop', icon: '💻', width: '1024px - 1439px' },
    { key: 'largeDesktop', label: 'Large', icon: '🖥️', width: '1440px+' }
  ];

  const updateResponsiveStyle = (breakpoint: string, property: string, value: any) => {
    const newStyleData = { ...styleData };
    
    if (!newStyleData.responsive) {
      newStyleData.responsive = {};
    }
    
    if (!newStyleData.responsive[breakpoint]) {
      newStyleData.responsive[breakpoint] = {};
    }
    
    newStyleData.responsive[breakpoint][property] = value;
    setStyleData(newStyleData);
    
    // Update block
    updateBlock(block.id, { styleData: newStyleData });
  };

  return (
    <div className="responsive-style-panel">
      {/* Breakpoint Selector */}
      <div className="breakpoint-selector">
        {breakpoints.map(bp => (
          <button
            key={bp.key}
            className={`breakpoint-btn ${activeBreakpoint === bp.key ? 'active' : ''}`}
            onClick={() => setActiveBreakpoint(bp.key)}
          >
            <span className="icon">{bp.icon}</span>
            <span className="label">{bp.label}</span>
            <span className="width">{bp.width}</span>
          </button>
        ))}
      </div>

      {/* Style Controls for Active Breakpoint */}
      <div className="style-controls">
        <h3>Styles for {breakpoints.find(bp => bp.key === activeBreakpoint)?.label}</h3>
        
        {/* Layout Controls */}
        <div className="control-group">
          <label>Padding</label>
          <input
            type="text"
            value={getResponsiveValue('layout.padding', activeBreakpoint)}
            onChange={(e) => updateResponsiveStyle(activeBreakpoint, 'layout', {
              ...getResponsiveValue('layout', activeBreakpoint),
              padding: e.target.value
            })}
          />
        </div>

        {/* Typography Controls */}
        <div className="control-group">
          <label>Font Size</label>
          <input
            type="text"
            value={getResponsiveValue('typography.fontSize', activeBreakpoint)}
            onChange={(e) => updateResponsiveStyle(activeBreakpoint, 'typography', {
              ...getResponsiveValue('typography', activeBreakpoint),
              fontSize: e.target.value
            })}
          />
        </div>

        {/* Grid Controls */}
        <div className="control-group">
          <label>Grid Columns</label>
          <select
            value={getResponsiveValue('grid.gridTemplateColumns', activeBreakpoint)}
            onChange={(e) => updateResponsiveStyle(activeBreakpoint, 'grid', {
              ...getResponsiveValue('grid', activeBreakpoint),
              gridTemplateColumns: e.target.value
            })}
          >
            <option value="1fr">1 Column</option>
            <option value="repeat(2, 1fr)">2 Columns</option>
            <option value="repeat(3, 1fr)">3 Columns</option>
            <option value="repeat(4, 1fr)">4 Columns</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="responsive-preview">
        <iframe
          src={`/preview/${block.pageId}?breakpoint=${activeBreakpoint}`}
          className={`preview-frame preview-frame--${activeBreakpoint}`}
        />
      </div>
    </div>
  );
};
```

This responsive system provides:

1. **Mobile-first approach** with progressive enhancement
2. **Cascading inheritance** that reduces redundancy
3. **Visual editing tools** for each breakpoint
4. **Real-time preview** across different screen sizes
5. **Efficient CSS generation** with media queries
6. **Type-safe configuration** with TypeScript interfaces

The system ensures that content blocks look great and function properly across all device types while giving content editors full control over the responsive behavior.
