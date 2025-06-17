# Content Block Data Examples

This document provides concrete examples of how the `styleData`, `settingsData`, and `contentData` fields work together in the visual page builder system.

## Example 1: Hero Banner Block

### Complete Content Block Structure

```json
{
  "id": 1,
  "pageId": 123,
  "blockType": "HERO_BANNER",
  "positionOrder": 1,
  "isVisible": true,
  
  "contentData": {
    "title": "Transform Your Business with AI",
    "subtitle": "Discover the power of artificial intelligence",
    "description": "Join thousands of companies already leveraging AI to streamline operations, enhance customer experiences, and drive innovation.",
    "ctaText": "Get Started Today",
    "ctaLink": "/contact",
    "ctaOpenInNewTab": false,
    "backgroundImage": 125,
    "language": "EN"
  },
  
  "styleData": {
    "layout": {
      "height": "600px",
      "display": "flex",
      "padding": "60px 40px",
      "position": "relative"
    },
    "background": {
      "image": "hero-background.jpg",
      "size": "cover",
      "position": "center",
      "color": "rgba(0,0,0,0.4)"
    },
    "typography": {
      "textAlign": "center",
      "color": "#ffffff"
    },
    "responsive": {
      "mobile": {
        "layout": {
          "height": "400px",
          "padding": "40px 20px"
        },
        "typography": {
          "fontSize": "24px"
        }
      }
    }
  },
  
  "settingsData": {
    "general": {
      "customClasses": ["hero-section", "primary-banner"]
    },
    "animation": {
      "type": "slideUp",
      "duration": 800,
      "trigger": "onLoad",
      "easing": "ease-out"
    },
    "interaction": {
      "hoverable": true
    },
    "content": {
      "parallaxEffect": true,
      "overlayOpacity": 0.4
    },
    "integrations": {
      "analytics": {
        "trackClicks": true,
        "trackViews": true,
        "customEvents": ["hero_cta_click", "hero_view"]
      }
    }
  }
}
```

## Example 2: Image Block with Lightbox

```json
{
  "id": 2,
  "pageId": 123,
  "blockType": "IMAGE",
  "positionOrder": 2,
  "isVisible": true,
  
  "contentData": {
    "mediaFileId": 456,
    "altText": "Vyin AI team collaborating on innovative solutions",
    "caption": "Our diverse team of AI experts working together",
    "title": "Team Collaboration",
    "link": null,
    "openInNewTab": false
  },
  
  "styleData": {
    "layout": {
      "width": "100%",
      "maxWidth": "800px",
      "margin": "40px auto"
    },
    "border": {
      "radius": "12px"
    },
    "effects": {
      "boxShadow": "0 8px 24px rgba(0,0,0,0.15)",
      "transition": "transform 0.3s ease"
    }
  },
  
  "settingsData": {
    "content": {
      "lazyLoad": true,
      "optimizeForRetina": true,
      "compressionQuality": 90,
      "lightbox": {
        "enabled": true,
        "gallery": "team-photos",
        "caption": true,
        "zoom": true
      }
    },
    "interaction": {
      "clickable": true,
      "hoverable": true
    },
    "animation": {
      "type": "fadeIn",
      "duration": 600,
      "trigger": "onScroll"
    }
  }
}
```

## Example 3: Text Block with Rich Formatting

```json
{
  "id": 3,
  "pageId": 123,
  "blockType": "TEXT",
  "positionOrder": 3,
  "isVisible": true,
  
  "contentData": {
    "content": "<h2>About Vyin AI</h2><p>We are a leading <strong>artificial intelligence</strong> company focused on creating innovative solutions that <em>transform businesses</em> across industries.</p><ul><li>Machine Learning Solutions</li><li>Natural Language Processing</li><li>Computer Vision</li><li>Predictive Analytics</li></ul>",
    "format": "html",
    "language": "EN",
    "version": 1
  },
  
  "styleData": {
    "layout": {
      "maxWidth": "700px",
      "margin": "0 auto",
      "padding": "40px 20px"
    },
    "typography": {
      "fontSize": "16px",
      "lineHeight": "1.7",
      "color": "#333333",
      "fontFamily": "Inter, sans-serif"
    }
  },
  
  "settingsData": {
    "content": {
      "allowFormatting": true,
      "maxLength": 2000,
      "autoSave": true,
      "spellCheck": true,
      "readingTime": true
    },
    "general": {
      "seoOptimized": true
    },
    "integrations": {
      "seo": {
        "structuredData": {
          "@type": "Article",
          "headline": "About Vyin AI",
          "description": "Learn about our AI solutions and services"
        }
      }
    }
  }
}
```

