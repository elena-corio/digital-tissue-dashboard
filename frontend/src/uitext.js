export const TABS = {
  overview:
{  title: 'Welcome to Digital Tissue',
  subtitle: 'A quick pulse check of your project',
  statusLabel: 'Pulse Check',
  statusDescription: 'Organ Vitality Avg',
  statusIcon: '💓'},
  site: {
    title: 'Site Analysis',
    subtitle: 'Key insights and metrics about your site',
    statusLabel: 'Body Balance',
    statusDescription: 'Floor Area Ratio',
    statusIcon: '🧘' 
  },
  project: {
    title: 'Project Overview',
    subtitle: 'Current status and recent updates of your project',
    statusLabel: 'Tissue Expansion',
    statusDescription: 'Gross Floor Area',
    statusIcon: '🧬' 
  },
  metrics: {
    title: 'Metrics Dashboard',
    subtitle: 'Detailed performance indicators and KPIs',
    statusLabel: 'Metabolic Health',
    statusDescription: 'KPIs on Target',
    statusIcon: '🦠'
  }
};
export const KPIS = {
  sectionTitle: 'KPIs Overview',
  kpis: [
    {
      name: 'Liveability',
      metrics: [
        { name: 'greenSpaceDistance', label: 'Green Space Distance', value: 'health' },
        { name: 'daylightPotential', label: 'Daylight Potential', value: 'risk' }
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { name: 'programDiversity', label: 'Program Diversity', value: 'health'},
        { name: 'circulationEfficiency', label: 'Circulation Efficiency', value: 'risk' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { name: 'netFloorAreaRatio', label: 'Net Floor Area Ratio', value: 'health' },
        { name: 'usableAreaRatio', label: 'Usable Area Ratio', value: 'risk' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { name: 'carbonIntensity', label: 'Carbon Intensity', value: 'health' },
        { name: 'volumeToSurface', label: 'Volume to Surface', value: 'risk' }
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
    body: { title: 'Body Balance', value: 0.85, goal:1, description: "Floor Area Ratio" },
    tissue: { title: 'Tissue Expansion', value: 0.6, goal:1, description: "Gross Floor Area" },
    metabolism: { title: 'Metabolic Health', value: 7, goal:8, description: "KPIs on Target"},
    
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