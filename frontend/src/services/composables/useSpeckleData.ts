import { ref, onMounted } from 'vue'
import { useQuery } from '@urql/vue'
import { GET_LATEST_VERSION, GET_ROOT_OBJECT } from '../speckle/queries'
import { SPECKLE_CONFIG } from '../config/speckle.config'
import { speckleClient } from '../speckle/client'
import type { SpeckleModelData, LatestVersionResponse, RootObjectResponse } from '../types/speckle'

// Two-step query: 1) Get version → 2) Get object data
// Uses speckleClient.query() for step 2 (urql's executeQuery doesn't handle dynamic vars)
//
// Cache: Stores fetched data for 5 minutes
// Updates: On mount, or when refresh() is called
// Invalidates: After 5 minutes, or when force refresh
export function useSpeckleData() {
  const cache = ref<SpeckleModelData | null>(null)
  const lastFetched = ref<Date | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const { executeQuery: executeVersionQuery } = useQuery<LatestVersionResponse>({
    query: GET_LATEST_VERSION,
    variables: { projectId: SPECKLE_CONFIG.projectId, modelId: SPECKLE_CONFIG.modelId },
    pause: true
  })

  // Cache is fresh for 5 minutes
  const isCacheFresh = () => {
    if (!cache.value || !lastFetched.value) return false
    return Date.now() - lastFetched.value.getTime() < 5 * 60 * 1000
  }

  const fetchVersion = async () => {
    const result = await executeVersionQuery()
    if (result.error.value) throw new Error(`Version fetch failed: ${result.error.value.message}`)
    const version = result.data.value?.project?.model?.versions?.items?.[0]
    if (!version) throw new Error('No version found')
    return version
  }

  const fetchObject = async (objectId: string) => {
    const result = await speckleClient.query<RootObjectResponse>(
      GET_ROOT_OBJECT,
      { projectId: SPECKLE_CONFIG.projectId, objectId }
    ).toPromise()
    
    if (result.error) throw new Error(`Object fetch failed: ${result.error.message}`)
    if (!result.data?.project?.object) {
      throw new Error('Object not found. Please verify that projectId and modelId in speckle.config.ts reference the same Speckle project.')
    }
    if (!result.data.project.object.data) throw new Error('No object data')
    
    const data = result.data.project.object.data
    const parsed = typeof data === 'string' ? JSON.parse(data) : data
    
    // Validate: new structure requires 'metrics'
    if (!parsed.id || !parsed.name) throw new Error('Invalid data structure: missing id or name')
    if (!parsed.metrics) throw new Error('New structure required: missing metrics field')
    
    return parsed
  }

  const fetchData = async (force = false) => {
    if (!force && isCacheFresh()) return cache.value

    loading.value = true
    error.value = null

    try {
      const version = await fetchVersion()
      const rootData = await fetchObject(version.referencedObject)
      const versionData = (await executeVersionQuery()).data.value!

      cache.value = {
        modelId: versionData.project.model.id,
        modelName: versionData.project.model.name,
        versionId: version.id,
        objectId: version.referencedObject,
        createdAt: version.createdAt,
        data: rootData
      }

      lastFetched.value = new Date()
      return cache.value
    } catch (err) {
      error.value = err as Error
      return null
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchData())

  return { data: cache, loading, error, refresh: () => fetchData(true) }
}