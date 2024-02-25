import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrieveMatches = async (token: string): Promise<AxiosResponse<GetMatchesDTO>> =>
  await axiosClient.get('/match', createApiHeaders(token))

export const createMatch = async (token: string, blue: number, red: number): Promise<AxiosResponse<CreateMatchDTO>> =>
  await axiosClient.post('/match', { blue, red } satisfies CreateMatchBODY, createApiHeaders(token))

export const editMatch = async (token: string, id: string, blue: number, red: number): Promise<AxiosResponse<EditMatchDTO>> =>
  await axiosClient.put(`/match/${id}`, { blue, red } satisfies EditMatchBODY, createApiHeaders(token))

export const deleteMatch = async (token: string, id: string): Promise<AxiosResponse<DeleteMatchDTO>> =>
  await axiosClient.delete(`/match/${id}`, createApiHeaders(token))
