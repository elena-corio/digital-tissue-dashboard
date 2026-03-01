import { gql } from '@urql/vue'

export const GET_MODEL_DATA = gql`
  query GetModelData($projectId: String!, $modelId: String!) {
    project(id: $projectId) {
      model(id: $modelId) {
        id
        name
        properties {
          daylight_potential
          green_space_index
          program_diversity_index
          circulation_efficiency
          occupancy_efficiency
          net_floor_area_ratio
          envelope_efficiency
          carbon_efficiency
        }
        towers {
          tower_a {
            id
            name
            levels {
              id
              name
              properties {
                daylight_potential
                green_space_index
                program_diversity_index
                circulation_efficiency
                occupancy_efficiency
                net_floor_area_ratio
                envelope_efficiency
                carbon_efficiency
              }
              objects {
                id
                name
                type
                properties {
                  area
                  volume
                  height
                  width
                  length
                  daylight_potential
                  green_space_index
                  program_diversity_index
                  circulation_efficiency
                  occupancy_efficiency
                  net_floor_area_ratio
                  envelope_efficiency
                  carbon_efficiency
                }
              }
            }
          }
          tower_b {
            id
            name
            levels {
              id
              name
              properties {
                daylight_potential
                green_space_index
                program_diversity_index
                circulation_efficiency
                occupancy_efficiency
                net_floor_area_ratio
                envelope_efficiency
                carbon_efficiency
              }
              objects {
                id
                name
                type
                properties {
                  area
                  volume
                  height
                  width
                  length
                  daylight_potential
                  green_space_index
                  program_diversity_index
                  circulation_efficiency
                  occupancy_efficiency
                  net_floor_area_ratio
                  envelope_efficiency
                  carbon_efficiency
                }
              }
            }
          }
          tower_c {
            id
            name
            levels {
              id
              name
              properties {
                daylight_potential
                green_space_index
                program_diversity_index
                circulation_efficiency
                occupancy_efficiency
                net_floor_area_ratio
                envelope_efficiency
                carbon_efficiency
              }
              objects {
                id
                name
                type
                properties {
                  area
                  volume
                  height
                  width
                  length
                  daylight_potential
                  green_space_index
                  program_diversity_index
                  circulation_efficiency
                  occupancy_efficiency
                  net_floor_area_ratio
                  envelope_efficiency
                  carbon_efficiency
                }
              }
            }
          }
          tower_d {
            id
            name
            levels {
              id
              name
              properties {
                daylight_potential
                green_space_index
                program_diversity_index
                circulation_efficiency
                occupancy_efficiency
                net_floor_area_ratio
                envelope_efficiency
                carbon_efficiency
              }
              objects {
                id
                name
                type
                properties {
                  area
                  volume
                  height
                  width
                  length
                  daylight_potential
                  green_space_index
                  program_diversity_index
                  circulation_efficiency
                  occupancy_efficiency
                  net_floor_area_ratio
                  envelope_efficiency
                  carbon_efficiency
                }
              }
            }
          }
        }
      }
    }
  }
`