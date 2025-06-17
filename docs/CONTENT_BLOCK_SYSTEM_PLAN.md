# Content Block System Implementation Plan

## Overview

This document outlines the implementation plan for the content block system that powers the Vyin AI Brand Website CMS visual page builder. The system enables drag-and-drop functionality for creating dynamic pages with reusable UI components.

## Database Schema Design

### Core Tables

#### 1. **page** - Main content pages
- Supports multiple page types: `CASE_STUDY`, `PRODUCT`, `NEWS`, `BLOG`
- Multi-language support with `language_code` (EN/CN)
- SEO metadata fields (`meta_title`, `meta_description`, `meta_keywords`)
- Draft/Published workflow with `status` and `published_at`
- Hierarchical structure via `parent_page_id` for language variants

#### 2. **content_block** - Individual page components
- Flexible content storage using `content_data` JSONB field
- Drag-and-drop positioning via `position_order`
- Multiple block types: `TEXT`, `IMAGE`, `VIDEO`, `QUOTE`, `HERO_BANNER`, etc.
- Style and settings data stored as JSON for maximum flexibility
- Visibility control with `is_visible` flag

#### 3. **topic** - Content categorization
- Hierarchical topic system for organizing content
- Color coding support for UI visualization
- Slug-based URLs for SEO-friendly topic pages

#### 4. **hashtag** - Content tagging
- Usage tracking with `usage_count` for popular hashtags
- Maximum 10 hashtags per page (enforced at application level)
- Unique hashtag names across the system

#### 5. **media_file** - Asset management
- File metadata storage (size, type, original filename)
- Alt text and captions for accessibility
- Soft delete support for file cleanup

### Relationship Tables

#### 6. **page_topic** - Page categorization
- Many-to-many relationship between pages and topics
- Unique constraint prevents duplicate assignments

#### 7. **page_hashtag** - Page tagging
- Many-to-many relationship between pages and hashtags
- Application-level validation for max 10 hashtags per page

## Content Block Types

### Supported Block Types

1. **TEXT** - Rich text content with formatting
   ```json
   {
     "content": "<p>Rich text content</p>",
     "format": "html",
     "language": "EN"
   }
   ```

2. **IMAGE** - Image blocks with captions
   ```json
   {
     "mediaFileId": 123,
     "altText": "Image description",
     "caption": "Image caption",
     "alignment": "center"
   }
   ```

3. **VIDEO** - Video embeds or uploads
   ```json
   {
     "mediaFileId": 124,
     "poster": "poster-image.jpg",
     "autoplay": false,
     "controls": true
   }
   ```

4. **QUOTE** - Styled quote blocks
   ```json
   {
     "quote": "Quote text",
     "author": "Author name",
     "source": "Source publication",
     "style": "blockquote"
   }
   ```

5. **HERO_BANNER** - Large banner sections
   ```json
   {
     "title": "Banner title",
     "subtitle": "Banner subtitle",
     "backgroundImage": 125,
     "ctaText": "Call to action",
     "ctaLink": "/link"
   }
   ```

6. **LOGO_LIST** - Company logo grids
   ```json
   {
     "logos": [
       {"mediaFileId": 126, "name": "Company A", "link": "https://example.com"},
       {"mediaFileId": 127, "name": "Company B", "link": "https://example2.com"}
     ],
     "layout": "grid",
     "columns": 4
   }
   ```

7. **PRODUCT_GRID** - Product showcase
   ```json
   {
     "products": [
       {"title": "Product A", "description": "Description", "image": 128, "link": "/product-a"}
     ],
     "layout": "grid",
     "columns": 3
   }
   ```

8. **NEWS_LIST** - News article listings
   ```json
   {
     "count": 5,
     "topicFilter": [1, 2],
     "layout": "list",
     "showExcerpt": true
   }
   ```

9. **CUSTOM_HTML** - Custom HTML/CSS/JS
   ```json
   {
     "html": "<div>Custom HTML</div>",
     "css": ".custom { color: red; }",
     "js": "console.log('Custom JS');"
   }
   ```

## API Endpoints Design

### Page Management APIs

```typescript
// Page CRUD operations
GET    /api/pages                    // List pages with filtering
GET    /api/pages/:id                // Get page details
POST   /api/pages                    // Create new page
PUT    /api/pages/:id                // Update page
DELETE /api/pages/:id                // Delete page
POST   /api/pages/:id/duplicate      // Duplicate page
PUT    /api/pages/:id/publish        // Publish page
PUT    /api/pages/:id/unpublish      // Unpublish page

// Content block operations
GET    /api/pages/:id/blocks         // Get page blocks
POST   /api/pages/:id/blocks         // Add block to page
PUT    /api/blocks/:id               // Update block
DELETE /api/blocks/:id               // Delete block
PUT    /api/blocks/:id/reorder       // Reorder blocks
PUT    /api/blocks/:id/visibility    // Toggle block visibility
```

### Content Management APIs

```typescript
// Topic management
GET    /api/topics                   // List topics
POST   /api/topics                   // Create topic
PUT    /api/topics/:id               // Update topic
DELETE /api/topics/:id               // Delete topic

// Hashtag management
GET    /api/hashtags                 // List hashtags with usage
POST   /api/hashtags                 // Create hashtag
GET    /api/hashtags/popular         // Get popular hashtags

// Media management
GET    /api/media                    // List media files
POST   /api/media/upload             // Upload media file
DELETE /api/media/:id               // Delete media file
```

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Database schema implementation
- [ ] Basic entity definitions
- [ ] Core page CRUD operations
- [ ] Authentication integration

### Phase 2: Content Block System (Week 3-4)
- [ ] Content block CRUD operations
- [ ] Drag-and-drop positioning logic
- [ ] Block type validation
- [ ] JSON schema validation for content_data

### Phase 3: Visual Page Builder (Week 5-6)
- [ ] Block component library
- [ ] Real-time preview functionality
- [ ] Multi-language content support
- [ ] Draft/publish workflow

### Phase 4: Advanced Features (Week 7-8)
- [ ] Topic and hashtag management
- [ ] Media file handling
- [ ] SEO metadata management
- [ ] Search and filtering

### Phase 5: Integration & Testing (Week 9-10)
- [ ] Frontend integration
- [ ] Performance optimization
- [ ] Security testing
- [ ] Documentation completion

## Performance Considerations

### Database Optimization
- Proper indexing on frequently queried fields
- JSONB indexes for content_data queries
- Pagination for large datasets
- Soft delete implementation

### Caching Strategy
- Redis caching for published pages
- CDN integration for media files
- Query result caching for topics/hashtags
- Cache invalidation on content updates

### Security Measures
- Input validation for all content_data
- XSS protection for custom HTML blocks
- File upload security for media files
- Role-based access control

## Testing Strategy

### Unit Tests
- Entity validation tests
- Business logic tests
- API endpoint tests
- Content block type validation

### Integration Tests
- Database relationship tests
- Multi-language content tests
- File upload tests
- Cache integration tests

### Performance Tests
- Large page load tests
- Concurrent user tests
- Database query optimization
- Memory usage monitoring

## Monitoring & Maintenance

### Metrics to Track
- Page creation/update frequency
- Block type usage statistics
- Media file storage usage
- API response times

### Maintenance Tasks
- Regular database cleanup
- Media file optimization
- Cache warming strategies
- Performance monitoring

This implementation plan provides a comprehensive roadmap for building the content block system that will power the Vyin AI Brand Website CMS visual page builder.
