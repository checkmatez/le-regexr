import type { SearchState } from '../types/stash-search';
import { parseSearchString } from './search-parser';

/**
 * Get current state from URL query parameter
 */
export function getStateFromURL(fallback: SearchState): SearchState {
  if (typeof window === 'undefined') return fallback;

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');

  if (searchQuery) {
    const decoded = decodeURIComponent(searchQuery);
    return parseSearchString(decoded, fallback);
  }

  return fallback;
}

/**
 * Update URL with current search string
 */
export function updateURL(searchString: string): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);

  if (searchString.trim()) {
    url.searchParams.set('q', searchString);
  } else {
    url.searchParams.delete('q');
  }

  // Use replaceState to avoid creating history entries on every change
  window.history.replaceState(null, '', url.toString());
}

/**
 * Generate shareable link with current search string
 */
export function generateShareableLink(searchString: string): string {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.href);

  if (searchString.trim()) {
    url.searchParams.set('q', searchString);
    return url.toString();
  }

  // Return clean URL if no search string
  url.searchParams.delete('q');
  return url.toString();
}

/**
 * Clear search string from URL (return to clean URL)
 */
export function clearURLState(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete('q');
  window.history.replaceState(null, '', url.toString());
}
