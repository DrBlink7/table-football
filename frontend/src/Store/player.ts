import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createPlayer, deletePlayer, editPlayer, retrievePlayerStats, retrievePlayers } from '../Api/player'
import { formatThunkError, playerInitialState } from '../Utils/store'

type RetrievePlayerListProps = Token

export const retrievePlayerList = createAsyncThunk(
  'retrievePlayerList',
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

type CreateAPlayerProps = Token & {
  name: string
}

export const createAPlayer = createAsyncThunk(
  'createAPlayer',
  async ({ token, name }: CreateAPlayerProps, thunkApi) => {
    try {
      const response = await createPlayer(token, name)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'createAPlayer error'
      )
    }
  }
)

type EditAPlayerProps = Token & {
  name: string
  id: string
}

export const editAPlayer = createAsyncThunk(
  'editAPlayer',
  async ({ token, id, name }: EditAPlayerProps, thunkApi) => {
    try {
      const response = await editPlayer(token, id, name)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'editAPlayer error'
      )
    }
  }
)

type DeleteAPlayerProps = Token & {
  id: string
}

export const deleteAPlayer = createAsyncThunk(
  'deleteAPlayer',
  async ({ token, id }: DeleteAPlayerProps, thunkApi) => {
    try {
      const response = await deletePlayer(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'deleteAPlayer error'
      )
    }
  }
)

type RetrievePlayerStats = Token & { id: number }

export const retrieveThePlayerStats = createAsyncThunk(
  'retrieveThePlayerStats',
  async ({ token, id }: RetrievePlayerStats, thunkApi) => {
    try {
      const response = await retrievePlayerStats(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveThePlayerStats error'
      )
    }
  }
)

export const player = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    clearPlayerState: () => playerInitialState,
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
    builder.addCase(createAPlayer.pending, (state) => {
      state.playerListStatus = 'loading'
    })
    builder.addCase(createAPlayer.rejected, (state, action) => {
      state.playerListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.playerList = playerInitialState.playerList
    })
    builder.addCase(createAPlayer.fulfilled, (state, action) => {
      const { id, name } = action.payload
      state.playerListStatus = 'success'
      state.playerList = [...state.playerList, { id, name }]
    })
    builder.addCase(editAPlayer.pending, (state) => {
      state.playerListStatus = 'loading'
    })
    builder.addCase(editAPlayer.rejected, (state, action) => {
      state.playerListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.playerList = playerInitialState.playerList
    })
    builder.addCase(editAPlayer.fulfilled, (state, action) => {
      const { id, name } = action.payload
      state.playerListStatus = 'success'
      const playerList = [...state.playerList]
      const updatedPlayerList = playerList
        .map(player =>
          player.id === id
            ? { ...player, name }
            : { ...player }
        )
      updatedPlayerList.sort((a, b) => a.id - b.id)
      state.playerList = [...updatedPlayerList]
    })
    builder.addCase(deleteAPlayer.pending, (state) => {
      state.playerListStatus = 'loading'
    })
    builder.addCase(deleteAPlayer.rejected, (state, action) => {
      state.playerListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.playerList = playerInitialState.playerList
    })
    builder.addCase(deleteAPlayer.fulfilled, (state, action) => {
      const { id } = action.payload
      state.playerListStatus = 'success'
      state.playerList = [...state.playerList].filter(player => player.id !== id)
    })
    builder.addCase(retrieveThePlayerStats.pending, (state) => {
      state.playerStatsStatus = 'loading'
    })
    builder.addCase(retrieveThePlayerStats.rejected, (state, action) => {
      state.playerStatsStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.playerStats = playerInitialState.playerStats
    })
    builder.addCase(retrieveThePlayerStats.fulfilled, (state, action) => {
      const data = action.payload
      state.playerStatsStatus = 'success'
      state.playerStats = data
    })
  }
})

export const {
  clearPlayerState,
  setErrorMessage,
  clearErrorMessage
} = player.actions

export const selectPlayerListStatus = (state: State): State['playerInfo']['playerListStatus'] => state.playerInfo.playerListStatus
export const selectPlayerList = (state: State): State['playerInfo']['playerList'] => state.playerInfo.playerList
export const selectErrorMessage = (state: State): State['playerInfo']['errorMessage'] => state.playerInfo.errorMessage
export const selectPlayerStats = (state: State): State['playerInfo']['playerStats'] => state.playerInfo.playerStats
export const selectPlayerStatsStatus = (state: State): State['playerInfo']['playerStatsStatus'] => state.playerInfo.playerStatsStatus
