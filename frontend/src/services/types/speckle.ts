// Base properties shared across all hierarchy levels
export interface PerformanceMetrics {
  daylight_potential: number
  green_space_index: number
  program_diversity_index: number
  circulation_efficiency: number
  occupancy_efficiency: number
  net_floor_area_ratio: number
  envelope_efficiency: number
  carbon_efficiency: number
}

// Object-level specific properties
export interface ObjectGeometry {
  area: number
  volume: number
  height: number
  width: number
  length: number
}

// Base entity with id and name
export interface SpeckleEntity {
  id: string
  name: string
}

// Object within a level
export interface SpeckleObject extends SpeckleEntity {
  type: string
  properties: PerformanceMetrics & ObjectGeometry
}

// Level within a tower
export interface SpeckleLevel extends SpeckleEntity {
  properties: PerformanceMetrics
  objects: SpeckleObject[]
}

// Tower within a model
export interface SpeckleTower extends SpeckleEntity {
  levels: SpeckleLevel[]
}

// Model structure
export interface SpeckleModel extends SpeckleEntity {
  properties: PerformanceMetrics
  towers: {
    tower_a?: SpeckleTower
    tower_b?: SpeckleTower
    tower_c?: SpeckleTower
    tower_d?: SpeckleTower
  }
}

// Root query response
export interface SpeckleModelData {
  project: {
    model: SpeckleModel
  }
}

// Helper type for accessing any tower by key
export type TowerKey = 'tower_a' | 'tower_b' | 'tower_c' | 'tower_d'