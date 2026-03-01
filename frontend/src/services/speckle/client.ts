import { createClient } from '@urql/vue'
import { SPECKLE_CONFIG } from '@/config/speckle.config'

export const speckleClient = createClient({
  url: `${SPECKLE_CONFIG.serverUrl}/graphql`,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${SPECKLE_CONFIG.token}`
    }
  }
})