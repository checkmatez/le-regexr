import { REGEX_PATTERNS } from '../../data/stash-macros';
import type { CustomSearchSectionProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

export function CustomSearchSection({
  regexPatterns,
  addRegexPattern,
  updateRegexPattern,
  removeRegexPattern,
  toggleCommonPattern,
}: CustomSearchSectionProps) {
  // Check if a common pattern is currently active
  const isPatternActive = (pattern: string) => {
    return regexPatterns.some((p) => p.pattern === pattern);
  };

  return (
    <SectionContainer className="mb-8">
      <SectionHeader>Custom Search</SectionHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Common patterns */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Common Patterns</label>
          <div className="flex flex-wrap gap-2">
            {REGEX_PATTERNS.map((pattern) => {
              const isActive = isPatternActive(pattern.pattern);
              return (
                <button
                  key={pattern.name}
                  onClick={() => toggleCommonPattern(pattern.pattern)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-gray-900 hover:bg-amber-500'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                  }`}
                  title={pattern.description}
                >
                  {pattern.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: Regex patterns list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">Regex Patterns</label>
            <button
              onClick={() => addRegexPattern()}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors"
            >
              Add Pattern
            </button>
          </div>
          <div className="space-y-2">
            {regexPatterns.map((regex, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={regex.pattern}
                  onChange={(e) => updateRegexPattern(index, e.target.value)}
                  placeholder="Enter regex pattern"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none text-sm"
                />
                {regexPatterns.length > 1 && (
                  <button
                    onClick={() => removeRegexPattern(index)}
                    className="px-2 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-500 min-w-[32px] text-center"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Patterns are automatically enabled when not empty. Slashes (/) are added automatically
            in the search string.
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
