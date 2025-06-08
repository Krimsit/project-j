import { z } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config({ path: '../../.env' }))

const envConfigSchema = z.object({
  API_PORT: z.coerce.number().min(1),
  API_DATABASE_HOST: z.string().min(1),
  API_DATABASE_PORT: z.coerce.number().min(1),
  API_DATABASE_NAME: z.string().min(1),
  API_DATABASE_USER: z.string().min(1),
  API_DATABASE_PASSWORD: z.string().min(1),
  API_GOOGLE_CLIENT_ID: z.string().min(1),
  API_JWT_SECRET: z.string().min(1),
  API_JWT_EXPIRED: z.string().min(1),
  API_S3_URL: z.string().min(1),
  API_S3_REGION: z.string().min(1),
  API_S3_BUCKET_NAME: z.string().min(1),
  API_S3_ACCESS_KEY_ID: z.string().min(1),
  API_S3_SECRET_ACCESS_KEY: z.string().min(1),
  API_WEBAPP_URL: z.string().min(1),
})

export type EnvConfig = z.infer<typeof envConfigSchema>

const envConfig = envConfigSchema.parse(process.env)

export default () => envConfig
