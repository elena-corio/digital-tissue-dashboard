// All UI text for digital.tissue dashboard
// Export as named constants or objects

export const HEADER = {
  title: 'digital.tissue',
  nav: ['Dashboard', 'Site', 'Project', 'Metrics'],
};

export const ORGAN_NAMES = ['Heart', 'Lungs', 'Tissue'];

export const VITALITY = {
  sectionTitle: 'Digital Tissue Vitality',
  cards: {
    metabolic: 'Metabolic Stability',
    regeneration: 'Regeneration Cycle',
    expansion: 'Tissue Expansion',
  },
};

export const TEAM = {
  title: 'Team Members',
  members: [], // Fill with team data
};

export const GROWTH_CYCLES = {
  title: 'Growth Cycles',
  labels: Array.from({length: 10}, (_, i) => `W${(i+1).toString().padStart(2, '0')}`),
};

export const ISSUES = {
  found: 'Issue Found',
  none: 'No issues detected',
};
