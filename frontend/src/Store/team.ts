import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, teamInitialState } from '../Utils/store'
import { createTeam, deleteTeam, editTeam, retrieveTeams } from '../Api/team'

type RetrieveTeamListProps = Token

export const retrieveTeamList = createAsyncThunk(
  'retrieveteamList',
  async ({ token }: RetrieveTeamListProps, thunkApi) => {
    try {
      const response = await retrieveTeams(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveTeamList error'
      )
    }
  }
)

type CreateATeamProps = Token & {
  striker: number
  defender: number
}

export const createATeam = createAsyncThunk(
  'createATeam',
  async ({ token, striker, defender }: CreateATeamProps, thunkApi) => {
    try {
      const response = await createTeam(token, defender, striker)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'createATeam error'
      )
    }
  }
)

type EditATeamProps = Token & {
  striker: number
  defender: number
  id: string
}

export const editATeam = createAsyncThunk(
  'editATeam',
  async ({ token, id, defender, striker }: EditATeamProps, thunkApi) => {
    try {
      const response = await editTeam(token, id, defender, striker)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'editATeam error'
      )
    }
  }
)

type DeleteATeamProps = Token & {
  id: string
}

export const deleteATeam = createAsyncThunk(
  'deleteATeam',
  async ({ token, id }: DeleteATeamProps, thunkApi) => {
    try {
      const response = await deleteTeam(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'deleteATeam error'
      )
    }
  }
)

export const team = createSlice({
  name: 'team',
  initialState: teamInitialState,
  reducers: {
    clearTeamState: () => teamInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: TeamStore['errorMessage'] }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveTeamList.pending, (state) => {
      state.teamListStatus = 'loading'
    })
    builder.addCase(retrieveTeamList.rejected, (state, action) => {
      state.teamListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.teamList = teamInitialState.teamList
    })
    builder.addCase(retrieveTeamList.fulfilled, (state, action) => {
      const data = action.payload
      state.teamListStatus = 'success'
      state.teamList = data
    })
    builder.addCase(createATeam.pending, (state) => {
      state.teamListStatus = 'loading'
    })
    builder.addCase(createATeam.rejected, (state, action) => {
      state.teamListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.teamList = teamInitialState.teamList
    })
    builder.addCase(createATeam.fulfilled, (state, action) => {
      const { id, defender, striker } = action.payload
      state.teamListStatus = 'success'
      state.teamList = [...state.teamList, { id, defender, striker }]
    })
    builder.addCase(editATeam.pending, (state) => {
      state.teamListStatus = 'loading'
    })
    builder.addCase(editATeam.rejected, (state, action) => {
      state.teamListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.teamList = teamInitialState.teamList
    })
    builder.addCase(editATeam.fulfilled, (state, action) => {
      const { id, defender, striker } = action.payload
      state.teamListStatus = 'success'
      const playerList = [...state.teamList]
      const updatedPlayerList = playerList
        .map(player =>
          player.id === id
            ? { ...player, defender, striker }
            : { ...player }
        )
      updatedPlayerList.sort((a, b) => a.id - b.id)
      state.teamList = [...updatedPlayerList]
    })
    builder.addCase(deleteATeam.pending, (state) => {
      state.teamListStatus = 'loading'
    })
    builder.addCase(deleteATeam.rejected, (state, action) => {
      state.teamListStatus = 'error'
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
      state.teamList = teamInitialState.teamList
    })
    builder.addCase(deleteATeam.fulfilled, (state, action) => {
      const { id } = action.payload
      state.teamListStatus = 'success'
      state.teamList = [...state.teamList].filter(player => player.id !== id)
    })
  }
})

export const {
  clearTeamState,
  setErrorMessage,
  clearErrorMessage
} = team.actions

export const selectTeamListStatus = (state: State): State['teamInfo']['teamListStatus'] => state.teamInfo.teamListStatus
export const selectTeamList = (state: State): State['teamInfo']['teamList'] => state.teamInfo.teamList
export const selectErrorMessage = (state: State): State['teamInfo']['errorMessage'] => state.teamInfo.errorMessage
