# Responsive + Multi-Language Integration Guide

## Complete System Integration

This guide demonstrates how the responsive design system and multi-language support work together seamlessly in the Vyin AI Brand Website CMS.

## Real-World Example: Product Showcase Page

### Database Structure

```sql
-- English parent page
INSERT INTO page (id, slug, title, page_type, language_code, parent_page_id, status) 
VALUES (1, 'ai-products', 'AI Products', 'PRODUCT', 'EN', NULL, 'PUBLISHED');

-- Chinese child page
INSERT INTO page (id, slug, title, page_type, language_code, parent_page_id, status) 
VALUES (2, 'ai-products-cn', 'AI产品', 'PRODUCT', 'CN', 1, 'PUBLISHED');

-- English hero block with responsive design
INSERT INTO content_block (id, page_id, block_type, position_order, content_data, style_data, settings_data)
VALUES (1, 1, 'HERO_BANNER', 1, 
  '{
    "title": "Revolutionary AI Products",
    "subtitle": "Transform your business with cutting-edge technology",
    "ctaText": "Explore Products",
    "ctaLink": "/products",
    "language": "EN"
  }',
  '{
    "layout": {
      "height": "400px",
      "padding": "40px 20px",
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center"
    },
    "typography": {
      "fontSize": "28px",
      "fontWeight": "700",
      "textAlign": "center",
      "color": "#ffffff"
    },
    "background": {
      "image": "hero-products-mobile.jpg",
      "size": "cover",
      "position": "center"
    },
    "responsive": {
      "tablet": {
        "layout": {
          "height": "500px",
          "padding": "60px 40px"
        },
        "typography": {
          "fontSize": "36px"
        },
        "background": {
          "image": "hero-products-tablet.jpg"
        }
      },
      "desktop": {
        "layout": {
          "height": "600px",
          "padding": "80px 60px",
          "flexDirection": "row",
          "textAlign": "left"
        },
        "typography": {
          "fontSize": "48px"
        },
        "background": {
          "image": "hero-products-desktop.jpg"
        }
      },
      "largeDesktop": {
        "layout": {
          "height": "700px",
          "padding": "100px 80px"
        },
        "typography": {
          "fontSize": "56px"
        },
        "background": {
          "image": "hero-products-4k.jpg"
        }
      }
    }
  }',
  '{
    "animation": {
      "type": "slideUp",
      "duration": 800,
      "trigger": "onLoad"
    },
    "integrations": {
      "analytics": {
        "trackViews": true,
        "trackClicks": true
      }
    }
  }'
);

-- Chinese hero block (same structure, different content)
INSERT INTO content_block (id, page_id, block_type, position_order, content_data, style_data, settings_data)
VALUES (2, 2, 'HERO_BANNER', 1,
  '{
    "title": "革命性AI产品",
    "subtitle": "用尖端技术改变您的业务",
    "ctaText": "探索产品",
    "ctaLink": "/products-cn",
    "language": "CN"
  }',
  '{
    "layout": {
      "height": "400px",
      "padding": "40px 20px",
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center"
    },
    "typography": {
      "fontSize": "24px",
      "fontWeight": "700",
      "textAlign": "center",
      "color": "#ffffff",
      "fontFamily": "PingFang SC, Microsoft YaHei, sans-serif"
    },
    "background": {
      "image": "hero-products-mobile.jpg",
      "size": "cover",
      "position": "center"
    },
    "responsive": {
      "tablet": {
        "layout": {
          "height": "500px",
          "padding": "60px 40px"
        },
        "typography": {
          "fontSize": "32px"
        },
        "background": {
          "image": "hero-products-tablet.jpg"
        }
      },
      "desktop": {
        "layout": {
          "height": "600px",
          "padding": "80px 60px",
          "flexDirection": "row",
          "textAlign": "left"
        },
        "typography": {
          "fontSize": "42px"
        },
        "background": {
          "image": "hero-products-desktop.jpg"
        }
      },
      "largeDesktop": {
        "layout": {
          "height": "700px",
          "padding": "100px 80px"
        },
        "typography": {
          "fontSize": "48px"
        },
        "background": {
          "image": "hero-products-4k.jpg"
        }
      }
    }
  }',
  '{
    "animation": {
      "type": "slideUp",
      "duration": 800,
      "trigger": "onLoad"
    },
    "integrations": {
      "analytics": {
        "trackViews": true,
        "trackClicks": true
      }
    }
  }'
);
```

## Frontend Implementation

### Unified Component System

