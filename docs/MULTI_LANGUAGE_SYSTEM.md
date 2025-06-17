# Multi-Language Content System

## Overview

The Vyin AI CMS supports full multi-language content management with English (EN) and Chinese (CN) support. The system uses a parent-child page relationship model with shared content blocks that can have language-specific content.

## Database Schema for Multi-Language

### Page Relationship Structure

```sql
-- Parent page (language-neutral structure)
INSERT INTO page (id, slug, title, page_type, language_code, parent_page_id, status) 
VALUES (1, 'about-us', 'About Us', 'CASE_STUDY', 'EN', NULL, 'PUBLISHED');

-- Child page (Chinese version)
INSERT INTO page (id, slug, title, page_type, language_code, parent_page_id, status) 
VALUES (2, 'about-us-cn', '关于我们', 'CASE_STUDY', 'CN', 1, 'PUBLISHED');
```

### Content Block Language Relationship

```sql
-- English content block
INSERT INTO content_block (id, page_id, block_type, position_order, content_data, style_data, settings_data)
VALUES (1, 1, 'HERO_BANNER', 1, 
  '{"title": "About Vyin AI", "subtitle": "Leading AI Innovation", "language": "EN"}',
  '{"layout": {"height": "600px"}, "typography": {"fontSize": "24px"}}',
  '{"animation": {"type": "fadeIn"}}'
);

-- Chinese content block (same structure, different content)
INSERT INTO content_block (id, page_id, block_type, position_order, content_data, style_data, settings_data)
VALUES (2, 2, 'HERO_BANNER', 1,
  '{"title": "关于Vyin AI", "subtitle": "引领AI创新", "language": "CN"}',
  '{"layout": {"height": "600px"}, "typography": {"fontSize": "24px"}}',
  '{"animation": {"type": "fadeIn"}}'
);
```

## Multi-Language Architecture

### 1. Page-Level Language Management

```typescript
// interfaces/multi-language.interface.ts
export interface MultiLanguagePage {
  id: number;
  slug: string;
  title: string;
  pageType: string;
  languageCode: 'EN' | 'CN';
  parentPageId?: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  
  // Relationships
  parentPage?: MultiLanguagePage;
  childPages?: MultiLanguagePage[];
  contentBlocks?: ContentBlock[];
}

export interface LanguageVariant {
  language: 'EN' | 'CN';
  pageId: number;
  slug: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  lastModified: Date;
  isDefault: boolean;
}
```

### 2. Content Block Language Structure

```typescript
// Each content block contains language-specific content
export interface MultiLanguageContentBlock {
  id: number;
  pageId: number;
  blockType: ContentBlockTypeEnum;
  positionOrder: number;
  
  // Content varies by language
  contentData: {
    language: 'EN' | 'CN';
    // ... other content properties
  };
  
  // Style and settings are shared across languages
  styleData: StyleData;
  settingsData: SettingsData;
}
```

## Practical Implementation Examples

### Example 1: Hero Banner Multi-Language Content

```json
{
  "pageStructure": {
    "parentPage": {
      "id": 1,
      "slug": "about-us",
      "pageType": "CASE_STUDY",
      "languageCode": "EN",
      "parentPageId": null,
      "title": "About Us"
    },
    "childPages": [
      {
        "id": 2,
        "slug": "about-us-cn", 
        "pageType": "CASE_STUDY",
        "languageCode": "CN",
        "parentPageId": 1,
        "title": "关于我们"
      }
    ]
  },
  
  "contentBlocks": {
    "english": {
      "id": 1,
      "pageId": 1,
      "blockType": "HERO_BANNER",
      "positionOrder": 1,
      "contentData": {
        "title": "Transform Your Business with AI",
        "subtitle": "Discover the power of artificial intelligence solutions",
        "description": "Join thousands of companies already leveraging AI to streamline operations, enhance customer experiences, and drive innovation.",
        "ctaText": "Get Started Today",
        "ctaLink": "/contact",
        "language": "EN"
      },
      "styleData": {
        "layout": {
          "height": "600px",
          "padding": "80px 40px"
        },
        "typography": {
          "fontSize": "48px",
          "fontWeight": "700",
          "lineHeight": "1.2"
        },
        "background": {
          "image": "hero-bg.jpg",
          "size": "cover"
        }
      },
      "settingsData": {
        "animation": {
          "type": "slideUp",
          "duration": 800
        }
      }
    },
    
    "chinese": {
      "id": 2,
      "pageId": 2,
      "blockType": "HERO_BANNER", 
      "positionOrder": 1,
      "contentData": {
        "title": "用AI改变您的业务",
        "subtitle": "探索人工智能解决方案的力量",
        "description": "加入已经利用AI简化运营、增强客户体验并推动创新的数千家公司。",
        "ctaText": "立即开始",
        "ctaLink": "/contact-cn",
        "language": "CN"
      },
      // SHARED: Same styleData and settingsData as English version
      "styleData": {
        "layout": {
          "height": "600px",
          "padding": "80px 40px"
        },
        "typography": {
          "fontSize": "48px",
          "fontWeight": "700",
          "lineHeight": "1.2",
          // Chinese-specific typography adjustments
          "fontFamily": "PingFang SC, Microsoft YaHei, sans-serif"
        },
        "background": {
          "image": "hero-bg.jpg",
          "size": "cover"
        }
      },
      "settingsData": {
        "animation": {
          "type": "slideUp", 
          "duration": 800
        }
      }
    }
  }
}
```

