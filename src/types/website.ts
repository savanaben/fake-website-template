export type ComponentType =
  | 'tab'
  | 'flexContainer'
  | 'column'
  | 'title'
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'image'
  | 'bannerImage'
  | 'fakeURLBar'
  | 'websiteHeaderBar'

export interface ComponentProps {
  // Tab props
  tabs?: Array<{ id: string; label: string }>
  
  // Title props
  title?: string
  logoUrl?: string
  logoAlt?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleColor?: string
  titleFontFamily?: string
  
  // Paragraph props
  content?: string
  
  // Heading props
  text?: string
  
  // Image props
  src?: string
  alt?: string
  imageWidth?: string | number
  height?: string | number
  
  // Layout props
  gap?: string
  columnDistribution?: string // e.g., "1:1", "1:2", "2:1", "1:1:1", "1:2:1"
  columnWidth?: string // Legacy/override for individual columns
  columnHasPadding?: boolean // Whether column has padding (default: true)
  
  // FakeURLBar props
  urlText?: string
  visible?: boolean
  urlBarSticky?: boolean // Whether the URL bar should be sticky
  
  // WebsiteHeaderBar props
  headerTitle?: string
  headerFontFamily?: string
  headerBackgroundColor?: string
  headerTitleColor?: string
  headerIconUrl?: string
  headerIconAlt?: string
  headerTextAlign?: 'left' | 'center' // Text alignment (default: 'left')
  headerHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' // Heading level (default: 'h3')
  headerBarSticky?: boolean // Whether the header bar should be sticky
  
  // Layer props (available for all components)
  name?: string // Custom name for the layer
  enabled?: boolean // Whether the layer is enabled (default: true)
}

export interface WebsiteComponent {
  id: string
  type: ComponentType
  props: ComponentProps
  children?: WebsiteComponent[]
}

export interface TabData {
  id: string
  label: string
  content: WebsiteComponent[]
  name?: string // Custom name for the tab
  enabled?: boolean // Whether the tab is enabled (default: true)
  position?: number // Position in the tab bar (1 = leftmost, higher = right)
}

export type TabStyle = 'line' | 'classic'

export interface WebsiteData {
  tabs: TabData[]
  activeTabId: string
  tabStyle?: TabStyle // Style variant for tabs: 'line' (default) or 'classic'
  tabSticky?: boolean // Whether the tab bar should be sticky
  tabIconUrl?: string // Icon image URL for the tab bar (displayed to the left of tabs)
  tabIconAlt?: string // Alt text for the tab bar icon
  crossTabComponents?: WebsiteComponent[] // Components that appear across all tabs (e.g., FakeURLBar)
}
