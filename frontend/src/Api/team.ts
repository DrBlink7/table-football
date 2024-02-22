import { type AxiosResponse } from 'axios'
import { createApiHeaders } from '../Utils/f'
import axiosClient from './api'

export const retrieveTeams = async (token: string): Promise<AxiosResponse<GetTeamsDTO>> =>
  await axiosClient.get('/team', createApiHeaders(token))

export const createTeam = async (token: string, defender: number, striker: number): Promise<AxiosResponse<CreateTeamDTO>> =>
  await axiosClient.post('/team', { defender, striker } satisfies CreateTeamBODY, createApiHeaders(token))

export const editTeam = async (token: string, id: string, defender: number, striker: number): Promise<AxiosResponse<EditTeamDTO>> =>
  await axiosClient.put(`/team/${id}`, { defender, striker } satisfies EditTeamBODY, createApiHeaders(token))

export const deleteTeam = async (token: string, id: string): Promise<AxiosResponse<DeleteTeamDTO>> =>
  await axiosClient.delete(`/team/${id}`, createApiHeaders(token))