### Example 2: Product Grid with Language-Specific Content

```json
{
  "english": {
    "contentData": {
      "title": "Our AI Solutions",
      "description": "Comprehensive artificial intelligence products for modern businesses",
      "products": [
        {
          "title": "Natural Language Processing",
          "description": "Advanced text analysis and understanding capabilities",
          "image": 101,
          "link": "/products/nlp"
        },
        {
          "title": "Computer Vision",
          "description": "Intelligent image and video recognition systems", 
          "image": 102,
          "link": "/products/computer-vision"
        }
      ],
      "language": "EN"
    }
  },
  
  "chinese": {
    "contentData": {
      "title": "我们的AI解决方案",
      "description": "为现代企业提供全面的人工智能产品",
      "products": [
        {
          "title": "自然语言处理",
          "description": "先进的文本分析和理解能力",
          "image": 101,
          "link": "/products/nlp-cn"
        },
        {
          "title": "计算机视觉", 
          "description": "智能图像和视频识别系统",
          "image": 102,
          "link": "/products/computer-vision-cn"
        }
      ],
      "language": "CN"
    }
  }
}
```

## Backend API Implementation

### Multi-Language Page Service

```typescript
// services/multi-language-page.service.ts
@Injectable()
export class MultiLanguagePageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
    @InjectRepository(ContentBlock)
    private contentBlockRepository: Repository<ContentBlock>,
  ) {}

  async createPageWithLanguageVariants(createPageDto: CreatePageDto): Promise<MultiLanguagePageResponse> {
    // 1. Create parent page (default language)
    const parentPage = await this.pageRepository.save({
      ...createPageDto,
      languageCode: 'EN',
      parentPageId: null,
    });

    // 2. Create child page for Chinese
    const childPage = await this.pageRepository.save({
      ...createPageDto,
      slug: `${createPageDto.slug}-cn`,
      title: createPageDto.titleCN || createPageDto.title,
      languageCode: 'CN',
      parentPageId: parentPage.id,
    });

    return {
      parentPage,
      languageVariants: [
        { language: 'EN', pageId: parentPage.id, isDefault: true },
        { language: 'CN', pageId: childPage.id, isDefault: false }
      ]
    };
  }

  async duplicateContentBlocksForLanguage(
    sourcePageId: number, 
    targetPageId: number,
    targetLanguage: 'EN' | 'CN'
  ): Promise<ContentBlock[]> {
    const sourceBlocks = await this.contentBlockRepository.find({
      where: { pageId: sourcePageId, deletedAt: null },
      order: { positionOrder: 'ASC' }
    });

    const duplicatedBlocks = [];

    for (const sourceBlock of sourceBlocks) {
      // Create new block with same structure but different content
      const newBlock = await this.contentBlockRepository.save({
        pageId: targetPageId,
        blockType: sourceBlock.blockType,
        positionOrder: sourceBlock.positionOrder,
        
        // Copy content data and update language
        contentData: {
          ...sourceBlock.contentData,
          language: targetLanguage,
          // Content will be translated/updated by editors
        },
        
        // Share style and settings data
        styleData: sourceBlock.styleData,
        settingsData: sourceBlock.settingsData,
        
        isVisible: sourceBlock.isVisible,
        creatorUserId: sourceBlock.creatorUserId,
        updaterUserId: sourceBlock.updaterUserId,
      });

      duplicatedBlocks.push(newBlock);
    }

    return duplicatedBlocks;
  }

  async getPageWithLanguageVariants(pageId: number): Promise<MultiLanguagePageResponse> {
    const page = await this.pageRepository.findOne({
      where: { id: pageId },
      relations: ['parentPage', 'childPages', 'contentBlocks']
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    // Get all language variants
    const variants = [];
    
    if (page.parentPageId) {
      // This is a child page, get parent and siblings
      const parentPage = await this.pageRepository.findOne({
        where: { id: page.parentPageId },
        relations: ['childPages']
      });
      
      variants.push({
        language: parentPage.languageCode,
        pageId: parentPage.id,
        slug: parentPage.slug,
        title: parentPage.title,
        status: parentPage.status,
        isDefault: true
      });

      parentPage.childPages.forEach(child => {
        variants.push({
          language: child.languageCode,
          pageId: child.id,
          slug: child.slug,
          title: child.title,
          status: child.status,
          isDefault: false
        });
      });
    } else {
      // This is a parent page
      variants.push({
        language: page.languageCode,
        pageId: page.id,
        slug: page.slug,
        title: page.title,
        status: page.status,
        isDefault: true
      });

      page.childPages?.forEach(child => {
        variants.push({
          language: child.languageCode,
          pageId: child.id,
          slug: child.slug,
          title: child.title,
          status: child.status,
          isDefault: false
        });
      });
    }

    return {
      currentPage: page,
      languageVariants: variants
    };
  }

  async syncContentBlockStructure(parentPageId: number): Promise<void> {
    const parentPage = await this.pageRepository.findOne({
      where: { id: parentPageId },
      relations: ['childPages', 'contentBlocks']
    });

    if (!parentPage || !parentPage.childPages) {
      return;
    }

    // Get parent page content blocks
    const parentBlocks = await this.contentBlockRepository.find({
      where: { pageId: parentPageId, deletedAt: null },
      order: { positionOrder: 'ASC' }
    });

    // Sync structure to all child pages
    for (const childPage of parentPage.childPages) {
      const childBlocks = await this.contentBlockRepository.find({
        where: { pageId: childPage.id, deletedAt: null },
        order: { positionOrder: 'ASC' }
      });

      // Remove blocks that don't exist in parent
      for (const childBlock of childBlocks) {
        const parentBlockExists = parentBlocks.find(
          pb => pb.positionOrder === childBlock.positionOrder && 
                pb.blockType === childBlock.blockType
        );
        
        if (!parentBlockExists) {
          await this.contentBlockRepository.softDelete(childBlock.id);
        }
      }

      // Add missing blocks from parent
      for (const parentBlock of parentBlocks) {
        const childBlockExists = childBlocks.find(
          cb => cb.positionOrder === parentBlock.positionOrder && 
                cb.blockType === parentBlock.blockType
        );

        if (!childBlockExists) {
          await this.contentBlockRepository.save({
            pageId: childPage.id,
            blockType: parentBlock.blockType,
            positionOrder: parentBlock.positionOrder,
            contentData: {
              ...parentBlock.contentData,
              language: childPage.languageCode
            },
            styleData: parentBlock.styleData,
            settingsData: parentBlock.settingsData,
            isVisible: parentBlock.isVisible,
            creatorUserId: parentBlock.creatorUserId,
            updaterUserId: parentBlock.updaterUserId,
          });
        }
      }
    }
  }
}
```

