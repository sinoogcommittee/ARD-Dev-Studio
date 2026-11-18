// Category metadata mapping for dark editorial styling & luminous category badges
export const CATEGORY_META = {
  'Healthcare & business operations': {
    badgeClass: 'cat-badge-healthcare',
    shortLabel: 'Healthcare & Business',
    abbr: 'HB',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.15)',
    borderHover: 'rgba(52, 211, 153, 0.4)',
  },
  'Civic, government & tourism': {
    badgeClass: 'cat-badge-civic',
    shortLabel: 'Civic & Tourism',
    abbr: 'CT',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    borderHover: 'rgba(56, 189, 248, 0.4)',
  },
  'Events, registration & scoring': {
    badgeClass: 'cat-badge-events',
    shortLabel: 'Events & Scoring',
    abbr: 'ES',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.15)',
    borderHover: 'rgba(192, 132, 252, 0.4)',
  },
  'Education & institutional systems': {
    badgeClass: 'cat-badge-education',
    shortLabel: 'Education & Systems',
    abbr: 'ED',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.15)',
    borderHover: 'rgba(251, 191, 36, 0.4)',
  },
};

export function getCategoryMeta(category) {
  return CATEGORY_META[category] ?? {
    badgeClass: 'text-neutral-300 bg-neutral-800 border-neutral-700',
    shortLabel: category,
    abbr: 'SYS',
    accentColor: '#D6AD63',
    glowColor: 'rgba(214, 173, 99, 0.15)',
    borderHover: 'rgba(214, 173, 99, 0.4)',
  };
}
