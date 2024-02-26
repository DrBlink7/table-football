import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sseInitialState } from '../Utils/store'

export const sse = createSlice({
  name: 'sse',
  initialState: sseInitialState,
  reducers: {
    clearSseState: () => sseInitialState,
    addMatchNotification: (state, action: PayloadAction<{ matchid: number, teamid: number, goal: number, text: string }>) => {
      const { goal, teamid, matchid, text } = action.payload
      const notifications = { ...state.notifications }
      state.notifications = {
        ...notifications,
        [matchid]: {
          ...notifications[matchid],
          [teamid]: {
            goals: Boolean(notifications[matchid]?.[teamid]?.goals) ? notifications[matchid][teamid].goals += goal : goal,
            message: Boolean(notifications[matchid]?.[teamid]?.message) ? [...notifications[matchid][teamid].message, text] : [text]
          }
        }
      }
    }
  }
})

export const { clearSseState, addMatchNotification } = sse.actions

export const selectSseNotifications = (state: State): State['sseInfo']['notifications'] => ({ ...state.sseInfo.notifications })
export const selectSseNotificationMatch = (matchid: number) => (state: State) => {
  const notifications = { ...state.sseInfo.notifications }
  if (Boolean(notifications[matchid])) {
    return notifications[matchid] ?? []
  }
  return []
}
