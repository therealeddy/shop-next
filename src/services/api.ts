import axios from 'axios'
import { env } from '~/config/env'

export const api = axios.create({
  baseURL: `${env.APP_URL}/api`,
})
