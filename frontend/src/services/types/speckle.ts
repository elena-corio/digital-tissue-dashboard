// Metric with value and benchmark
export interface Metric {
  value: number
  benchmark: number
}

// Performance metrics structure
export interface Metrics {
  carbon_efficiency: Metric
  green_space_index: Metric
  usable_area_ratio: Metric
  daylight_potential: Metric
  net_floor_area_ratio: Metric
  circulation_efficiency: Metric
  program_diversity_index: Metric
  volume_to_envelope_ratio: Metric
}

// Level element
export interface LevelElement {
  id: string
  name: string
  x?: number
  y?: number
  z?: number
  units?: string
  metrics: Metrics
  properties?: {
    level: number
    cluster_id: string
  }
  speckle_type?: string
}

// Cluster element
export interface ClusterElement {
  id: string
  name: string
  metrics: Metrics
  elements: LevelElement[]
}

// Root data structure
export interface RootData {
  id: string
  name: string
  metrics: Metrics
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
  data: RootData
}