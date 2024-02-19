import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { retrievePlayers } from '../Api/player'
import { formatThunkError, playerInitialState } from '../Utils/store'

interface RetrievePlayerListProps {
  token: string
}

export const retrievePlayerList = createAsyncThunk(
  'tagList',
  async ({ token }: RetrievePlayerListProps, thunkApi) => {
    try {
      const response = await retrievePlayers(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrievePlayerList error'
      )
    }
  }
)

export const player = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    clearState: () => playerInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: PlayerStore['errorMessage'] }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrievePlayerList.pending, (state) => {
      state.playerListStatus = 'loading'
    })
    builder.addCase(retrievePlayerList.rejected, (state, action) => {
      state.playerListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.playerList = playerInitialState.playerList
    })
    builder.addCase(retrievePlayerList.fulfilled, (state, action) => {
      const data = action.payload
      state.playerListStatus = 'success'
      state.playerList = data
    })
  }
})

export const {
  clearState,
  setErrorMessage,
  clearErrorMessage
} = player.actions

export const selectPlayerListStatus = (state: State): State['playerInfo']['playerListStatus'] => state.playerInfo.playerListStatus
export const selectPlayerList = (state: State): State['playerInfo']['playerList'] => state.playerInfo.playerList
export const selectErrorMessage = (state: State): State['playerInfo']['errorMessage'] => state.playerInfo.errorMessage
