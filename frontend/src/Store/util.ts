import { createSlice } from '@reduxjs/toolkit'
import { utilsInitialState } from '../Utils/store'

export const util = createSlice({
  name: 'util',
  initialState: utilsInitialState,
  reducers: {
    clearUserState: () => utilsInitialState,
    setComponent: (state, action: { payload: HomeComponent }) => {
      state.component = action.payload
    }
  }
})

export const {
  clearUserState,
  setComponent
} = util.actions

export const selectComponent = (state: State): State['utilInfo']['component'] => state.utilInfo.component
