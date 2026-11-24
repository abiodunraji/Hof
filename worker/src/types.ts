export interface Env {
  CONTENT: KVNamespace;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
}
