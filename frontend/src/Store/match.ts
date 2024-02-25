import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, matchInitialState } from '../Utils/store'
import { retrieveMatches } from '../Api/match'

type RetrieveMatchListProps = Token

export const retrieveMatchList = createAsyncThunk(
  'retrieveMatchList',
  async ({ token }: RetrieveMatchListProps, thunkApi) => {
    try {
      const response = await retrieveMatches(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveMatchList error'
      )
    }
  }
)

export const match = createSlice({
  name: 'match',
  initialState: matchInitialState,
  reducers: {
    clearMatchState: () => matchInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: MatchStore['errorMessage'] }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveMatchList.pending, (state) => {
      state.matchListStatus = 'loading'
    })
    builder.addCase(retrieveMatchList.rejected, (state, action) => {
      state.matchListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.matchList = matchInitialState.matchList
    })
    builder.addCase(retrieveMatchList.fulfilled, (state, action) => {
      const data = action.payload
      state.matchListStatus = 'success'
      state.matchList = data
    })
  }
})

export const {
  clearMatchState,
  setErrorMessage,
  clearErrorMessage
} = match.actions

export const selectMatchListStatus = (state: State): State['matchInfo']['matchListStatus'] => state.matchInfo.matchListStatus
export const selectMatchList = (state: State): State['matchInfo']['matchList'] => state.matchInfo.matchList
export const selectErrorMessage = (state: State): State['matchInfo']['errorMessage'] => state.matchInfo.errorMessage
