export const speckleToken = import.meta.env.VITE_SPECKLE_TOKEN || '';
export const speckleServerUrl = import.meta.env.VITE_SPECKLE_SERVER_URL || '';
export const speckleEnv = {
  token: speckleToken,
  serverUrl: speckleServerUrl
}
export const speckleModels = {
    metrics: {
    projectId: 'dcca94731b',
    modelId: 'a17c364985'
  },
  site: {
    projectId: '3d70848e9c',
    contextModelId: 'ad7100fabd',
    hb01ModelId: 'ae49122ea5',
    hb02ModelId: '86650fd3e5',
    hb03ModelId: '388ce2bacf',
  }
};
