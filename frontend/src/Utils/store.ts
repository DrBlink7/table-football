import { type AxiosError } from 'axios'
import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import * as ls from './ls'
import type store from '../Store'

export const loadState = (): State => {
  try {
    const serializedStore = ls.get('tableFootball')

    if (serializedStore === null || serializedStore === undefined) {
      return {
        userInfo: userInitialState,
        playerInfo: playerInitialState,
        teamInfo: teamInitialState,
        matchInfo: matchInitialState,
        statsInfo: statsInitialState,
        utilInfo: utilsInitialState,
        sseInfo: sseInitialState
      }
    }

    return {
      ...serializedStore
    }
  } catch (e) {
    return {
      userInfo: userInitialState,
      playerInfo: playerInitialState,
      teamInfo: teamInitialState,
      matchInfo: matchInitialState,
      statsInfo: statsInitialState,
      utilInfo: utilsInitialState,
      sseInfo: sseInitialState
    }
  }
}

export const saveState = (state: State): boolean => {
  const { ...stateToSave } = state
  try {
    ls.set('tableFootball', stateToSave)

    return ls.has('tableFootball')
  } catch (e) {
    return false
  }
}

export const userInitialState: UserStore = {
  user: {
    email: ''
  },
  isUserLogged: false,
  authStatus: 'idle',
  token: '',
  errorMessage: ''
}

export const playerInitialState: PlayerStore = {
  playerList: [],
  playerStats: {
    id: 0,
    name: '',
    playedForBlue: 0,
    playedForRed: 0,
    strikerPlayed: 0,
    goalsScoredPerMatch: 0,
    goalsScored: 0,
    defenderPlayed: 0,
    goalsConceded: 0,
    goalsConcededPerMatch: 0
  },
  playerStatsStatus: 'idle',
  playerListStatus: 'idle',
  errorMessage: ''
}

export const teamInitialState: TeamStore = {
  teamList: [],
  teamListStatus: 'idle',
  errorMessage: ''
}

export const matchInitialState: MatchStore = {
  matchList: [],
  matchListStatus: 'idle',
  errorMessage: ''
}

export const statsInitialState: StatsStore = {
  defenders: [],
  strikers: [],
  rankings: [],
  statsStatus: 'idle',
  errorMessage: ''
}

export const utilsInitialState: UtilStore = {
  component: 'home'
}

export const sseInitialState: SSEStore = {
  notifications: {}
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: UserStore
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown): AxiosError =>
  Boolean((e as any).response.data) ? (e as any).response.data : e as AxiosError
