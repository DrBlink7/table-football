import { type AxiosResponse } from 'axios'
import axiosApiClient from './api'

export const authenticateEmail = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthenticateDTO>> => {
  const body: AuthenticateBody = { email, password }

  return await axiosApiClient.post('/login/authenticate', { ...body })
}