```typescript
// components/ResponsiveMultiLanguageBlock.tsx
interface ResponsiveMultiLanguageBlockProps {
  block: ContentBlock;
  language: 'EN' | 'CN';
  breakpoint: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ResponsiveMultiLanguageBlock: React.FC<ResponsiveMultiLanguageBlockProps> = ({
  block,
  language,
  breakpoint,
  isSelected,
  onSelect
}) => {
  const [computedStyles, setComputedStyles] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    // Generate responsive styles for current breakpoint
    const styles = generateResponsiveStyles(block.styleData, breakpoint);
    
    // Apply language-specific adjustments
    const languageAdjustedStyles = applyLanguageSpecificStyles(styles, language);
    
    setComputedStyles(languageAdjustedStyles);
  }, [block.styleData, breakpoint, language]);

  // Render content based on language
  const renderContent = () => {
    switch (block.blockType) {
      case 'HERO_BANNER':
        return (
          <HeroBannerBlock
            content={block.contentData as HeroBannerContentData}
            language={language}
            styles={computedStyles}
            settings={block.settingsData}
          />
        );
      
      case 'TEXT':
        return (
          <TextBlock
            content={block.contentData as TextContentData}
            language={language}
            styles={computedStyles}
            settings={block.settingsData}
          />
        );
      
      default:
        return <div>Unsupported block type</div>;
    }
  };

  return (
    <div
      data-block-id={block.id}
      data-language={language}
      data-breakpoint={breakpoint}
      className={`content-block ${isSelected ? 'selected' : ''}`}
      style={computedStyles}
      onClick={onSelect}
    >
      {renderContent()}
    </div>
  );
};

// Utility functions
function generateResponsiveStyles(styleData: StyleData, breakpoint: string): React.CSSProperties {
  let styles: React.CSSProperties = {};
  
  // Start with base styles
  if (styleData.layout) {
    Object.assign(styles, convertLayoutToCSS(styleData.layout));
  }
  if (styleData.typography) {
    Object.assign(styles, convertTypographyToCSS(styleData.typography));
  }
  if (styleData.background) {
    Object.assign(styles, convertBackgroundToCSS(styleData.background));
  }
  
  // Apply responsive overrides based on breakpoint hierarchy
  const breakpointOrder = ['mobile', 'tablet', 'desktop', 'largeDesktop'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  for (let i = 0; i <= currentIndex; i++) {
    const bp = breakpointOrder[i];
    if (styleData.responsive?.[bp]) {
      const responsiveStyles = styleData.responsive[bp];
      
      if (responsiveStyles.layout) {
        Object.assign(styles, convertLayoutToCSS(responsiveStyles.layout));
      }
      if (responsiveStyles.typography) {
        Object.assign(styles, convertTypographyToCSS(responsiveStyles.typography));
      }
      if (responsiveStyles.background) {
        Object.assign(styles, convertBackgroundToCSS(responsiveStyles.background));
      }
    }
  }
  
  return styles;
}

function applyLanguageSpecificStyles(styles: React.CSSProperties, language: 'EN' | 'CN'): React.CSSProperties {
  const adjustedStyles = { ...styles };
  
  if (language === 'CN') {
    // Chinese-specific adjustments
    if (!adjustedStyles.fontFamily || adjustedStyles.fontFamily.includes('Arial')) {
      adjustedStyles.fontFamily = 'PingFang SC, Microsoft YaHei, sans-serif';
    }
    
    // Adjust line height for Chinese characters
    if (adjustedStyles.lineHeight && typeof adjustedStyles.lineHeight === 'string') {
      const lineHeight = parseFloat(adjustedStyles.lineHeight);
      adjustedStyles.lineHeight = (lineHeight * 1.1).toString();
    }
    
    // Adjust letter spacing for Chinese
    adjustedStyles.letterSpacing = '0.05em';
  }
  
  return adjustedStyles;
}
```

### Advanced Page Builder with Both Systems

