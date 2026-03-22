export const HOMEPAGE = {
  title: 'A living map of<br>your project\'s cells',
  subtitle: 'Built for clarity and insights.',
  getStarted: 'Enter the tissue',
  description: 'Digital Tissue transforms complex building models into a living map — tracking system health, coordinating cells, and receiving signals in real time.',
  credits: {
    allRightsReserved: '© 2026 Digital Tissue. All rights reserved.',
    organisation: 'Institute for Advanced Architecture of Catalonia',
    seminar: 'MaCAD 25/26 - BISMC Studio',
    developers: [
      'Elena Corio','Symon Kipkemei'],
    faculty: [
      'Pablo Antuña Molina', 'Cristóbal Ignácio Burgos Sanhueza', 'Hari Krishnan',
    ],
    learnMore: 'Blog Post'
  }
};

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
        { name: 'greenSpaceDistance', label: 'Green Space Distance', filter: 'green_space_distance', value: 'health', unit: 'm' , 'action': 'Decrease distance from green spaces.'},
        { name: 'daylightPotential', label: 'Daylight Potential', filter: 'daylight_potential', value: 'risk', unit: '' , 'action': 'Increase windows area.'}
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { name: 'programDiversityIndex', label: 'Program Diversity Index', filter: 'program', value: 'health', unit: '', 'action': 'Increase diversity of programs.' },
        { name: 'circulationEfficiency', label: 'Circulation Efficiency', filter: 'circulation_efficiency', value: 'risk', unit: '', 'action': 'Decrease circulation area.' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { name: 'netFloorAreaRatio', label: 'Net Floor Area Ratio', filter: 'net_floor_area_ratio', value: 'health', unit: '' , 'action': 'Optimize net-floor-area ratio.'},
        { name: 'usableAreaRatio', label: 'Usable Area Ratio', filter: 'usable_area_ratio', value: 'risk', unit: '', 'action': 'Increase usable area.' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { name: 'carbonIntensity', label: 'Carbon Intensity', filter: 'carbon_intensity', value: 'health', unit: 'kgCO2/m2' , 'action': 'Reduce carbon intensity.'},
        { name: 'volumeToEnvelope', label: 'Volume to Envelope', filter: 'volume_to_envelope', value: 'risk', unit: 'm3/m2' , 'action': 'Optimize volume to envelope ratio.'}
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
  avatarPlaceholder: 'CN',
  userName: 'Chuck Norris',
  userRole: 'Architect',
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