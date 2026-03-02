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
        { label: 'Green Space Index', value: '+5%', type: 'success' },
        { label: 'Daylight Factor', value: '+6%', type: 'error' }
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { label: 'Program Diversity', value: '-2%', type: 'success' },
        { label: 'Circulation Efficiency', value: '+4%', type: 'error' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { label: 'Net Floor Area Ratio', value: '+8%', type: 'success' },
        { label: 'Usable Area Ratio', value: '+3%', type: 'error' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { label: 'Carbon Efficiency', value: '+10%', type: 'success' },
        { label: 'Volume to Surface Ratio', value: '+2%', type: 'error' }
      ]
    }
  ]
};

export const STATUS = {
  overview: {label: 'Pulse', description: 'Organ Vitality Avg'},
};

export const HEADER = {
  title: 'digital.tissue',
  nav: ['Overview', 'Site', 'Project', 'Metrics'],
  avatarPlaceholder: 'EC',
  userName: 'Elena Corio',
  userRole: 'Software Engineer',
  dropdown: ['Sign out'],
};

export const ORGANS = {
  heart: {name: 'Heart', icon: 'organ-heart.svg', color: "var(--fucsia-100)"},
  lungs: {name: 'Lungs', icon: 'organ-lungs.svg', color: "var(--yellow-100)"},
  spine: {name: 'Spine', icon: 'organ-spine.svg', color: "var(--light-blue-100)"},
};

export const VITALITY = {
  sectionTitle: 'Organ Vitality',
  cards: {
    metabolism: { title: 'Metabolic Stability', value: 7, goal:8, description: "KPIs on Target"},
    body: { title: 'Body Coordination', value: 0.85, goal:1, description: "Max Height" },
    tissue: { title: 'Tissue Expansion', value: 0.6, goal:1, description: "Target Area" },
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

export const UPDATES = {
  title: 'Regeneration Cycle',
  lastUpdate: '3/1/2026 7:26:54 PM',
  issueFound: 'The last update was more than 24 hours ago. Publish your latest design iteration to keep the tissue healthy.',
  allGood: 'The latest update was published recently. Keep up the good work to maintain tissue vitality!',
};

export const PULSE = {
  label: 'Pulse',
  value: 78,
  status: 'Stable',
};
