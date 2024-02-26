import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, statsInitialState } from '../Utils/store'
import { retrieveDefenders, retrieveRankings, retrieveStrikers } from '../Api/stats'

type RetrieveRankingsProps = Token

export const retrieveTheRankings = createAsyncThunk(
  'retrieveTheRankings',
  async ({ token }: RetrieveRankingsProps, thunkApi) => {
    try {
      const response = await retrieveRankings(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveTheRankings error'
      )
    }
  }
)

type RetrieveDefenderProps = Token

export const retrieveTheDefenders = createAsyncThunk(
  'retrieveTheDefenders',
  async ({ token }: RetrieveDefenderProps, thunkApi) => {
    try {
      const response = await retrieveDefenders(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveTheDefenders error'
      )
    }
  }
)

type RetrieveStrikersProps = Token

export const retrieveTheStrikers = createAsyncThunk(
  'retrieveTheStrikers',
  async ({ token }: RetrieveStrikersProps, thunkApi) => {
    try {
      const response = await retrieveStrikers(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveTheStrikers error'
      )
    }
  }
)

export const stats = createSlice({
  name: 'stats',
  initialState: statsInitialState,
  reducers: {
    clearStatsState: () => statsInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: MatchStore['errorMessage'] }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveTheRankings.pending, (state) => {
      state.statsStatus = 'loading'
    })
    builder.addCase(retrieveTheRankings.rejected, (state, action) => {
      state.statsStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.rankings = statsInitialState.rankings
    })
    builder.addCase(retrieveTheRankings.fulfilled, (state, action) => {
      const data = action.payload
      state.statsStatus = 'success'
      state.rankings = data
    })
    builder.addCase(retrieveTheDefenders.pending, (state) => {
      state.statsStatus = 'loading'
    })
    builder.addCase(retrieveTheDefenders.rejected, (state, action) => {
      state.statsStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.defenders = statsInitialState.defenders
    })
    builder.addCase(retrieveTheDefenders.fulfilled, (state, action) => {
      const data = action.payload
      state.statsStatus = 'success'
      state.defenders = data
    })
    builder.addCase(retrieveTheStrikers.pending, (state) => {
      state.statsStatus = 'loading'
    })
    builder.addCase(retrieveTheStrikers.rejected, (state, action) => {
      state.statsStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.strikers = statsInitialState.strikers
    })
    builder.addCase(retrieveTheStrikers.fulfilled, (state, action) => {
      const data = action.payload
      state.statsStatus = 'success'
      state.strikers = data
    })
  }
})

export const {
  clearStatsState,
  setErrorMessage,
  clearErrorMessage
} = stats.actions

export const selectStatsStatus = (state: State): State['statsInfo']['statsStatus'] => state.statsInfo.statsStatus
export const selectRankings = (state: State): State['statsInfo']['rankings'] => state.statsInfo.rankings
export const selectStrikers = (state: State): State['statsInfo']['strikers'] => state.statsInfo.strikers
export const selectDefenders = (state: State): State['statsInfo']['defenders'] => state.statsInfo.defenders
export const selectErrorMessage = (state: State): State['statsInfo']['errorMessage'] => state.statsInfo.errorMessage
