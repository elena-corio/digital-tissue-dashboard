import { ref, onMounted } from 'vue'
import { useQuery } from '@urql/vue'
import { GET_LATEST_VERSIONS, GET_ROOT_OBJECT } from '../queries/gqlQueries'
import {  speckleModels } from '../config/speckleConfig'
import { speckleClient } from '../services/speckleClient'
import type { SpeckleModelData, SpeckleModelHistory, LatestVersionResponse, RootObjectResponse } from '../types/speckle'

// Two-step query: 1) Get version → 2) Get object data
// Uses speckleClient.query() for step 2 (urql's executeQuery doesn't handle dynamic vars)
//
// Cache: Stores fetched data for 5 minutes
// Updates: On mount, or when refresh() is called
// Invalidates: After 5 minutes, or when force refresh
export function useSpeckleData() {
  const cache = ref<SpeckleModelData | null>(null)
  const cacheHistory = ref<SpeckleModelHistory | null>(null)
  const lastFetched = ref<Date | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const { executeQuery: executeVersionQuery } = useQuery<LatestVersionResponse>({
    query: GET_LATEST_VERSIONS,
    variables: { projectId: speckleModels.metrics.projectId, modelId: speckleModels.metrics.modelId },
    pause: true
  })

  // Cache is fresh for 5 minutes
  const isCacheFresh = () => {
    if (!cache.value || !lastFetched.value) return false
    return Date.now() - lastFetched.value.getTime() < 5 * 60 * 1000
  }

  const fetchVersions = async () => {
  const result = await executeVersionQuery()
  if (result.error.value) throw new Error(`Version fetch failed: ${result.error.value.message}`)
  const model = result.data.value?.project?.model
  const versions = model?.versions?.items
  if (!versions || versions.length === 0) throw new Error('No versions found')
  // Attach modelId/modelName to each version
  return versions.slice().reverse().map(v => ({
    ...v,
    modelId: model.id,
    modelName: model.name
  }))
}

  const fetchObject = async (objectId: string) => {
    const result = await speckleClient.query<RootObjectResponse>(
      GET_ROOT_OBJECT,
      { projectId: speckleModels.metrics.projectId, objectId }
    ).toPromise()
    
    if (result.error) throw new Error(`Object fetch failed: ${result.error.message}`)
    if (!result.data?.project?.object) {
      throw new Error('Object not found. Please verify that projectId and modelId in speckle.config.ts reference the same Speckle project.')
    }
    if (!result.data.project.object.data) throw new Error('No object data')
    
    const data = result.data.project.object.data
    const parsed = typeof data === 'string' ? JSON.parse(data) : data
    
    // Validate: must have id and name
    if (!parsed.id || !parsed.name) throw new Error('Invalid data structure: missing id or name')
    // No metrics check: metrics are now under properties
    return parsed
  }

  const fetchData = async (version: any, force = false) => {
    if (!force && isCacheFresh()) return cache.value

    loading.value = true
    error.value = null

    try {
      const rootData = await fetchObject(version.referencedObject)
      cache.value = {
        modelId: version.project.model.id,
        modelName: version.project.model.name,
        versionId: version.id,
        objectId: version.referencedObject,
        createdAt: version.createdAt,
        data: rootData
      }

      lastFetched.value = new Date()
      return cache.value
    } catch (err) {
      error.value = err as Error
      // Log error for debugging
      console.error('useSpeckleData fetchData error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchDataTree = async (force = false) => {
  if (!force && isCacheFresh()) return cacheHistory.value

  loading.value = true
  error.value = null

  try {
    const versions = await fetchVersions() // oldest to newest
    const versionDataArr = await Promise.all(
      versions.map(async (version) => {
        const rootData = await fetchObject(version.referencedObject)
        return {
          modelId: version.modelId,      // ensure these are present on version
          modelName: version.modelName,  // or pass them in another way
          versionId: version.id,
          objectId: version.referencedObject,
          createdAt: version.createdAt,
          data: rootData
        }
      })
    )
    // Cache and return the array for history
    cacheHistory.value = {
      versions: versionDataArr,
      history: versionDataArr.map(v => v.data?.properties?.yourMetricKey), // replace with your metric key
      latest: versionDataArr.length > 0 ? versionDataArr[versionDataArr.length - 1] : null
    }
    lastFetched.value = new Date()
    return cacheHistory.value
  } catch (err) {
    error.value = err as Error
    console.error('useSpeckleData fetchDataTree error:', err)
    return null
  } finally {
    loading.value = false
  }
}

  onMounted(() => fetchDataTree())

  return { data: cacheHistory, loading, error, refresh: () => fetchData(true) }
}