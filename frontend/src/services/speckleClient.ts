import { createClient, fetchExchange, cacheExchange } from '@urql/vue'
import { speckleEnv } from '../config/speckleConfig'

export const speckleClient = createClient({
  url: `${speckleEnv.serverUrl}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${speckleEnv.token}`,
      'Apollo-Require-Preflight': 'true'
    }
  })
})