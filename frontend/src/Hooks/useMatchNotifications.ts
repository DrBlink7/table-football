import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addMatchNotification } from '../Store/sse'
import { beHost } from '../Utils/config'
import { addGoal } from '../Store/match'

const useMatchNotifications = (userid: string): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    const eventSource = new EventSource(`${beHost}/api/sse?userid=${userid}`)

    eventSource.addEventListener('message', (event) => {
      const data: NotifyMessage = JSON.parse(event.data)
      switch (data.type) {
        case 'goalScored':
          dispatch(addMatchNotification({ matchid: data.matchid, message: data.text }))
          dispatch(addGoal({ matchid: data.matchid, teamid: data.teamid }))
          break
      }
    })

    return () => {
      eventSource.close()
    }
  }, [dispatch, userid])
}

export default useMatchNotifications
