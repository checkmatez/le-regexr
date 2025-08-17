import { REGEX_PATTERNS } from '../../data/stash-macros';
import type { CustomSearchSectionProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

export function CustomSearchSection({
  customRegex,
  textSearch,
  onCustomRegexChange,
  onTextSearchChange,
}: CustomSearchSectionProps) {
  return (
    <SectionContainer className="mb-8">
      <SectionHeader>Custom Search</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Regex Pattern</label>
          <input
            type="text"
            value={customRegex}
            onChange={(e) => onCustomRegexChange(e.target.value)}
            placeholder="/pattern/"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none"
          />
          <div className="mt-2">
            <select
              onChange={(e) => onCustomRegexChange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value="">Common patterns...</option>
              {REGEX_PATTERNS.map((pattern) => (
                <option key={pattern.name} value={pattern.pattern}>
                  {pattern.name} - {pattern.description}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Text Search</label>
          <input
            type="text"
            value={textSearch}
            onChange={(e) => onTextSearchChange(e.target.value)}
            placeholder="Search for text in item names/stats"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
