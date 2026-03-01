import { gql } from '@urql/vue'

export const GET_MODEL_DATA = gql`
  query GetModelData($projectId: String!, $modelId: String!) {
    project(id: $projectId) {
      model(id: $modelId) {
        id
        name
        # Your specific properties here
        properties {
          liveability
          interconnection
          adaptability
          sustainability
        }
      }
    }
  }
`