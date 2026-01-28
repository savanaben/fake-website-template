import { Button } from '@/components/ui/button'
import { WebsiteData } from '@/types/website'

interface TemplateSelectorProps {
  onLoadTemplate: (template: WebsiteData) => void
  onResetToCustom: () => void
  isTemplateMode: boolean
}

const templates: Array<{ name: string; data: WebsiteData }> = [
  {
    name: 'Article Layout',
    data: {
      tabs: [
        {
          id: 'tab-1',
          label: 'Article',
          content: [
            {
              id: 'title-1',
              type: 'title',
              props: { title: 'Article Title', logoUrl: '', logoAlt: '' },
            },
            {
              id: 'para-1',
              type: 'paragraph',
              props: { content: 'This is a sample article paragraph.' },
            },
          ],
        },
      ],
      activeTabId: 'tab-1',
    },
  },
  {
    name: 'Two Column Layout',
    data: {
      tabs: [
        {
          id: 'tab-1',
          label: 'Two Column',
          content: [
            {
              id: 'flex-1',
              type: 'flexContainer',
              props: { gap: 'gap-4' },
              children: [
                {
                  id: 'col-1',
                  type: 'column',
                  props: {},
                  children: [
                    {
                      id: 'para-1',
                      type: 'paragraph',
                      props: { content: 'Left column content' },
                    },
                  ],
                },
                {
                  id: 'col-2',
                  type: 'column',
                  props: {},
                  children: [
                    {
                      id: 'img-1',
                      type: 'image',
                      props: { src: '', alt: 'Right column image' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      activeTabId: 'tab-1',
    },
  },
]

export function TemplateSelector({
  onLoadTemplate,
  onResetToCustom,
  isTemplateMode,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Templates</h3>
        {isTemplateMode && (
          <Button variant="outline" size="sm" onClick={onResetToCustom}>
            Custom Mode
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {templates.map((template) => (
          <Button
            key={template.name}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onLoadTemplate(template.data)}
          >
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
