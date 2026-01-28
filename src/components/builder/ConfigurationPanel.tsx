import { ComponentType, ComponentProps, TabStyle } from '@/types/website'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TabData {
  id: string
  label: string
  enabled?: boolean
  position?: number
}

interface ConfigurationPanelProps {
  componentType: ComponentType | null
  props: ComponentProps
  onUpdate: (props: Partial<ComponentProps>) => void
  onDelete?: () => void
  // Tab configuration - show all tabs
  showTabSettings?: boolean
  allTabs?: TabData[]
  onUpdateTab?: (tabId: string, updates: { label?: string; enabled?: boolean; position?: number }) => void
  tabStyle?: TabStyle
  onUpdateTabStyle?: (style: TabStyle) => void
  tabSticky?: boolean
  onUpdateTabSticky?: (sticky: boolean) => void
  tabIconUrl?: string
  tabIconAlt?: string
  onUpdateTabIcon?: (iconUrl?: string, iconAlt?: string) => void
}

export function ConfigurationPanel({
  componentType,
  props,
  onUpdate,
  onDelete,
  showTabSettings,
  allTabs,
  onUpdateTab,
  tabStyle = 'line',
  onUpdateTabStyle,
  tabSticky = false,
  onUpdateTabSticky,
  tabIconUrl,
  tabIconAlt,
  onUpdateTabIcon,
}: ConfigurationPanelProps) {
  // Prioritize component selection over tab settings
  // If a component is selected, show its configuration
  if (componentType) {
    // Component configuration will be shown below - skip tab settings
  } else if (showTabSettings && allTabs && onUpdateTab) {
    // If tab settings are open and no component is selected, show all tabs configuration
    const sortedTabs = [...allTabs].sort((a, b) => (a.position || 0) - (b.position || 0))
    
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tab Settings</h3>
        </div>

        {/* Tab Style Selector */}
        {onUpdateTabStyle && (
          <div>
            <Label htmlFor="tab-style">Tab Style</Label>
            <select
              id="tab-style"
              value={tabStyle}
              onChange={(e) => onUpdateTabStyle(e.target.value as TabStyle)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="line">Line</option>
              <option value="classic">Classic</option>
            </select>
          </div>
        )}

        {/* Tab Sticky Toggle */}
        {onUpdateTabSticky && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="tab-sticky"
              checked={tabSticky === true}
              onChange={(e) => onUpdateTabSticky(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="tab-sticky" className="cursor-pointer">
              Sticky Tab Bar
            </Label>
          </div>
        )}

        {/* Tab Icon Configuration */}
        {onUpdateTabIcon && (
          <>
            <div>
              <Label htmlFor="tabIconUrl">Tab Icon/Image URL</Label>
              <Input
                id="tabIconUrl"
                value={tabIconUrl || ''}
                onChange={(e) => onUpdateTabIcon(e.target.value || undefined, tabIconAlt)}
                placeholder="/assets/images/history.png or https://example.com/icon.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use /assets/images/history.png for local images, or full URL for external images
              </p>
            </div>
            <div>
              <Label htmlFor="tabIconAlt">Tab Icon Alt Text</Label>
              <Input
                id="tabIconAlt"
                value={tabIconAlt || ''}
                onChange={(e) => onUpdateTabIcon(tabIconUrl, e.target.value || undefined)}
                placeholder="Tab icon"
              />
            </div>
          </>
        )}

        <div className="space-y-6">
          {sortedTabs.map((tab) => (
            <div key={tab.id} className="border-b pb-4 last:border-b-0 last:pb-0 space-y-3">
              <h4 className="font-medium text-sm text-gray-700">{tab.label}</h4>
              
              <div>
                <Label htmlFor={`tab-label-${tab.id}`}>Label</Label>
                <Input
                  id={`tab-label-${tab.id}`}
                  value={tab.label || ''}
                  onChange={(e) => onUpdateTab(tab.id, { label: e.target.value })}
                  placeholder="Enter tab label"
                />
              </div>
              
              <div>
                <Label htmlFor={`tab-position-${tab.id}`}>Position</Label>
                <Input
                  id={`tab-position-${tab.id}`}
                  type="number"
                  min={1}
                  max={allTabs.length}
                  value={tab.position || 1}
                  onChange={(e) => {
                    const position = parseInt(e.target.value, 10)
                    if (!isNaN(position) && position >= 1 && position <= allTabs.length) {
                      onUpdateTab(tab.id, { position })
                    }
                  }}
                  placeholder="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Position in tab bar (1 = leftmost, {allTabs.length} = rightmost)
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`tab-enabled-${tab.id}`}
                  checked={tab.enabled !== false}
                  onChange={(e) => onUpdateTab(tab.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor={`tab-enabled-${tab.id}`} className="cursor-pointer">
                  Enabled
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // No component selected and tab settings not open
  if (!componentType) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        Select a component to configure
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Configuration</h3>
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Layer Properties - available for all components */}
        <div className="border-t pt-4 space-y-4">
          <div>
            <Label htmlFor="layerName">Layer Name</Label>
            <Input
              id="layerName"
              value={props.name || ''}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Enter layer name"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enabled"
              checked={props.enabled !== false}
              onChange={(e) => onUpdate({ enabled: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="enabled" className="cursor-pointer">
              Enabled
            </Label>
          </div>
        </div>

        {/* Title Component */}
        {(componentType === 'title') && (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={props.title || ''}
                onChange={(e) => onUpdate({ title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={props.logoUrl || ''}
                onChange={(e) => onUpdate({ logoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div>
              <Label htmlFor="logoAlt">Logo Alt Text</Label>
              <Input
                id="logoAlt"
                value={props.logoAlt || ''}
                onChange={(e) => onUpdate({ logoAlt: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Paragraph Component */}
        {componentType === 'paragraph' && (
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={props.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={5}
            />
          </div>
        )}

        {/* Heading Components */}
        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(componentType) && (
          <div>
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              value={props.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
            />
          </div>
        )}

        {/* Image Component */}
        {componentType === 'image' && (
          <>
            <div>
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={props.src || ''}
                onChange={(e) => onUpdate({ src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={props.alt || ''}
                onChange={(e) => onUpdate({ alt: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="imageWidth">Width</Label>
                <Input
                  id="imageWidth"
                  value={props.imageWidth || ''}
                  onChange={(e) => onUpdate({ imageWidth: e.target.value })}
                  placeholder="auto (100%)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank for 100% width, or use px (e.g., "400px"), number (e.g., "400"), or Tailwind class (e.g., "w-64")
                </p>
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={props.height || ''}
                  onChange={(e) => onUpdate({ height: e.target.value })}
                  placeholder="auto"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank for auto height, or use px (e.g., "300px"), number (e.g., "300"), or Tailwind class (e.g., "h-48")
                </p>
              </div>
            </div>
          </>
        )}

        {/* Banner Image Component */}
        {componentType === 'bannerImage' && (
          <>
            <div>
              <Label htmlFor="bannerSrc">Image URL</Label>
              <Input
                id="bannerSrc"
                value={props.src || ''}
                onChange={(e) => onUpdate({ src: e.target.value })}
                placeholder="https://example.com/banner.jpg"
              />
            </div>
            <div>
              <Label htmlFor="bannerAlt">Alt Text</Label>
              <Input
                id="bannerAlt"
                value={props.alt || ''}
                onChange={(e) => onUpdate({ alt: e.target.value })}
              />
            </div>
          </>
        )}

        {/* FlexContainer Component */}
        {componentType === 'flexContainer' && (
          <>
            <div>
              <Label htmlFor="gap">Gap</Label>
              <Input
                id="gap"
                value={props.gap || 'gap-4'}
                onChange={(e) => onUpdate({ gap: e.target.value })}
                placeholder="gap-4"
              />
            </div>
            <div>
              <Label htmlFor="columnDistribution">Column Distribution</Label>
              <Input
                id="columnDistribution"
                value={props.columnDistribution || ''}
                onChange={(e) => onUpdate({ columnDistribution: e.target.value })}
                placeholder="1:1, 1:2, 2:1, 1:1:1, etc."
              />
              <p className="text-xs text-gray-500 mt-1">
                Define column widths using ratios (e.g., "1:1" for equal, "1:2" for 1/3 and 2/3, "2:1:1" for three columns)
              </p>
            </div>
          </>
        )}

        {/* Column Component */}
        {componentType === 'column' && (
          <>
            <div className="text-sm text-gray-500 mb-4">
              Column width is controlled by the parent Flex Container's distribution setting.
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="columnHasPadding"
                checked={props.columnHasPadding !== false}
                onChange={(e) => onUpdate({ columnHasPadding: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="columnHasPadding" className="cursor-pointer">
                Has Padding (p-6)
              </Label>
            </div>
          </>
        )}

        {/* WebsiteHeaderBar Component */}
        {componentType === 'websiteHeaderBar' && (
          <>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="headerIsSticky"
                checked={props.isSticky === true}
                onChange={(e) => onUpdate({ isSticky: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="headerIsSticky" className="cursor-pointer">
                Sticky Header
              </Label>
            </div>
            <div>
              <Label htmlFor="headerTitle">Title Text</Label>
              <Input
                id="headerTitle"
                value={props.headerTitle || ''}
                onChange={(e) => onUpdate({ headerTitle: e.target.value })}
                placeholder="Enter header title"
              />
            </div>
            <div>
              <Label htmlFor="headerFontFamily">Title Font Family</Label>
              <Input
                id="headerFontFamily"
                value={props.headerFontFamily || ''}
                onChange={(e) => onUpdate({ headerFontFamily: e.target.value })}
                placeholder="Arial, sans-serif"
              />
              <p className="text-xs text-gray-500 mt-1">
                CSS font-family value (e.g., "Arial", "Times New Roman", "Georgia, serif")
              </p>
            </div>
            <div>
              <Label htmlFor="headerTitleColor">Title Text Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="headerTitleColorPicker"
                  value={props.headerTitleColor && /^#[0-9A-Fa-f]{6}$/.test(props.headerTitleColor) 
                    ? props.headerTitleColor 
                    : '#000000'}
                  onChange={(e) => onUpdate({ headerTitleColor: e.target.value })}
                  className="h-10 w-16 cursor-pointer border border-gray-300 rounded"
                />
                <Input
                  id="headerTitleColor"
                  value={props.headerTitleColor || ''}
                  onChange={(e) => onUpdate({ headerTitleColor: e.target.value })}
                  placeholder="#000000 or rgb(0, 0, 0)"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                CSS color value (hex, rgb, or color name)
              </p>
            </div>
            <div>
              <Label htmlFor="headerBackgroundColor">Toolbar Background Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="headerBackgroundColorPicker"
                  value={props.headerBackgroundColor && /^#[0-9A-Fa-f]{6}$/.test(props.headerBackgroundColor) 
                    ? props.headerBackgroundColor 
                    : '#ffffff'}
                  onChange={(e) => onUpdate({ headerBackgroundColor: e.target.value })}
                  className="h-10 w-16 cursor-pointer border border-gray-300 rounded"
                />
                <Input
                  id="headerBackgroundColor"
                  value={props.headerBackgroundColor || ''}
                  onChange={(e) => onUpdate({ headerBackgroundColor: e.target.value })}
                  placeholder="#ffffff or rgb(255, 255, 255)"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                CSS color value (hex, rgb, or color name)
              </p>
            </div>
            <div>
              <Label htmlFor="headerIconUrl">Icon/Image URL</Label>
              <Input
                id="headerIconUrl"
                value={props.headerIconUrl || ''}
                onChange={(e) => onUpdate({ headerIconUrl: e.target.value })}
                placeholder="/assets/images/history.png or https://example.com/icon.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use /assets/images/history.png for local images, or full URL for external images
              </p>
            </div>
            <div>
              <Label htmlFor="headerIconAlt">Icon Alt Text</Label>
              <Input
                id="headerIconAlt"
                value={props.headerIconAlt || ''}
                onChange={(e) => onUpdate({ headerIconAlt: e.target.value })}
                placeholder="Header icon"
              />
            </div>
          </>
        )}

        {/* FakeURLBar Component */}
        {componentType === 'fakeURLBar' && (
          <>
            <div>
              <Label htmlFor="urlText">URL Text</Label>
              <Input
                id="urlText"
                value={props.urlText || 'https://example.com'}
                onChange={(e) => onUpdate({ urlText: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="visible"
                checked={props.visible !== false}
                onChange={(e) => onUpdate({ visible: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="visible" className="cursor-pointer">
                Show URL Bar
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urlBarIsSticky"
                checked={props.isSticky === true}
                onChange={(e) => onUpdate({ isSticky: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="urlBarIsSticky" className="cursor-pointer">
                Sticky URL Bar
              </Label>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
