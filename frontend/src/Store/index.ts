import {
  type EnhancedStore,
  type StoreEnhancer,
  type ThunkDispatch,
  type Tuple,
  type UnknownAction,
  configureStore
} from '@reduxjs/toolkit'
import { loadState, saveState } from '../Utils/store'
import { user } from './users'
import { player } from './player'
import { util } from './util'
import { team } from './team'
import { match } from './match'

const setupStore = (state: State): EnhancedStore<{
  userInfo: UserStore
  playerInfo: PlayerStore
  teamInfo: TeamStore
  matchInfo: MatchStore
  utilInfo: UtilStore
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
    userInfo: UserStore
    playerInfo: PlayerStore
    teamInfo: TeamStore
    matchInfo: MatchStore
    utilInfo: UtilStore
  }, undefined, UnknownAction>
}>, StoreEnhancer]>> =>
  configureStore({
    reducer: {
      userInfo: user.reducer,
      playerInfo: player.reducer,
      teamInfo: team.reducer,
      matchInfo: match.reducer,
      utilInfo: util.reducer
    },
    preloadedState: state
  })

export const store = setupStore(loadState())

store.subscribe(() => saveState(store.getState()))

export default store
