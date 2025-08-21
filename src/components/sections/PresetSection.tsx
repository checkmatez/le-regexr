import { SEARCH_PRESETS } from '../../data/stash-macros';
import type { SearchState } from '../../types/stash-search';
import { getStateFromURL } from '../../utils/url-state';
import { SectionContainer, SectionHeader } from '../ui';

interface PresetSectionProps {
  currentSearchString: string;
  onPresetSelect: (state: SearchState) => void;
}

export function PresetSection({ currentSearchString, onPresetSelect }: PresetSectionProps) {
  const handlePresetClick = (presetLink: string, e: React.MouseEvent) => {
    e.preventDefault();

    // Extract query parameter from preset link
    const url = new URL(presetLink, window.location.origin);
    const searchValue = url.searchParams.get('q') || '';

    if (searchValue) {
      // Parse the search query and update state
      const newState = getStateFromURL(`?q=${encodeURIComponent(searchValue)}`);
      onPresetSelect(newState);

      // Update URL without full page reload
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('q', searchValue);
      window.history.pushState({}, '', newUrl.toString());
    }
  };

  const isPresetActive = (presetLink: string) => {
    const url = new URL(presetLink, window.location.origin);
    const presetQuery = url.searchParams.get('q') || '';
    // Simple comparison - could be improved for more complex matching
    return presetQuery === currentSearchString;
  };

  return (
    <SectionContainer className="mb-6 md:mb-8">
      <SectionHeader>Quick Examples</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {SEARCH_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={(e) => handlePresetClick(preset.link, e)}
            title={preset.description}
            type="button"
            className={`block w-full px-3 py-3 md:py-2 text-sm md:text-base rounded border transition-colors duration-200 cursor-pointer text-center ${
              isPresetActive(preset.link)
                ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                : 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600 hover:border-gray-500'
            }`}
          >
            <span className="font-medium">{preset.name}</span>
          </button>
        ))}
      </div>
    </SectionContainer>
  );
}
