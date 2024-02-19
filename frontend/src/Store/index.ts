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

const setupStore = (state: State): EnhancedStore<{
  userInfo: UserStore
  playerInfo: PlayerStore
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
    userInfo: UserStore
    playerInfo: PlayerStore
  }, undefined, UnknownAction>
}>, StoreEnhancer]>> =>
  configureStore({
    reducer: {
      userInfo: user.reducer,
      playerInfo: player.reducer
    },
    preloadedState: state
  })

export const store = setupStore(loadState())

store.subscribe(() => saveState(store.getState()))

export default store
