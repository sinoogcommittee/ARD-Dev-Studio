// Maps category names to colour bands and short labels for typographic card treatment
export const CATEGORY_META = {
  'Healthcare & business operations': {
    bandClass: 'cat-band-healthcare',
    shortLabel: 'Healthcare & Business',
    abbr: 'HB',
    color: '#c0392b',
  },
  'Civic, government & tourism': {
    bandClass: 'cat-band-civic',
    shortLabel: 'Civic & Tourism',
    abbr: 'CT',
    color: '#2d6a4f',
  },
  'Events, registration & scoring': {
    bandClass: 'cat-band-events',
    shortLabel: 'Events & Scoring',
    abbr: 'ES',
    color: '#6b4fa0',
  },
  'Education & institutional systems': {
    bandClass: 'cat-band-education',
    shortLabel: 'Education & Institutions',
    abbr: 'ED',
    color: '#1e5b8a',
  },
};

export function getCategoryMeta(category) {
  return CATEGORY_META[category] ?? { bandClass: '', shortLabel: category, abbr: '?', color: '#888' };
}
