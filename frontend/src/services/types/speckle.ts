// Performance metrics (values are strings from Speckle)
export interface PerformanceMetrics {
  daylight_potential: string
  green_space_index: string
  program_diversity_index: string
  circulation_efficiency: string
  occupancy_efficiency: string
  net_floor_area_ratio: string
  envelope_efficiency: string
  carbon_efficiency: string
}

// Level properties within a tower
export interface LevelProperties {
  [levelName: string]: PerformanceMetrics
}

// Tower structure with levels and overall properties
export interface TowerData {
  properties: PerformanceMetrics
  [levelName: string]: PerformanceMetrics | LevelProperties
}

// Root properties structure from Speckle object data
export interface RootProperties {
  'tower-a'?: TowerData
  'tower-b'?: TowerData
  'tower-c'?: TowerData
  'tower-d'?: TowerData
  'connections'?: TowerData
  'overall-properties'?: PerformanceMetrics
}

// Step 1: Latest version response
export interface LatestVersionResponse {
  project: {
    model: {
      id: string
      name: string
      versions: {
        items: Array<{
          id: string
          referencedObject: string
          createdAt: string
        }>
      }
    }
  }
}

// Step 2: Root object response
export interface RootObjectResponse {
  project: {
    object: {
      id: string
      data: any // Can be string (JSON) or object
    }
  }
}

// Combined data structure for the composable
export interface SpeckleModelData {
  modelId: string
  modelName: string
  versionId: string
  objectId: string
  createdAt: string
  properties: RootProperties
}

// Helper type for tower keys
export type TowerKey = 'tower-a' | 'tower-b' | 'tower-c' | 'tower-d' | 'connections'