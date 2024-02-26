import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sseInitialState } from '../Utils/store'

export const sse = createSlice({
  name: 'sse',
  initialState: sseInitialState,
  reducers: {
    clearSseState: () => sseInitialState,
    addMatchNotification: (state, action: PayloadAction<{ matchid: number, message: string }>) => {
      const { matchid, message } = action.payload
      const notifications = { ...state.notifications }
      state.notifications = {
        ...notifications,
        [matchid]: {
          message
        }
      }
    },
    dismissMatchNotification: (state, action: PayloadAction<{ matchid: number }>) => {
      const { matchid } = action.payload
      const notifications = { ...state.notifications }
      state.notifications = {
        ...notifications,
        [matchid]: {
          message: ''
        }
      }
    }
  }
})

export const { clearSseState, addMatchNotification, dismissMatchNotification } = sse.actions

export const selectSseNotifications = (state: State): State['sseInfo']['notifications'] => ({ ...state.sseInfo.notifications })
export const selectSseNotificationMatch = (matchid: number) => (state: State) => {
  const notifications = { ...state.sseInfo.notifications }
  if (Boolean(notifications[matchid])) {
    return notifications[matchid] ?? { message: '' }
  }
  return { message: '' }
}
