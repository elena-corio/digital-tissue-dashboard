# Speckle Integration

Fetches Speckle model data via GraphQL with automatic caching.

## Setup

1. **Create `.env` file** in `frontend/`:
   ```bash
   VITE_SPECKLE_TOKEN=your-speckle-token-here
   ```

2. **Update config** in `config/speckle.config.ts`:
   ```typescript
   projectId: 'your-project-id'
   modelId: 'your-model-id'
   ```
   
   **Important**: Ensure the `projectId` and `modelId` reference the same Speckle project. The model must belong to the specified project, otherwise the object query will return `null`.

3. **Install dependencies** (if needed):
   ```bash
   npm install @urql/vue graphql
   ```

## Key Concepts

### Two-Step Query
1. Fetch latest version → get `referencedObject` ID
2. Use that ID to fetch object data with properties

Why? Step 2 needs dynamic variables from Step 1. urql's `useQuery` doesn't handle this, so we use `speckleClient.query()` directly.

### Cache
- **Duration**: 5 minutes
- **Updates**: On mount, or when `refresh()` is called
- **No delays**: Data loads once, then served from cache

## Usage

```vue
<script setup lang="ts">
import { useSpeckleData } from '@/services/composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="data">
    <p>{{ data.properties['overall-properties'].carbon_efficiency }}</p>
    <p>{{ data.properties['tower-a'].properties.daylight_potential }}</p>
    <button @click="refresh">Refresh</button>
  </div>
</template>
```

## Data Structure

```typescript
data.value = {
  modelName: string
  versionId: string
  properties: {
    'overall-properties': { ...metrics }
    'tower-a': { properties: {...}, 'level-1': {...} }
    'tower-b': { properties: {...}, 'level-1': {...} }
    // etc.
  }
}
```

All metrics are strings. Convert: `Number(data.properties['overall-properties'].carbon_efficiency)`
