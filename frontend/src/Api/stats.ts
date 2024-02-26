import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrieveRankings = async (token: string): Promise<AxiosResponse<GetRankingsDTO[]>> =>
  await axiosClient.get('/stats/rankings', createApiHeaders(token))

export const retrieveDefenders = async (token: string): Promise<AxiosResponse<GetDefenderStatsDTO[]>> =>
  await axiosClient.get('/stats/defenders', createApiHeaders(token))

export const retrieveStrikers = async (token: string): Promise<AxiosResponse<GetStrikerStatsDTO[]>> =>
  await axiosClient.get('/stats/strikers', createApiHeaders(token))
