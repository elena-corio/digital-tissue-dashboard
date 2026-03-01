# Speckle Integration Service Layer

This directory contains the service layer for integrating Speckle GraphQL data into the Vue frontend.

## Directory Structure

```
services/
├── speckle/
│   ├── client.ts          # GraphQL client configuration
│   └── queries.ts         # GraphQL query definitions
├── config/
│   └── speckle.config.ts  # Speckle server configuration
├── composables/
│   └── useSpeckleData.ts  # Vue composable for data fetching + caching
├── types/
│   └── speckle.ts         # TypeScript type definitions
└── example/
    └── vitalityCard.vue   # Example component usage
```

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
  <div v-else>
    <!-- Access model-level properties -->
    <p>{{ data?.project.model.properties.daylight_potential }}</p>
    
    <!-- Access tower data -->
    <div v-for="tower in data?.project.model.towers" :key="tower.id">
      <h3>{{ tower.name }}</h3>
      
      <!-- Access level data -->
      <div v-for="level in tower.levels" :key="level.id">
        <h4>{{ level.name }}</h4>
        
        <!-- Access object data -->
        <div v-for="obj in level.objects" :key="obj.id">
          <p>{{ obj.name }} - Area: {{ obj.properties.area }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

### Accessing Specific Towers

```typescript
// Access specific tower
const towerA = data.value?.project.model.towers.tower_a

// Loop through all towers dynamically
import type { TowerKey } from '@/services/types/speckle'

const towerKeys: TowerKey[] = ['tower_a', 'tower_b', 'tower_c', 'tower_d']
towerKeys.forEach(key => {
  const tower = data.value?.project.model.towers[key]
  if (tower) {
    console.log(tower.name, tower.levels.length)
  }
})
```

## Type Hierarchy

```
SpeckleModelData
└── project
    └── model (SpeckleModel)
        ├── properties (PerformanceMetrics)
        └── towers
            ├── tower_a (SpeckleTower)
            ├── tower_b (SpeckleTower)
            ├── tower_c (SpeckleTower)
            └── tower_d (SpeckleTower)
                └── levels[] (SpeckleLevel)
                    ├── properties (PerformanceMetrics)
                    └── objects[] (SpeckleObject)
                        └── properties (PerformanceMetrics & ObjectGeometry)
```

## Performance Metrics Available

All levels (model, tower, level, object) have these metrics:
- `daylight_potential`
- `green_space_index`
- `program_diversity_index`
- `circulation_efficiency`
- `occupancy_efficiency`
- `net_floor_area_ratio`
- `envelope_efficiency`
- `carbon_efficiency`

Objects also have geometry properties:
- `area`, `volume`, `height`, `width`, `length`

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
