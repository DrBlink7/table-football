import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, userInitialState } from '../Utils/store'
import { authenticateEmail } from '../Api/login'

interface AuthenticateUserProps {
  email: string
  password: string
}

export const authenticateUser = createAsyncThunk(
  'users/authenticate',
  async ({ email, password }: AuthenticateUserProps, thunkApi) => {
    try {
      const response = await authenticateEmail(email, password)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'authenticateUser error'
      )
    }
  }
)

export const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    clearUserState: () => userInitialState,
    logout: (state) => {
      state.isUserLogged = false
    },
    clearUserAuthStatus: (state) => {
      state.authStatus = 'idle'
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.authStatus = 'loading'
    })
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.authStatus = 'error'
      state.isUserLogged = false
      state.user = userInitialState.user
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string' ? action.error : action.payload as string
    })
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.authStatus = 'success'
      state.isUserLogged = true
      state.token = action.payload.token
      state.user.email = action.payload.email
    })
  }
})

export const {
  clearUserState,
  clearUserAuthStatus,
  logout,
  clearErrorMessage,
  setErrorMessage
} = user.actions

export const selectIsUserLogged = (state: State): State['userInfo']['isUserLogged'] => state.userInfo.isUserLogged
export const selectUser = (state: State): State['userInfo']['user'] => state.userInfo.user
export const selectUserInfoStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.authStatus
export const selectToken = (state: State): State['userInfo']['token'] => state.userInfo.token
export const selectErrorMessage = (state: State): State['userInfo']['errorMessage'] => state.userInfo.errorMessage