## Example 4: Logo List Block

```json
{
  "id": 4,
  "pageId": 123,
  "blockType": "LOGO_LIST",
  "positionOrder": 4,
  "isVisible": true,
  
  "contentData": {
    "title": "Trusted by Industry Leaders",
    "description": "Companies worldwide rely on our AI solutions",
    "logos": [
      {
        "mediaFileId": 201,
        "name": "TechCorp",
        "link": "https://techcorp.com",
        "altText": "TechCorp Logo",
        "openInNewTab": true
      },
      {
        "mediaFileId": 202,
        "name": "InnovateLab",
        "link": "https://innovatelab.com",
        "altText": "InnovateLab Logo",
        "openInNewTab": true
      },
      {
        "mediaFileId": 203,
        "name": "FutureSoft",
        "link": "https://futuresoft.com",
        "altText": "FutureSoft Logo",
        "openInNewTab": true
      }
    ],
    "language": "EN"
  },
  
  "styleData": {
    "layout": {
      "padding": "60px 40px"
    },
    "grid": {
      "gridTemplateColumns": "repeat(3, 1fr)",
      "gap": "40px",
      "alignItems": "center"
    },
    "responsive": {
      "mobile": {
        "grid": {
          "gridTemplateColumns": "repeat(2, 1fr)",
          "gap": "20px"
        }
      }
    }
  },
  
  "settingsData": {
    "content": {
      "showTooltips": true,
      "openInNewTab": true,
      "grayscaleDefault": true,
      "colorOnHover": true
    },
    "animation": {
      "type": "staggered",
      "duration": 400,
      "trigger": "onScroll"
    },
    "interaction": {
      "hoverable": true
    }
  }
}
```

## Example 5: News List Block (Dynamic Content)

```json
{
  "id": 5,
  "pageId": 123,
  "blockType": "NEWS_LIST",
  "positionOrder": 5,
  "isVisible": true,
  
  "contentData": {
    "count": 6,
    "topicFilter": [1, 3, 5],
    "excludeIds": [45, 67],
    "sortBy": "date",
    "sortOrder": "desc",
    "showExcerpt": true,
    "showDate": true,
    "showAuthor": true,
    "showTags": true,
    "language": "EN"
  },
  
  "styleData": {
    "layout": {
      "padding": "50px 0"
    },
    "grid": {
      "gridTemplateColumns": "repeat(2, 1fr)",
      "gap": "30px"
    },
    "responsive": {
      "mobile": {
        "grid": {
          "gridTemplateColumns": "1fr"
        }
      }
    }
  },
  
  "settingsData": {
    "content": {
      "excerptLength": 150,
      "dateFormat": "MMM DD, YYYY",
      "showReadMore": true,
      "lazyLoadImages": true
    },
    "animation": {
      "type": "fadeIn",
      "duration": 500,
      "trigger": "onScroll"
    },
    "integrations": {
      "analytics": {
        "trackClicks": true,
        "customEvents": ["news_article_click"]
      }
    }
  }
}
```

## Example 6: Custom HTML Block

```json
{
  "id": 6,
  "pageId": 123,
  "blockType": "CUSTOM_HTML",
  "positionOrder": 6,
  "isVisible": true,
  
  "contentData": {
    "html": "<div id=\"custom-widget\"><h3>Interactive AI Demo</h3><div class=\"demo-container\"><button onclick=\"startDemo()\">Try Our AI</button></div></div>",
    "css": "#custom-widget { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 15px; text-align: center; } .demo-container button { background: white; color: #667eea; border: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; }",
    "javascript": "function startDemo() { console.log('AI Demo started'); alert('Welcome to our AI demo!'); }",
    "externalScripts": ["https://cdn.example.com/ai-widget.js"],
    "externalStyles": ["https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"]
  },
  
  "styleData": {
    "layout": {
      "margin": "40px 0"
    }
  },
  
  "settingsData": {
    "general": {
      "customId": "ai-demo-widget"
    },
    "content": {
      "sanitizeHTML": false,
      "allowScripts": true,
      "securityLevel": "trusted"
    },
    "integrations": {
      "analytics": {
        "trackClicks": true,
        "customEvents": ["demo_started", "demo_completed"]
      }
    }
  }
}
```

