import { Button } from '@/components/ui/button'
import { WebsiteData } from '@/types/website'
import sampleConfigsData from '@/config/sampleConfigs.json'

interface SampleConfigSelectorProps {
  onLoadTemplate: (template: WebsiteData) => void
  onResetToCustom: () => void
  isTemplateMode: boolean
}

interface SampleConfig {
  name: string
  data: WebsiteData
}

interface SampleConfigsData {
  configs: SampleConfig[]
}

const sampleConfigs: SampleConfig[] = (sampleConfigsData as SampleConfigsData).configs

export function SampleConfigSelector({
  onLoadTemplate,
  onResetToCustom,
  isTemplateMode,
}: SampleConfigSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sample Configs</h3>
        {isTemplateMode && (
          <Button variant="outline" size="sm" onClick={onResetToCustom}>
            Custom Mode
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {sampleConfigs.map((config) => (
          <Button
            key={config.name}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onLoadTemplate(config.data)}
          >
            {config.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
