interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_MAP_API_KEY: string;
  readonly VITE_APP_PTX_ID: string;
  readonly VITE_APP_PTX_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}