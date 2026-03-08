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
        { name: 'greenSpaceDistance', label: 'Green Space Distance', value: 'health', unit: 'm' , 'action': 'The distance of residential units to green space needs to be decreased to meet the benchmark.'},
        { name: 'daylightPotential', label: 'Daylight Potential', value: 'risk', unit: '' , 'action': 'The windows area to be increased to meet the benchmark.'}
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { name: 'programDiversity', label: 'Program Diversity', value: 'health', unit: '', 'action': 'The diversity of programs needs to be increased to meet the benchmark.' },
        { name: 'circulationEfficiency', label: 'Circulation Efficiency', value: 'risk', unit: '', 'action': 'The circulation area needs to be decreased to meet the benchmark.' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { name: 'netFloorAreaRatio', label: 'Net Floor Area Ratio', value: 'health', unit: '' , 'action': 'The net-floor-area ratio needs to be optimized to meet the benchmark.'},
        { name: 'usableAreaRatio', label: 'Usable Area Ratio', value: 'risk', unit: '', 'action': 'The usable area needs to be increased to meet the benchmark.' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { name: 'carbonIntensity', label: 'Carbon Intensity', value: 'health', unit: 'kgCO2/m2' , 'action': 'The carbon intensity needs to be reduced to meet the benchmark.'},
        { name: 'volumeToSurface', label: 'Volume to Surface', value: 'risk', unit: 'm3/m2' , 'action': 'The volume to surface ratio needs to be optimized to meet the benchmark.'}
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