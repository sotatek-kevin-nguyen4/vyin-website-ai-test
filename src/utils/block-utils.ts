import type { ContentBlock, ContainerContentSettings } from '../types/content-block.types'

/**
 * Organizes flat array of content blocks into a tree structure
 * where child blocks are nested under their parent containers
 */
export function organizeBlocksIntoTree(blocks: ContentBlock[]): ContentBlock[] {
  // First, flatten any nested children that might already exist in the data
  const flattenedBlocks: ContentBlock[] = []

  const flattenBlock = (block: ContentBlock) => {
    // Add the block itself
    flattenedBlocks.push({ ...block, children: [] })

    // If it has children, flatten them too
    if (block.children && block.children.length > 0) {
      block.children.forEach((child) => {
        flattenBlock(child)
      })
    }
  }

  blocks.forEach(flattenBlock)

  // Create a map for quick lookup
  const blockMap = new Map<number, ContentBlock>()
  const rootBlocks: ContentBlock[] = []

  // First pass: create map and initialize children arrays
  flattenedBlocks.forEach((block) => {
    blockMap.set(block.id, { ...block, children: [] })
  })

  // Second pass: organize into tree structure
  flattenedBlocks.forEach((block) => {
    const blockWithChildren = blockMap.get(block.id)!

    if (block.parentBlockId && blockMap.has(block.parentBlockId)) {
      // This is a child block, add it to parent's children
      const parent = blockMap.get(block.parentBlockId)!
      parent.children!.push(blockWithChildren)
    } else {
      // This is a root block
      rootBlocks.push(blockWithChildren)
    }
  })

  // Sort children within each container by position order
  const sortChildren = (block: ContentBlock) => {
    if (block.children && block.children.length > 0) {
      block.children.sort((a, b) => a.positionOrder - b.positionOrder)
      block.children.forEach(sortChildren)
    }
  }

  rootBlocks.forEach(sortChildren)

  // Sort root blocks by position order
  return rootBlocks.sort((a, b) => a.positionOrder - b.positionOrder)
}

/**
 * Flattens a tree structure of blocks back into a flat array
 */
export function flattenBlockTree(blocks: ContentBlock[]): ContentBlock[] {
  const result: ContentBlock[] = []

  const flatten = (block: ContentBlock) => {
    result.push(block)
    if (block.children) {
      block.children.forEach(flatten)
    }
  }

  blocks.forEach(flatten)
  return result
}

/**
 * Finds a block by ID in a tree structure
 */
export function findBlockById(blocks: ContentBlock[], id: number): ContentBlock | null {
  for (const block of blocks) {
    if (block.id === id) {
      return block
    }
    if (block.children) {
      const found = findBlockById(block.children, id)
      if (found) return found
    }
  }
  return null
}

/**
 * Gets all child blocks of a container (recursively)
 */
export function getAllChildBlocks(block: ContentBlock): ContentBlock[] {
  const children: ContentBlock[] = []

  if (block.children) {
    block.children.forEach((child) => {
      children.push(child)
      children.push(...getAllChildBlocks(child))
    })
  }

  return children
}

/**
 * Validates that a block tree structure is valid
 */
export function validateBlockTree(blocks: ContentBlock[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  const seenIds = new Set<number>()

  const validate = (block: ContentBlock, depth = 0) => {
    // Check for duplicate IDs
    if (seenIds.has(block.id)) {
      errors.push(`Duplicate block ID found: ${block.id}`)
    }
    seenIds.add(block.id)

    // Check for excessive nesting depth
    if (depth > 10) {
      errors.push(`Block nesting too deep (${depth} levels) for block ID: ${block.id}`)
    }

    // Validate container blocks
    if (block.blockType === 'CONTAINER') {
      if (block.children) {
        // Type guard to check if content is ContainerContentSettings
        const containerSettings = block.settingsData.content as ContainerContentSettings | undefined

        // Check max children limit if specified
        const maxChildren = containerSettings?.editor?.dropZone?.maxChildren
        if (maxChildren && block.children.length > maxChildren) {
          errors.push(
            `Container ${block.id} exceeds max children limit: ${block.children.length} > ${maxChildren}`,
          )
        }

        // Validate allowed types if specified
        const allowedTypes = containerSettings?.editor?.dropZone?.allowedTypes
        if (allowedTypes) {
          block.children.forEach((child) => {
            if (!allowedTypes.includes(child.blockType)) {
              errors.push(
                `Container ${block.id} contains disallowed child type: ${child.blockType}`,
              )
            }
          })
        }

        // Recursively validate children
        block.children.forEach((child) => validate(child, depth + 1))
      }
    }
  }

  blocks.forEach((block) => validate(block))

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Creates a new container block with default settings
 */
export function createDefaultContainer(
  id: number,
  selectorId: string,
  positionOrder: number,
  title = 'New Container',
): ContentBlock {
  return {
    id,
    selectorId,
    blockType: 'CONTAINER',
    positionOrder,
    contentData: {
      containerType: 'div',
      title,
      layoutType: 'block',
      isCollapsible: false,
      isCollapsed: false,
    },
    styleData: {
      layout: {
        display: 'block',
        padding: '20px',
      },
    },
    settingsData: {
      general: {
        isVisible: true,
        customClasses: ['container-block'],
      },
      content: {
        editor: {
          collapsible: true,
          dropZone: {
            showIndicators: true,
            allowedTypes: ['TEXT', 'IMAGE', 'RICH_TEXT', 'LINK', 'CTA'],
            maxChildren: 10,
          },
        },
        container: {
          layout: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          },
        },
      },
    },
    creatorUserId: 1,
    updaterUserId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    children: [],
  }
}