```typescript
// components/AdvancedPageBuilder.tsx
export const AdvancedPageBuilder: React.FC = () => {
  const [pages, setPages] = useState<{ [key: string]: Page }>({});
  const [activeLanguage, setActiveLanguage] = useState<'EN' | 'CN'>('EN');
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>('mobile');
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const currentPage = pages[activeLanguage];

  const switchLanguage = async (language: 'EN' | 'CN') => {
    if (!pages[language]) {
      // Load the page for this language
      const pageData = await fetchPageByLanguage(currentPage?.id || 1, language);
      setPages(prev => ({ ...prev, [language]: pageData }));
    }
    setActiveLanguage(language);
  };

  const updateBlockContent = async (blockId: number, contentData: any) => {
    const updatedBlock = await updateContentBlock(blockId, { contentData });
    
    // Update local state
    setPages(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        contentBlocks: prev[activeLanguage].contentBlocks.map(block =>
          block.id === blockId ? { ...block, contentData } : block
        )
      }
    }));
  };

  const updateBlockStyles = async (blockId: number, styleData: StyleData) => {
    const updatedBlock = await updateContentBlock(blockId, { styleData });
    
    // Update all language variants since styles are shared
    const allLanguages = Object.keys(pages);
    for (const lang of allLanguages) {
      const langPage = pages[lang];
      const blockInLang = langPage.contentBlocks.find(b => 
        b.positionOrder === updatedBlock.positionOrder && 
        b.blockType === updatedBlock.blockType
      );
      
      if (blockInLang) {
        await updateContentBlock(blockInLang.id, { styleData });
      }
    }
    
    // Refresh pages
    await refreshAllLanguagePages();
  };

  return (
    <div className="advanced-page-builder">
      {/* Toolbar */}
      <div className="builder-toolbar">
        {/* Language Controls */}
        <div className="language-controls">
          <button 
            className={`lang-btn ${activeLanguage === 'EN' ? 'active' : ''}`}
            onClick={() => switchLanguage('EN')}
          >
            🇺🇸 English
            {pages.EN?.status === 'DRAFT' && <span className="draft-dot">●</span>}
          </button>
          <button 
            className={`lang-btn ${activeLanguage === 'CN' ? 'active' : ''}`}
            onClick={() => switchLanguage('CN')}
          >
            🇨🇳 中文
            {pages.CN?.status === 'DRAFT' && <span className="draft-dot">●</span>}
          </button>
        </div>

        {/* Responsive Controls */}
        <div className="responsive-controls">
          {[
            { key: 'mobile', icon: '📱', label: 'Mobile', width: '375px' },
            { key: 'tablet', icon: '📱', label: 'Tablet', width: '768px' },
            { key: 'desktop', icon: '💻', label: 'Desktop', width: '1024px' },
            { key: 'largeDesktop', icon: '🖥️', label: 'Large', width: '1440px' }
          ].map(bp => (
            <button
              key={bp.key}
              className={`bp-btn ${activeBreakpoint === bp.key ? 'active' : ''}`}
              onClick={() => setActiveBreakpoint(bp.key)}
              title={`${bp.label} (${bp.width}+)`}
            >
              {bp.icon}
              <span className="bp-label">{bp.label}</span>
            </button>
          ))}
        </div>

        {/* Preview Toggle */}
        <div className="preview-controls">
          <button 
            className={`preview-btn ${previewMode ? 'active' : ''}`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? '✏️ Edit' : '👁️ Preview'}
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="builder-main">
        {/* Canvas */}
        <div className="builder-canvas">
          <div className={`canvas-container canvas-container--${activeBreakpoint}`}>
            <div className="canvas-frame">
              {currentPage?.contentBlocks?.map(block => (
                <ResponsiveMultiLanguageBlock
                  key={`${block.id}-${activeLanguage}-${activeBreakpoint}`}
                  block={block}
                  language={activeLanguage}
                  breakpoint={activeBreakpoint}
                  isSelected={selectedBlock?.id === block.id}
                  onSelect={() => !previewMode && setSelectedBlock(block)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {!previewMode && selectedBlock && (
          <div className="builder-sidebar">
            {/* Content Panel */}
            <div className="panel content-panel">
              <h3>Content ({activeLanguage})</h3>
              <MultiLanguageContentEditor
                block={selectedBlock}
                language={activeLanguage}
                onUpdate={(content) => updateBlockContent(selectedBlock.id, content)}
              />
            </div>

            {/* Style Panel */}
            <div className="panel style-panel">
              <h3>Styles ({activeBreakpoint})</h3>
              <ResponsiveStyleEditor
                block={selectedBlock}
                breakpoint={activeBreakpoint}
                onUpdate={(styles) => updateBlockStyles(selectedBlock.id, styles)}
              />
            </div>

            {/* Settings Panel */}
            <div className="panel settings-panel">
              <h3>Settings</h3>
              <SettingsEditor
                block={selectedBlock}
                onUpdate={(settings) => updateBlockSettings(selectedBlock.id, settings)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="builder-status">
        <div className="status-info">
          <span>Page: {currentPage?.title}</span>
          <span>Language: {activeLanguage}</span>
          <span>Breakpoint: {activeBreakpoint}</span>
          <span>Blocks: {currentPage?.contentBlocks?.length || 0}</span>
        </div>
        
        <div className="status-actions">
          <button onClick={() => savePage(currentPage)}>💾 Save</button>
          <button onClick={() => publishPage(currentPage)}>🚀 Publish</button>
          <button onClick={() => syncContentStructure(currentPage)}>🔄 Sync</button>
        </div>
      </div>
    </div>
  );
};
```

## Key Integration Benefits

### 1. **Unified Editing Experience**
- Single interface for managing both responsive design and multi-language content
- Real-time preview across different breakpoints and languages
- Consistent styling shared across language variants

### 2. **Efficient Content Management**
- Content structure synchronization across languages
- Independent content editing per language
- Shared responsive styles reduce duplication

### 3. **Developer-Friendly Architecture**
- Type-safe interfaces for all data structures
- Modular component system
- Comprehensive validation and error handling

### 4. **Performance Optimization**
- Efficient CSS generation with media queries
- Lazy loading of language variants
- Optimized database queries with proper indexing

### 5. **SEO and Accessibility**
- Language-specific URLs and metadata
- Responsive design for all devices
- Proper semantic markup and ARIA labels

This integrated system provides a powerful, flexible foundation for building multi-language, responsive websites with the Vyin AI Brand Website CMS.
