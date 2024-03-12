/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FCM_WEBPUSH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
