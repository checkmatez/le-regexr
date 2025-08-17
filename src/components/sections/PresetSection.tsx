import { SEARCH_PRESETS } from '../../data/stash-macros';
import type { PresetSectionProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

export function PresetSection({ selectedPreset }: PresetSectionProps) {
  return (
    <SectionContainer className="mb-6 md:mb-8">
      <SectionHeader>Quick Presets</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {SEARCH_PRESETS.map((preset) => (
          <a
            key={preset.name}
            href={preset.link}
            title={preset.description}
            className={`block w-full px-3 py-3 md:py-2 text-sm md:text-base rounded border transition-colors duration-200 cursor-pointer text-center ${
              selectedPreset === preset.name
                ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                : 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600 hover:border-gray-500'
            }`}
          >
            <span className="font-medium">{preset.name}</span>
          </a>
        ))}
      </div>
    </SectionContainer>
  );
}
