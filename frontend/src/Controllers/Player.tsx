import { type FC, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { setComponent } from '../Store/util'
import { selectToken } from '../Store/users'
import { clearPlayerState, retrieveThePlayerStats, selectErrorMessage, selectPlayerStatsStatus, setErrorMessage } from '../Store/player'
import ErrorComponent from '../Components/Error'
import PlayerPage from '../Components/PlayerPage'
import Loader from '../Components/Loader'

const Player: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const playerStatStatus = useAppSelector(selectPlayerStatsStatus)

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearPlayerState())
    navigate('/')
  }, [dispatch, navigate])

  const goBackToPlayerPage = useCallback(() => {
    dispatch(setComponent('players'))
    navigate('/')
  }, [dispatch, navigate])

  if (id === undefined || isNaN(Number(id))) return <ErrorComponent msg='invalid Player id' clearError={clearError} />

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveThePlayerStats({ token, id: Number(id) }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch, id])

  if (playerStatStatus === 'loading') {
    return <Loader />
  }

  if (playerStatStatus === 'error') {
    const msg = errorMessage === '' ? 'player stats error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  return <PlayerPage goBackToPlayerPage={goBackToPlayerPage} />
}

export default Player
