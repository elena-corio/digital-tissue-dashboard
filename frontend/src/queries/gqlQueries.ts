import { gql } from '@urql/vue'

// Step 1: Get the latest version and its referenced object ID
export const GET_LATEST_VERSIONS = gql`
  query GetLatestModelVersions($projectId: String!, $modelId: String!) {
    project(id: $projectId) {
      model(id: $modelId) {
        id
        name
        versions(limit: 4)  {
          items {
            id
            referencedObject
            createdAt
        }
        }
      }
    }
  }
`

// Step 2: Get the root object with all properties
export const GET_ROOT_OBJECT = gql`
  query GetRootObject($projectId: String!, $objectId: String!) {
    project(id: $projectId) {
      object(id: $objectId) {
        id
        speckleType
        data
      }
    }
  }
`