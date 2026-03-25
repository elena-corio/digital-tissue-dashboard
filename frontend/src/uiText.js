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
  },
  cards: [
    {
      name: 'Framework',
      description: 'How the system grows and evolves',
      icon: 'dna.svg',
      bullets: [
        'Data structure',
        'Naming conventions',
        'Template & standards'
      ]
    },
    {
      name: 'Automation',
      description: 'How models and tools exchange meaning',
      icon: 'synapses.svg',
      bullets: [
        'Single source of truth',
        'Automated data flow',
        'Integrated dashboard'
      ]
    },
    {
      name: 'Monitoring',
      description: 'How the system stays healthy and responsive',
      icon: 'metabolism.png',
      bullets: [
        'KPIs & metrics',
        'Real-time feedback',
        'Data validation'
      ]
    },
    {
      name: 'Coordination',
      description: 'How different parts of the system work together',
      icon: 'network.svg',
      bullets: [
        'Decision tracking',
        'Bottleneck detection',
        'Team alignment'
      ]
    }
  ]

};

export const TABS = {
  overview:
{  title: 'Project Overview',
  subtitle: 'A quick pulse check of your project',
  statusLabel: 'Pulse Check',
  statusDescription: 'Recent activity and model updates',
  statusIcon: '💓',
  hint: '1. Move the mouse hover cells to check performance. \n 2. Click on grow phases to explore the roadmap. 3. Use the top navigation bar or the shortcuts to explore other tabs.',
},
  site: {
    title: 'Site Analysis',
    subtitle: 'A close look at the site as a holistic system',
    statusLabel: 'Body Balance',
    statusDescription: 'HB03 Plot Share - target 33%',
    statusIcon: '🧘',
    hint: '1. Toggle hyperbuildings on and off in the 3D viewer. \n 2. Move the mouse hover the site areas to highlight the corresponding building in the 3D viewer.',
  },
  building: {
    title: 'Building Viewer',
    subtitle: 'Key indicators for your project\'s growth',
    statusLabel: 'Tissue Expansion',
    statusDescription: 'GFA / 1M m² - target 100%',
    statusIcon: '🧬' ,
    hint: '1. Toggle towers on and off in the 3D viewer. \n 2. Explore key insights from data, program and structure and see the color-coded 3D visualization.',
  },
  metrics: {
    title: 'Metrics Dashboard',
    subtitle: 'A cell-level view of your project\'s health',
    statusLabel: 'Metabolic Health',
    statusDescription: 'KPIs on Target - target 100%',
    statusIcon: '🦠',
    hint: '1. Flip the Global value card to see the KPI formula. \n 2. In the KPIs Overview, select one KPI to see the corresponding charts and 3D visualization.',  
  }
};
export const KPIS = {
  sectionTitle: 'KPIs Overview',
  kpis: [
    {
      name: 'Liveability',
      metrics: [
        { name: 'greenSpaceDistance', label: 'Green Space Distance', filter: 'green_space_distance', unit: 'm' , 'formula': 'Distance to closest Green Area', 'action': 'Decrease distance from green spaces.'},
        { name: 'daylightPotential', label: 'Daylight Potential', filter: 'daylight_potential', unit: '' , 'formula': 'Window Area / Floor Area', 'action': 'Increase windows area.'}
      ]
    },
    {
      name: 'Interconnection',
      metrics: [
        { name: 'programDiversityIndex', label: 'Program Diversity Index', filter: 'program', unit: '', 'formula': '1 - (Program Frequencies / Program Units Count²)', 'action': 'Increase diversity of programs.' },
        { name: 'circulationEfficiency', label: 'Circulation Efficiency', filter: 'circulation_efficiency', unit: '', 'formula': '1 - (Circulation Area / Total Area)', 'action': 'Decrease circulation area.' }
      ]
    },
    {
      name: 'Adaptability',
      metrics: [
        { name: 'netFloorAreaRatio', label: 'Net Floor Area Ratio', filter: 'net_floor_area_ratio', unit: '' , 'formula': 'Net Floor Area / Gross Floor Area', 'action': 'Optimize net-floor-area ratio.'},
        { name: 'usableAreaRatio', label: 'Usable Area Ratio', filter: 'usable_area_ratio', unit: '', 'formula': 'Usable Area / Total Area', 'action': 'Increase usable area.' }
      ]
    },
        {
      name: 'Sustainability',
      metrics: [
        { name: 'carbonIntensity', label: 'Carbon Intensity', filter: 'carbon_intensity', unit: 'kgCO2/m2' , 'formula': 'Embodied Carbon / Gross Floor Area', 'action': 'Reduce carbon intensity.'},
        { name: 'volumeToEnvelope', label: 'Volume to Envelope', filter: 'volume_to_envelope', unit: 'm3/m2' , 'formula': 'Building Volume / Envelope Area', 'action': 'Optimize volume to envelope ratio.'}
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
  lungs: {name: 'HB01', icon: 'organ-lungs.svg', color: "var(--yellow-100)"},
  heart: {name: 'HB02', icon: 'organ-heart.svg', color: "var(--fucsia-100)"},
  spine: {name: 'HB03', icon: 'organ-spine.svg', color: "var(--light-blue-100)"},
};

export const VITALITY = {
  sectionTitle: 'Organ Vitality',
  cards: {
    body: { title: 'HB03 Plot Share', value: 0.85, goal:1, description: "Body Balance \n target 33%" },
    tissue: { title: 'GFA / 1M m²', value: 0.6, goal:1, description: "Tissue Expansion \n target 100%" },
    metabolism: { title: 'KPIs on Target', value: 7, goal:8, description: "Metabolic Health \n target 100%"},
    
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
    { label: '1', title: 'Foundations', description: 'Site Analysis · Initial Planning' },
    { label: '2', title: 'Constraints Definition', description: 'Plot Choice · KPIs & Metrics' },
    { label: '3', title: 'Design Exploration', description: 'Massing Proposals · Algorithmic Thinking' },
    { label: '4', title: 'Data Streaming', description: 'Speckle Streams · Naming Conventions' },
    { label: '5', title: 'Feedback Integration', description: 'Parametric Design · Performance Evaluation' },
    { label: '6', title: 'Neighbors Test', description: 'Teams Coordination · Environmental Analysis' },
    { label: '7', title: 'Automation', description: 'Process Optimization · Workflow Automation' },
    { label: '8', title: 'Data Visualization', description: 'Integrated Dashboards · Feedback Loops' },
    { label: '9', title: 'Final Stretch', description: 'Refine Narrative · Final Adjustments' },
  ]
};

export const UPDATES = {
  title: 'Regeneration Cycle',
  subtitle: 'Last Update',
  issueFound: 'The last update was more than 24 hours ago. Publish your latest design iteration to keep the tissue healthy.',
  allGood: 'The latest update was published recently. Keep up the good work to maintain tissue vitality!',
};

export const SITE = {
  timeline: 'Beginning 2026',
  typology: 'Hyperbuildings',
  city: 'Santiago Metropolitan Region',
  address: 'Providentia, Santiago, Chile',
  coordinates: { latitude: -33.4298, longitude: -70.6234 },
  siteArea: 85460, // in m2
  hypersArea: {hb01: 30630, hb02: 26635, hb03: 28195}, // in m2
};

export const BUILDING = {
  name: 'Hyperbuilding 03',
  towers: ['T01', 'T02', 'T03', 'T04'],}