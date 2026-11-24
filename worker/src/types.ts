export interface Env {
  CONTENT: KVNamespace;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
  RESEND_API_KEY?: string;
  ENQUIRY_TO?: string;
  ENQUIRY_FROM?: string;
  RESEND_API_BASE?: string;
}
