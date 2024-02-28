import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrievePlayers = async (token: string): Promise<AxiosResponse<GetPlayersDTO>> =>
  await axiosClient.get('/player', createApiHeaders(token))

export const createPlayer = async (token: string, name: string): Promise<AxiosResponse<CreatePlayerDTO>> =>
  await axiosClient.post('/player', { name } satisfies CreatePlayerBODY, createApiHeaders(token))

export const editPlayer = async (token: string, id: string, name: string): Promise<AxiosResponse<EditPlayerDTO>> =>
  await axiosClient.put(`/player/${id}`, { name } satisfies EditPlayerBODY, createApiHeaders(token))

export const deletePlayer = async (token: string, id: string): Promise<AxiosResponse<DeletePlayerDTO>> =>
  await axiosClient.delete(`/player/${id}`, createApiHeaders(token))

export const retrievePlayerStats = async (token: string, id: number): Promise<AxiosResponse<GetPlayerStatDTO>> =>
  await axiosClient.get(`/player/stats/${id}`, createApiHeaders(token))
