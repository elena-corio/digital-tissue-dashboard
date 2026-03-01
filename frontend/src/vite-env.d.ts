/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPECKLE_TOKEN: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
