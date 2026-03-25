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
  statusDescription: 'Average Organ Vitality',
  statusIcon: '💓'},
  site: {
    title: 'Site Analysis',
    subtitle: 'A close look at the site as a holistic system',
    statusLabel: 'Body Balance',
    statusDescription: 'How evenly the site area is distributed among hypers',
    statusIcon: '🧘' 
  },
  project: {
    title: 'Building Viewer',
    subtitle: 'Key indicators for your project\'s growth',
    statusLabel: 'Tissue Expansion',
    statusDescription: 'GFA compared to 1.000.000 m² target',
    statusIcon: '🧬' 
  },
  metrics: {
    title: 'Metrics Dashboard',
    subtitle: 'A cell-level view of your project\'s health',
    statusLabel: 'Metabolic Health',
    statusDescription: 'How many KPIs are on target',
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
  lungs: {name: 'HB01', icon: 'organ-lungs.svg', color: "var(--yellow-100)"},
  heart: {name: 'HB02', icon: 'organ-heart.svg', color: "var(--fucsia-100)"},
  spine: {name: 'HB03', icon: 'organ-spine.svg', color: "var(--light-blue-100)"},
};

export const VITALITY = {
  sectionTitle: 'Organ Vitality',
  cards: {
    body: { title: 'HB03 Plot Share', value: 0.85, goal:1, description: "Body Balance \n target 33%" },
    tissue: { title: 'GFA / 1.000.000 m²', value: 0.6, goal:1, description: "Tissue Expansion \n target 100%" },
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