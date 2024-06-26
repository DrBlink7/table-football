import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, matchInitialState } from '../Utils/store'
import { createMatch, deleteMatch, editMatch, retrieveMatch, retrieveMatches } from '../Api/match'

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

type CreateAMatchProps = Token & {
  blue: number
  red: number
}

export const createAMatch = createAsyncThunk(
  'createAMatch',
  async ({ token, blue, red }: CreateAMatchProps, thunkApi) => {
    try {
      const response = await createMatch(token, blue, red)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'createAMatch error'
      )
    }
  }
)

type EditAMatchProps = Token & {
  blue: number
  red: number
  id: string
}

export const editAMatch = createAsyncThunk(
  'editAMatch',
  async ({ token, id, blue, red }: EditAMatchProps, thunkApi) => {
    try {
      const response = await editMatch(token, id, blue, red)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'editAMatch error'
      )
    }
  }
)

type DeleteAMatchProps = Token & {
  id: string
}

export const deleteAMatch = createAsyncThunk(
  'deleteAMatch',
  async ({ token, id }: DeleteAMatchProps, thunkApi) => {
    try {
      const response = await deleteMatch(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'deleteAMatch error'
      )
    }
  }
)

type RetrieveMatchProps = Token & {
  id: string
}

export const retrieveAMatch = createAsyncThunk(
  'retrieveAMatch',
  async ({ token, id }: RetrieveMatchProps, thunkApi) => {
    try {
      const response = await retrieveMatch(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveAMatch error'
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
    },
    addGoal: (state, action: { payload: AddGoal }) => {
      const { matchid, teamid } = action.payload
      const matches = [...state.matchList]
      const match = matches.find(m => m.id === matchid)
      if (match === undefined) return

      const others = matches.filter(match => match.id !== matchid)
      if (match.blue.id === teamid) {
        state.matchList = [...others, {
          ...match,
          blue: {
            ...match.blue,
            score: match.blue.score + 1
          }
        }]
      } else if (match.red.id === teamid) {
        state.matchList = [...others, {
          ...match,
          red: {
            ...match.red,
            score: match.red.score + 1
          }
        }]
      }
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
    builder.addCase(createAMatch.pending, (state) => {
      state.matchListStatus = 'loading'
    })
    builder.addCase(createAMatch.rejected, (state, action) => {
      state.matchListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.matchList = matchInitialState.matchList
    })
    builder.addCase(createAMatch.fulfilled, (state, action) => {
      const { id, blue, red, status } = action.payload
      state.matchListStatus = 'success'
      state.matchList = [...state.matchList, { id, blue, red, status }]
    })
    builder.addCase(editAMatch.pending, (state) => {
      state.matchListStatus = 'loading'
    })
    builder.addCase(editAMatch.rejected, (state, action) => {
      state.matchListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.matchList = matchInitialState.matchList
    })
    builder.addCase(editAMatch.fulfilled, (state, action) => {
      const { id, blue, red, status } = action.payload
      state.matchListStatus = 'success'
      const matchList = [...state.matchList]
      const updatedMatchList = matchList
        .map(match =>
          match.id === id
            ? { ...match, blue, red, status }
            : { ...match }
        )
      updatedMatchList.sort((a, b) => a.id - b.id)
      state.matchList = [...updatedMatchList]
    })
    builder.addCase(deleteAMatch.pending, (state) => {
      state.matchListStatus = 'loading'
    })
    builder.addCase(deleteAMatch.rejected, (state, action) => {
      state.matchListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.matchList = matchInitialState.matchList
    })
    builder.addCase(deleteAMatch.fulfilled, (state, action) => {
      const { id } = action.payload
      state.matchListStatus = 'success'
      state.matchList = [...state.matchList].filter(match => match.id !== id)
    })
    builder.addCase(retrieveAMatch.pending, (state) => {
      state.matchListStatus = 'loading'
    })
    builder.addCase(retrieveAMatch.rejected, (state, action) => {
      state.matchListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.matchList = matchInitialState.matchList
    })
    builder.addCase(retrieveAMatch.fulfilled, (state, action) => {
      const data = action.payload
      state.matchListStatus = 'success'
      const matches = state.matchList.filter(match => match.id !== data.id)
      state.matchList = [...matches, data]
    })
  }
})

export const {
  clearMatchState,
  setErrorMessage,
  addGoal,
  clearErrorMessage
} = match.actions

export const selectMatchListStatus = (state: State): State['matchInfo']['matchListStatus'] => state.matchInfo.matchListStatus
export const selectMatchList = (state: State): State['matchInfo']['matchList'] => state.matchInfo.matchList
export const selectErrorMessage = (state: State): State['matchInfo']['errorMessage'] => state.matchInfo.errorMessage
