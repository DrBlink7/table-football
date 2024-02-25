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
        utilInfo: utilsInitialState
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
      utilInfo: utilsInitialState
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

export const utilsInitialState: UtilStore = {
  component: 'home'
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: UserStore
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown): AxiosError =>
  Boolean((e as any).response.data) ? (e as any).response.data : e as AxiosError
