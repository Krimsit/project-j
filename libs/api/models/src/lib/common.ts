export type ConfigServiceProps = {
  DEBUG: boolean
  API_PORT: number
  API_SECRET_KEY: string
  MONGO_URI: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: number
  FIREBASE_API_KEY: string
  FIREBASE_AUTH_DOMAIN: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_STORAGE_BUCKET: string
  FIREBASE_MESSAGING_SENDER_ID: string
  FIREBASE_APP_ID: string
}