## Frontend Usage Examples

### React Component Rendering

```typescript
// ContentBlockRenderer.tsx
import React from 'react';
import { ContentBlock } from '../types/content-block.types';

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ block }) => {
  const { contentData, styleData, settingsData } = block;
  
  // Generate CSS from styleData
  const styles = generateStylesFromData(styleData);
  
  // Apply settings
  const config = processSettings(settingsData);
  
  // Render based on block type
  switch (block.blockType) {
    case 'HERO_BANNER':
      return (
        <HeroBannerBlock 
          content={contentData as HeroBannerContentData}
          styles={styles}
          settings={config}
        />
      );
    
    case 'IMAGE':
      return (
        <ImageBlock 
          content={contentData as ImageContentData}
          styles={styles}
          settings={config}
        />
      );
    
    case 'TEXT':
      return (
        <TextBlock 
          content={contentData as TextContentData}
          styles={styles}
          settings={config}
        />
      );
    
    // ... other block types
    
    default:
      return <div>Unsupported block type: {block.blockType}</div>;
  }
};

// Utility function to generate CSS from styleData
function generateStylesFromData(styleData: StyleData): React.CSSProperties {
  const styles: React.CSSProperties = {};
  
  if (styleData.layout) {
    Object.assign(styles, {
      width: styleData.layout.width,
      height: styleData.layout.height,
      margin: styleData.layout.margin,
      padding: styleData.layout.padding,
      display: styleData.layout.display,
      position: styleData.layout.position,
      zIndex: styleData.layout.zIndex,
    });
  }
  
  if (styleData.typography) {
    Object.assign(styles, {
      fontSize: styleData.typography.fontSize,
      fontWeight: styleData.typography.fontWeight,
      fontFamily: styleData.typography.fontFamily,
      lineHeight: styleData.typography.lineHeight,
      textAlign: styleData.typography.textAlign,
      color: styleData.typography.color,
    });
  }
  
  if (styleData.background) {
    Object.assign(styles, {
      backgroundColor: styleData.background.color,
      backgroundImage: styleData.background.image ? `url(${styleData.background.image})` : undefined,
      backgroundSize: styleData.background.size,
      backgroundPosition: styleData.background.position,
      backgroundRepeat: styleData.background.repeat,
    });
  }
  
  if (styleData.border) {
    Object.assign(styles, {
      borderWidth: styleData.border.width,
      borderStyle: styleData.border.style,
      borderColor: styleData.border.color,
      borderRadius: styleData.border.radius,
    });
  }
  
  if (styleData.effects) {
    Object.assign(styles, {
      boxShadow: styleData.effects.boxShadow,
      opacity: styleData.effects.opacity,
      transform: styleData.effects.transform,
      filter: styleData.effects.filter,
    });
  }
  
  return styles;
}
```

### Visual Page Builder Integration

```typescript
// PageBuilder.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const PageBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const newBlocks = Array.from(blocks);
    const [reorderedBlock] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedBlock);
    
    // Update position_order for all blocks
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      positionOrder: index + 1
    }));
    
    setBlocks(updatedBlocks);
    
    // Save to backend
    updateBlockPositions(updatedBlocks);
  };
  
  return (
    <div className="page-builder">
      <div className="builder-canvas">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="page-blocks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setSelectedBlock(block)}
                      >
                        <ContentBlockRenderer block={block} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      <div className="builder-sidebar">
        {selectedBlock && (
          <>
            <StylePanel 
              block={selectedBlock} 
              onUpdate={(styleData) => updateBlockStyle(selectedBlock.id, styleData)}
            />
            <SettingsPanel 
              block={selectedBlock} 
              onUpdate={(settingsData) => updateBlockSettings(selectedBlock.id, settingsData)}
            />
          </>
        )}
      </div>
    </div>
  );
};
```

This comprehensive example system demonstrates how the three JSONB fields work together to create a flexible, powerful visual page builder that can handle complex layouts, styling, and functionality while maintaining clean separation of concerns.
