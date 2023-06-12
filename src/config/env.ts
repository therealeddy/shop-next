interface EnvProps {
  NODE_ENV: 'development' | 'test' | 'production'
  APP_URL: string
  STRIPE_PUBLIC_KEY: string
  STRIPE_SECRET_KEY: string
}

export const env: EnvProps = {
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
}
