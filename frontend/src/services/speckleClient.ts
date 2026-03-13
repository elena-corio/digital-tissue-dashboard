import { createClient, fetchExchange, cacheExchange } from '@urql/vue'
import { speckleConfig } from '../config/speckleConfig'

export const speckleClient = createClient({
  url: `${speckleConfig.serverUrl}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${speckleConfig.token}`,
      'Apollo-Require-Preflight': 'true'
    }
  })
})