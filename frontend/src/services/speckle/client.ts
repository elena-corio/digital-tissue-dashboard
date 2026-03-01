import { createClient, fetchExchange, cacheExchange } from '@urql/vue'
import { SPECKLE_CONFIG } from '../config/speckle.config'

export const speckleClient = createClient({
  url: `${SPECKLE_CONFIG.serverUrl}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SPECKLE_CONFIG.token}`,
      'Apollo-Require-Preflight': 'true'
    }
  })
})