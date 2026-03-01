import { ref, onMounted } from 'vue'
import { useQuery } from '@urql/vue'
import { GET_MODEL_DATA } from '../speckle/queries'
import { SPECKLE_CONFIG } from '../config/speckle.config'
import type { SpeckleModelData } from '../types/speckle'

export function useSpeckleData() {
  const cache = ref<SpeckleModelData | null>(null)
  const lastFetched = ref<Date | null>(null)

  const { data, fetching, error, executeQuery } = useQuery({
    query: GET_MODEL_DATA,
    variables: {
      projectId: SPECKLE_CONFIG.projectId,
      modelId: SPECKLE_CONFIG.modelId
    },
    pause: true // Don't auto-fetch, we control it
  })

  const fetchData = async (force = false) => {
    // Use cache if fresh
    if (!force && cache.value && lastFetched.value) {
      const age = Date.now() - lastFetched.value.getTime()
      if (age < 5 * 60 * 1000) return cache.value
    }

    await executeQuery()
    if (data.value) {
      cache.value = data.value
      lastFetched.value = new Date()
    }
    return cache.value
  }

  // Auto-fetch on mount
  onMounted(() => fetchData())

  return {
    data: cache,
    loading: fetching,
    error,
    refresh: () => fetchData(true)
  }
}