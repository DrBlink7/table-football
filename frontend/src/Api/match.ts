import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrieveMatches = async (token: string): Promise<AxiosResponse<GetMatchesDTO>> =>
  await axiosClient.get('/match', createApiHeaders(token))