## Frontend Multi-Language Implementation

### Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
export const LanguageSwitcher: React.FC<{ pageId: number }> = ({ pageId }) => {
  const [languageVariants, setLanguageVariants] = useState<LanguageVariant[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<'EN' | 'CN'>('EN');

  useEffect(() => {
    fetchLanguageVariants(pageId).then(variants => {
      setLanguageVariants(variants);
      const current = variants.find(v => v.pageId === pageId);
      if (current) {
        setCurrentLanguage(current.language);
      }
    });
  }, [pageId]);

  const switchLanguage = (targetLanguage: 'EN' | 'CN') => {
    const targetVariant = languageVariants.find(v => v.language === targetLanguage);
    if (targetVariant) {
      // Navigate to the target language page
      window.location.href = `/pages/${targetVariant.pageId}`;
    }
  };

  return (
    <div className="language-switcher">
      {languageVariants.map(variant => (
        <button
          key={variant.language}
          className={`lang-btn ${currentLanguage === variant.language ? 'active' : ''}`}
          onClick={() => switchLanguage(variant.language)}
        >
          <span className="lang-code">{variant.language}</span>
          <span className="lang-title">{variant.title}</span>
          {variant.status === 'DRAFT' && <span className="status-badge">Draft</span>}
        </button>
      ))}
    </div>
  );
};
```

### Multi-Language Page Builder

```typescript
// components/MultiLanguagePageBuilder.tsx
export const MultiLanguagePageBuilder: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [languageVariants, setLanguageVariants] = useState<LanguageVariant[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<'EN' | 'CN'>('EN');

  const switchLanguageView = async (targetLanguage: 'EN' | 'CN') => {
    const targetVariant = languageVariants.find(v => v.language === targetLanguage);
    if (targetVariant) {
      const targetPage = await fetchPageWithBlocks(targetVariant.pageId);
      setCurrentPage(targetPage);
      setActiveLanguage(targetLanguage);
    }
  };

  const syncContentStructure = async () => {
    const parentPageId = currentPage?.parentPageId || currentPage?.id;
    if (parentPageId) {
      await syncContentBlockStructure(parentPageId);
      // Refresh current page
      const refreshedPage = await fetchPageWithBlocks(currentPage.id);
      setCurrentPage(refreshedPage);
    }
  };

  return (
    <div className="multi-language-page-builder">
      {/* Language Tabs */}
      <div className="language-tabs">
        {languageVariants.map(variant => (
          <button
            key={variant.language}
            className={`tab ${activeLanguage === variant.language ? 'active' : ''}`}
            onClick={() => switchLanguageView(variant.language)}
          >
            {variant.language === 'EN' ? '🇺🇸 English' : '🇨🇳 中文'}
            {variant.status === 'DRAFT' && <span className="draft-indicator">●</span>}
          </button>
        ))}
        
        <button className="sync-btn" onClick={syncContentStructure}>
          🔄 Sync Structure
        </button>
      </div>

      {/* Content Editor */}
      <div className="content-editor">
        <div className="editor-header">
          <h2>Editing: {currentPage?.title} ({activeLanguage})</h2>
          <div className="editor-actions">
            <button onClick={() => savePage(currentPage)}>Save</button>
            <button onClick={() => publishPage(currentPage)}>Publish</button>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="content-blocks">
          {currentPage?.contentBlocks?.map(block => (
            <MultiLanguageContentBlockEditor
              key={block.id}
              block={block}
              language={activeLanguage}
              onUpdate={(updatedBlock) => updateContentBlock(updatedBlock)}
            />
          ))}
        </div>
      </div>

      {/* Translation Helper */}
      <div className="translation-helper">
        <h3>Translation Assistant</h3>
        <button onClick={() => suggestTranslations(currentPage)}>
          🤖 AI Translation Suggestions
        </button>
      </div>
    </div>
  );
};
```

## Content Editor Workflow

### 1. Creating a Multi-Language Page

```typescript
// Step 1: Create parent page (English)
const englishPage = await createPage({
  slug: 'ai-solutions',
  title: 'AI Solutions',
  pageType: 'PRODUCT',
  languageCode: 'EN'
});

// Step 2: Auto-create Chinese variant
const chinesePage = await createLanguageVariant(englishPage.id, {
  slug: 'ai-solutions-cn',
  title: 'AI解决方案',
  languageCode: 'CN'
});

// Step 3: Add content blocks to English page
const heroBlock = await addContentBlock(englishPage.id, {
  blockType: 'HERO_BANNER',
  contentData: {
    title: 'Revolutionary AI Solutions',
    subtitle: 'Transform your business today',
    language: 'EN'
  },
  styleData: {
    layout: { height: '600px' },
    typography: { fontSize: '48px' }
  }
});

// Step 4: Auto-sync structure to Chinese page
await syncContentStructure(englishPage.id);

// Step 5: Translate content for Chinese page
await updateContentBlock(chinesePage.contentBlocks[0].id, {
  contentData: {
    title: '革命性AI解决方案',
    subtitle: '立即改变您的业务',
    language: 'CN'
  }
  // styleData and settingsData remain the same
});
```

### 2. Responsive + Multi-Language Workflow

```json
{
  "workflowExample": {
    "step1_createEnglishPage": {
      "pageData": {
        "slug": "about-us",
        "title": "About Us",
        "languageCode": "EN"
      }
    },

    "step2_addResponsiveHeroBlock": {
      "contentData": {
        "title": "About Vyin AI",
        "subtitle": "Leading AI Innovation",
        "language": "EN"
      },
      "styleData": {
        "layout": {
          "height": "400px",
          "padding": "40px 20px"
        },
        "typography": {
          "fontSize": "32px",
          "textAlign": "center"
        },
        "responsive": {
          "tablet": {
            "layout": {
              "height": "500px",
              "padding": "60px 40px"
            },
            "typography": {
              "fontSize": "40px"
            }
          },
          "desktop": {
            "layout": {
              "height": "600px",
              "padding": "80px 60px"
            },
            "typography": {
              "fontSize": "48px"
            }
          }
        }
      }
    },

    "step3_createChineseVariant": {
      "pageData": {
        "slug": "about-us-cn",
        "title": "关于我们",
        "languageCode": "CN",
        "parentPageId": 1
      }
    },

    "step4_translateContent": {
      "contentData": {
        "title": "关于Vyin AI",
        "subtitle": "引领AI创新",
        "language": "CN"
      },
      "styleData": {
        // INHERITED: Same responsive styles
        "layout": {
          "height": "400px",
          "padding": "40px 20px"
        },
        "typography": {
          "fontSize": "32px",
          "textAlign": "center",
          // CHINESE-SPECIFIC: Different font family
          "fontFamily": "PingFang SC, Microsoft YaHei, sans-serif"
        },
        "responsive": {
          "tablet": {
            "layout": {
              "height": "500px",
              "padding": "60px 40px"
            },
            "typography": {
              "fontSize": "36px" // Slightly smaller for Chinese characters
            }
          },
          "desktop": {
            "layout": {
              "height": "600px",
              "padding": "80px 60px"
            },
            "typography": {
              "fontSize": "42px" // Adjusted for Chinese readability
            }
          }
        }
      }
    }
  }
}
```

### 3. Visual Page Builder Interface

```typescript
// Multi-Language + Responsive Editor Component
export const AdvancedPageBuilder: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>();
  const [activeLanguage, setActiveLanguage] = useState<'EN' | 'CN'>('EN');
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>('mobile');
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock>();

  return (
    <div className="advanced-page-builder">
      {/* Top Toolbar */}
      <div className="builder-toolbar">
        {/* Language Switcher */}
        <div className="language-controls">
          <button
            className={activeLanguage === 'EN' ? 'active' : ''}
            onClick={() => switchLanguage('EN')}
          >
            🇺🇸 English
          </button>
          <button
            className={activeLanguage === 'CN' ? 'active' : ''}
            onClick={() => switchLanguage('CN')}
          >
            🇨🇳 中文
          </button>
        </div>

        {/* Responsive Controls */}
        <div className="responsive-controls">
          <button
            className={activeBreakpoint === 'mobile' ? 'active' : ''}
            onClick={() => setActiveBreakpoint('mobile')}
          >
            📱 Mobile
          </button>
          <button
            className={activeBreakpoint === 'tablet' ? 'active' : ''}
            onClick={() => setActiveBreakpoint('tablet')}
          >
            📱 Tablet
          </button>
          <button
            className={activeBreakpoint === 'desktop' ? 'active' : ''}
            onClick={() => setActiveBreakpoint('desktop')}
          >
            💻 Desktop
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="builder-main">
        {/* Canvas */}
        <div className="builder-canvas">
          <div className={`preview-frame preview-frame--${activeBreakpoint}`}>
            {currentPage?.contentBlocks?.map(block => (
              <ResponsiveMultiLanguageBlock
                key={block.id}
                block={block}
                language={activeLanguage}
                breakpoint={activeBreakpoint}
                isSelected={selectedBlock?.id === block.id}
                onSelect={() => setSelectedBlock(block)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="builder-sidebar">
          {selectedBlock && (
            <>
              {/* Content Editor */}
              <div className="content-panel">
                <h3>Content ({activeLanguage})</h3>
                <ContentEditor
                  block={selectedBlock}
                  language={activeLanguage}
                  onUpdate={(content) => updateBlockContent(selectedBlock.id, content)}
                />
              </div>

              {/* Style Editor */}
              <div className="style-panel">
                <h3>Styles ({activeBreakpoint})</h3>
                <ResponsiveStyleEditor
                  block={selectedBlock}
                  breakpoint={activeBreakpoint}
                  onUpdate={(styles) => updateBlockStyles(selectedBlock.id, styles)}
                />
              </div>

              {/* Settings Editor */}
              <div className="settings-panel">
                <h3>Settings</h3>
                <SettingsEditor
                  block={selectedBlock}
                  onUpdate={(settings) => updateBlockSettings(selectedBlock.id, settings)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
```

This multi-language system provides:

1. **Shared page structure** with language-specific content
2. **Automatic content block synchronization** across languages
3. **Independent content editing** for each language
4. **Shared styling and settings** to maintain consistency
5. **Translation workflow tools** for content editors
6. **SEO-friendly URLs** for each language variant
7. **Responsive design** that works across all languages
8. **Visual editing interface** for both content and styles
