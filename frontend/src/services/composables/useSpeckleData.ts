import { ref, onMounted } from 'vue'
import { useQuery } from '@urql/vue'
import { GET_LATEST_VERSION, GET_ROOT_OBJECT } from '../speckle/queries'
import { SPECKLE_CONFIG } from '../config/speckle.config'
import { speckleClient } from '../speckle/client'
import type { SpeckleModelData, LatestVersionResponse, RootObjectResponse } from '../types/speckle'

/**
 * Composable for fetching Speckle model data using a two-step GraphQL query approach.
 * 
 * Step 1: Fetch the latest model version to get the referencedObject ID
 * Step 2: Use that ID to fetch the actual object data with properties
 * 
 * We use useQuery for the first step to leverage its caching and refetching capabilities.
 * For the second step, we use speckleClient.query() to directly query the Speckle API,
 * as it provides more flexibility and control over the query process.
 * 
 * Includes 5-minute caching to minimize API calls.
 */
export function useSpeckleData() {
  const cache = ref<SpeckleModelData | null>(null)
  const lastFetched = ref<Date | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Step 1: Query for latest version using useQuery
  const { executeQuery: executeVersionQuery } = useQuery<LatestVersionResponse>({
    query: GET_LATEST_VERSION,
    variables: {
      projectId: SPECKLE_CONFIG.projectId,
      modelId: SPECKLE_CONFIG.modelId
    },
    pause: true
  })

  const fetchData = async (force = false) => {
    // Use cache if fresh
    if (!force && cache.value && lastFetched.value) {
      const age = Date.now() - lastFetched.value.getTime()
      if (age < 5 * 60 * 1000) return cache.value
    }

    loading.value = true
    error.value = null

    try {
      // Step 1: Get latest version
      const versionResult = await executeVersionQuery()
      
      if (versionResult.error.value) {
        throw new Error(`Failed to fetch version: ${versionResult.error.value.message}`)
      }

      const versionData = versionResult.data.value
      if (!versionData?.project?.model?.versions?.items?.[0]) {
        throw new Error('No version found for this model')
      }

      const latestVersion = versionData.project.model.versions.items[0]
      const objectId = latestVersion.referencedObject
      
      console.log('Latest version data:', latestVersion)
      console.log('Querying object ID:', objectId)
      console.log('Project ID:', SPECKLE_CONFIG.projectId)

      // Step 2: Get root object with properties using direct client query
      // Note: We use speckleClient.query() instead of useQuery's executeQuery because
      // urql's executeQuery doesn't properly handle dynamic variables - variables set
      // during useQuery setup are bound and cannot be overridden at execution time.
      const objectResult = await speckleClient.query<RootObjectResponse>(
        GET_ROOT_OBJECT,
        {
          projectId: SPECKLE_CONFIG.projectId,
          objectId: objectId // Dynamic value from Step 1
        }
      ).toPromise()
      
      console.log('Object query result:', objectResult)

      if (objectResult.error) {
        throw new Error(`Failed to fetch object: ${objectResult.error.message}`)
      }

      const objectData = objectResult.data
      
      // Debug: Log the actual structure
      console.log('Object data structure:', objectData)
      console.log('Object data.project.object:', objectData?.project?.object)
      console.log('Object data.project.object.data:', objectData?.project?.object?.data)
      
      if (!objectData?.project?.object?.data) {
        throw new Error('No data found in object response')
      }
      
      // Parse the data - it's a JSON string in Speckle
      const rootData = typeof objectData.project.object.data === 'string' 
        ? JSON.parse(objectData.project.object.data)
        : objectData.project.object.data
      
      console.log('Parsed root data:', rootData)
      console.log('Root data properties:', rootData.properties)
      
      if (!rootData.properties) {
        throw new Error('No properties found in object data')
      }

      // Combine the data into our model
      cache.value = {
        modelId: versionData.project.model.id,
        modelName: versionData.project.model.name,
        versionId: latestVersion.id,
        objectId: objectId,
        createdAt: latestVersion.createdAt,
        properties: rootData.properties
      }

      lastFetched.value = new Date()
      return cache.value

    } catch (err) {
      error.value = err as Error
      console.error('Error fetching Speckle data:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch on mount
  onMounted(() => fetchData())

  return {
    data: cache,
    loading,
    error,
    refresh: () => fetchData(true)
  }
}