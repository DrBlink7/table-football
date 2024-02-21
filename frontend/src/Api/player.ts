import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrievePlayers = async (token: string): Promise<AxiosResponse<GetPlayersDTO>> =>
  await axiosClient.get('/player', createApiHeaders(token))
