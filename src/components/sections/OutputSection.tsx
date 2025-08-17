import type { OutputSectionProps } from '../types/component-props';

export function OutputSection({
  searchString,
  copied,
  shared,
  onCopy,
  onShare,
  onClear,
}: OutputSectionProps) {
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
          onClick={onShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1"
          title="Generate shareable link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          {shared ? 'Link Copied!' : 'Share'}
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
