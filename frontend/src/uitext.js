export const DASHBOARD = {
  title: 'Welcome to Digital Tissue',
  subtitle: 'A quick pulse check of your project',
};
// All UI text for digital.tissue dashboard
// Export as named constants or objects
export const NODE_CARD = {
  title: 'KPI Overview',
  kpis: [
    {
      name: 'Liveability',
      metrics: [
        { label: 'Green Space Index', value: '+10%', type: 'success' },
        { label: 'Daylight Factor', value: '-5%', type: 'error' }
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { label: 'Program Diversity', value: '+12%', type: 'success' },
        { label: 'Circulation Efficiency', value: '-8%', type: 'error' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { label: 'Net-Floor-Area Ratio', value: '+22%', type: 'success' },
        { label: 'Occupancy Efficiency', value: '-3%', type: 'error' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { label: 'Carbon Efficiency', value: '+22%', type: 'success' },
        { label: 'Form Factor', value: '-3%', type: 'error' }
      ]
    }
  ]
};

export const HEADER = {
  title: 'digital.tissue',
  nav: ['Overview', 'Site', 'Project', 'Metrics'],
  avatarPlaceholder: 'EC',
  userName: 'Elena Corio',
  userRole: 'Software Engineer',
  dropdown: ['Sign out'],
};

export const ORGAN_NAMES = ['Heart', 'Lungs', 'Tissue'];

export const VITALITY = {
  sectionTitle: 'Vitality',
  cards: {
    metabolic: 'Metabolic Stability',
    regeneration: 'Regeneration Cycle',
    expansion: 'Tissue Expansion',
  },
};

export const TEAM = {
  title: 'Team Members',
  members: [
    { name: 'Elena Corio', role: 'Software Engineer' },
    { name: 'Symon Kipkemei', role: 'Software Engineer' },
    { name: 'Rania Chihaoui', role: 'Facade Expert' },
    { name: 'Eleni T. Maglari', role: 'Structural Engineer' },
    { name: 'Eduardo Martinez Toribio', role: 'BIM Specialist' },
    { name: 'Andrea Cutroni', role: 'Computational Designer' },
    { name: 'Tue Minh (Chloe)', role: 'Architect' },
    { name: 'Eva Vasileska', role: 'Architect' }
  ],
};

export const GROWTH_PHASES = {
  title: 'Growth Phases',
  phases: [
    { label: '1', title: 'Foundations', description: 'Site Research · Initial Planning' },
    { label: '2', title: 'Constraints Definition', description: 'Plot Choice · KPIs & Metrics' },
    { label: '3', title: 'Design Exploration', description: 'Massing Proposals· Algorithmic Thinking' },
    { label: '4', title: 'Data Streaming', description: 'Speckle Streams · Speckle Framework' },
    { label: '5', title: 'Feedback Integration', description: 'Iterative Design · Agile Development ' },
    { label: '6', title: 'Neighbors Test', description: 'Coordination · Sight Analysis' },
    { label: '7', title: 'Automation', description: 'Process Optimization · Workflow Automation' },
    { label: '8', title: 'Data Visualization', description: 'Interactive Dashboards · Insights' },
    { label: '9', title: 'Final Stretch', description: 'Refine Narrative · Final Adjustments' },
  ]
};

export const ISSUES = {
  found: 'Issue Found',
  none: 'No issues detected',
};

export const PULSE = {
  label: 'Pulse',
  value: 78,
  status: 'Stable',
};
