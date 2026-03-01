# Speckle Integration Service Layer

This directory contains the service layer for integrating Speckle GraphQL data into the Vue frontend using a **two-step query approach**.

## Directory Structure

```
services/
├── speckle/
│   ├── client.ts          # GraphQL client configuration
│   └── queries.ts         # Two-step GraphQL queries
├── config/
│   └── speckle.config.ts  # Speckle server configuration
├── composables/
│   └── useSpeckleData.ts  # Vue composable with two-step fetch logic
├── types/
│   └── speckle.ts         # TypeScript type definitions
└── example/
    └── vitalityCard.vue   # Example component usage
```

## Two-Step Query Architecture

### Step 1: Get Latest Version
Fetches the most recent model version and its referenced object ID.

**Query**: `GET_LATEST_VERSION`
```graphql
query GetLatestModelVersion($projectId: String!, $modelId: String!) {
  project(id: $projectId) {
    model(id: $modelId) {
      versions(limit: 1) {
        items {
          id
          referencedObject
          createdAt
        }
      }
    }
  }
}
```

**Implementation**: Uses `useQuery` with paused execution.

### Step 2: Get Root Object Data
Uses the `referencedObject` ID from Step 1 to fetch the actual model data with properties.

**Query**: `GET_ROOT_OBJECT`
```graphql
query GetRootObject($projectId: String!, $objectId: String!) {
  project(id: $projectId) {
    object(id: $objectId) {
      id
      speckleType
      data
    }
  }
}
```

**Implementation**: Uses `speckleClient.query()` directly instead of `useQuery`.

⚠️ **Important**: The second query uses the urql client directly because `useQuery`'s `executeQuery` doesn't properly handle dynamic variables. Variables set during `useQuery` setup are bound and cannot be overridden at execution time.

```typescript
// ❌ This doesn't work - objectId stays empty
const { executeQuery } = useQuery({
  query: GET_ROOT_OBJECT,
  variables: { projectId, objectId: '' },
  pause: true
})
await executeQuery({ projectId, objectId: dynamicId }) // Ignored!

// ✅ This works - fresh variables on each call
const result = await speckleClient.query(
  GET_ROOT_OBJECT,
  { projectId, objectId: dynamicId }
).toPromise()
```

The `data.properties` field contains the nested structure with tower, level, and overall metrics.

## Setup

1. **Install dependencies** (if not already installed):
   ```bash
   npm install @urql/vue graphql
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Speckle token: `VITE_SPECKLE_TOKEN=your-token-here`

3. **Update configuration**:
   - Edit `config/speckle.config.ts` with your project and model IDs

## Usage

### Basic Usage in Components

```vue
<script setup lang="ts">
import { useSpeckleData } from '@/services/composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">
    <!-- Model metadata -->
    <h2>{{ data.modelName }}</h2>
    <p>Version: {{ data.versionId }}</p>
    <p>Updated: {{ new Date(data.createdAt).toLocaleString() }}</p>
    
    <!-- Overall properties -->
    <div v-if="data.properties['overall-properties']">
      <h3>Overall Metrics</h3>
      <p>Daylight: {{ data.properties['overall-properties'].daylight_potential }}</p>
      <p>Carbon: {{ data.properties['overall-properties'].carbon_efficiency }}</p>
    </div>

    <!-- Tower A with levels -->
    <div v-if="data.properties['tower-a']">
      <h3>Tower A</h3>
      <p>Overall: {{ data.properties['tower-a'].properties.daylight_potential }}</p>
      
      <!-- Level 1 -->
      <div v-if="data.properties['tower-a']['level-1']">
        <h4>Level 1</h4>
        <p>Green Space: {{ data.properties['tower-a']['level-1'].green_space_index }}</p>
      </div>
    </div>

    <button @click="refresh">Refresh</button>
  </div>
</template>
```

### Accessing Data Programmatically

```typescript
import { useSpeckleData } from '@/services/composables/useSpeckleData'
import type { TowerKey } from '@/services/types/speckle'

const { data } = useSpeckleData()

// Access overall properties
const overallMetrics = data.value?.properties['overall-properties']
console.log(overallMetrics?.carbon_efficiency)

// Access specific tower
const towerA = data.value?.properties['tower-a']
console.log(towerA?.properties.daylight_potential)

// Access specific level in tower
const towerALevel1 = data.value?.properties['tower-a']?.['level-1']
console.log(towerALevel1?.circulation_efficiency)

// Loop through all towers
const towers: TowerKey[] = ['tower-a', 'tower-b', 'tower-c', 'tower-d', 'connections']
towers.forEach(key => {
  const tower = data.value?.properties[key]
  if (tower) {
    console.log(`${key}: ${tower.properties.carbon_efficiency}`)
  }
})
```

## Data Structure

The composable returns a `SpeckleModelData` object with this structure:

```typescript
{
  modelId: string           // Model ID
  modelName: string         // Model name
  versionId: string         // Latest version ID
  objectId: string          // Referenced object ID
  createdAt: string         // Version creation timestamp
  properties: {
    'overall-properties': {
      daylight_potential: string
      green_space_index: string
      program_diversity_index: string
      circulation_efficiency: string
      occupancy_efficiency: string
      net_floor_area_ratio: string
      envelope_efficiency: string
      carbon_efficiency: string
    },
    'tower-a': {
      properties: { ...metrics },
      'level-1': { ...metrics },
      'level-2': { ...metrics }
    },
    'tower-b': { ...same structure },
    'tower-c': { ...same structure },
    'tower-d': { ...same structure },
    'connections': { ...same structure }
  }
}
```

## Performance Metrics

All metrics are returned as **strings** from Speckle:
- `daylight_potential`
- `green_space_index`
- `program_diversity_index`
- `circulation_efficiency`
- `occupancy_efficiency`
- `net_floor_area_ratio`
- `envelope_efficiency`
- `carbon_efficiency`

Convert to numbers when needed: `Number(data.properties['overall-properties'].carbon_efficiency)`

## Caching

The composable automatically caches data for 5 minutes. To force refresh:

```typescript
const { refresh } = useSpeckleData()
refresh() // Forces a new fetch
```

## Next Steps

1. Install TypeScript dependencies: `npm install -D typescript @types/node`
2. Convert existing `.vue` files to use `<script setup lang="ts">`
3. Move composable from `services/composables/` to `src/composables/` for easier imports
4. Update GraphQL query to match your actual Speckle model structure
