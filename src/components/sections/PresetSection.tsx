import { SEARCH_PRESETS } from '../../data/stash-macros';
import type { PresetSectionProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

export function PresetSection({ selectedPreset, onPresetChange }: PresetSectionProps) {
  return (
    <SectionContainer className="mb-6 md:mb-8">
      <SectionHeader>Quick Presets</SectionHeader>
      <select
        value={selectedPreset || ''}
        onChange={(e) => (e.target.value ? onPresetChange(e.target.value) : null)}
        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-3 md:py-2 text-gray-100 focus:border-amber-400 focus:outline-none text-sm md:text-base"
      >
        <option value="">Select a preset...</option>
        {SEARCH_PRESETS.map((preset) => (
          <option key={preset.name} value={preset.name}>
            {preset.name} - {preset.description}
          </option>
        ))}
      </select>
    </SectionContainer>
  );
}
