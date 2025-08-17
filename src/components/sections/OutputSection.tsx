import type { OutputSectionProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

export function OutputSection({ searchString, copied, onCopy, onClear }: OutputSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Generated Search String</SectionHeader>
      <div className="space-y-4">
        <textarea
          value={searchString}
          readOnly
          className="w-full h-24 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm resize-none"
          placeholder="Your search string will appear here..."
        />
        <div className="flex space-x-4">
          <button
            onClick={onCopy}
            disabled={!searchString}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-medium transition-colors"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={onClear}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
