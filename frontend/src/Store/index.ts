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

const setupStore = (state: State): EnhancedStore<{
  userInfo: UserStore
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
    userInfo: UserStore
  }, undefined, UnknownAction>
}>, StoreEnhancer]>> =>
  configureStore({
    reducer: {
      userInfo: user.reducer
    },
    preloadedState: state
  })

export const store = setupStore(loadState())

store.subscribe(() => saveState(store.getState()))

export default store
