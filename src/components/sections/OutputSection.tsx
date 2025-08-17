import type { OutputSectionProps } from '../types/component-props';

export function OutputSection({ searchString, copied, onCopy, onClear }: OutputSectionProps) {
  return (
    <div className="sticky top-0 z-10 bg-gray-800 rounded-lg p-4 mb-8 shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-amber-400 mb-3">Generated Search String</h3>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={searchString}
          readOnly
          className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm"
          placeholder="Your search string will appear here..."
        />
        <button
          onClick={onCopy}
          disabled={!searchString}
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-medium transition-colors whitespace-nowrap"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={onClear}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
