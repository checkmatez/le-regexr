import type { OutputSectionProps } from '../types/component-props';

export function OutputSection({
  searchString,
  globalOperator,
  copied,
  shared,
  onCopy,
  onShare,
  onClear,
  onToggleOperator,
}: OutputSectionProps) {
  return (
    <div>
      {/* Mobile layout: Stack vertically */}
      <div className="md:hidden space-y-3">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-700 rounded border border-gray-600 p-1 flex" title="Join with">
            <button
              onClick={onToggleOperator}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                globalOperator === '&'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              title="AND - All conditions must match"
            >
              AND
            </button>
            <button
              onClick={onToggleOperator}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                globalOperator === '|'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              title="OR - Any condition can match"
            >
              OR
            </button>
          </div>
          <input
            type="text"
            value={searchString}
            readOnly
            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-xs focus:outline-none"
            placeholder="Your search string will appear here..."
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onClear}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors shadow-md cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={onShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Generate shareable link"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            {shared ? 'Linked!' : 'Share'}
          </button>
          <button
            onClick={onCopy}
            disabled={!searchString}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm font-medium transition-colors shadow-md cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Desktop layout: Single row */}
      <div className="hidden md:flex gap-2 items-center">
        <div className="bg-gray-700 rounded border border-gray-600 p-1 flex" title="Join with">
          <button
            onClick={onToggleOperator}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors cursor-pointer ${
              globalOperator === '&' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
            title="AND - All conditions must match"
          >
            AND
          </button>
          <button
            onClick={onToggleOperator}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors cursor-pointer ${
              globalOperator === '|' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
            title="OR - Any condition can match"
          >
            OR
          </button>
        </div>
        <input
          type="text"
          value={searchString}
          readOnly
          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm focus:outline-none"
          placeholder="Your search string will appear here..."
        />
        <button
          onClick={onClear}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition-colors whitespace-nowrap shadow-md cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={onShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
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
          onClick={onCopy}
          disabled={!searchString}
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-medium transition-colors whitespace-nowrap shadow-md cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
