// Performance metrics structure
export interface Metrics {
    gross_floor_area: number
  carbon_intensity: number
  green_space_distance: number
  usable_area_ratio: number
  daylight_potential: number
  net_floor_area_ratio: number
  circulation_efficiency: number
  program_diversity_index: number
  volume_to_envelope: number
}

interface ClusterProperties extends Metrics {
    cluster_id: string
}

interface LevelProperties extends Metrics {
    level: number
    cluster_id: string
}
// Level element
export interface LevelElement {
  id: string
  name: string
  x?: number
  y?: number
  z?: number
  units?: string
  properties?: LevelProperties
  speckle_type?: string
}

// Cluster element
export interface ClusterElement {
  id: string
  name: string
  properties?: ClusterProperties
  elements: LevelElement[]
}

// Root data structure
export interface Project {
  id: string
  name: string
  properties?: Metrics
  elements: ClusterElement[]
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
  data: Project
}