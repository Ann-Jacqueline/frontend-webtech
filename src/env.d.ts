/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;  // Beispiel für eine benutzerdefinierte Umgebungsvariable
  VITE_APP_API_KEY: string;  // Beispiel, wie in deinem Code verwendet
  BASE_URL: string;  // BASE_URL, wie in deinem Router verwendet
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


