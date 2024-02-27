import { type FC, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../Utils/store'
import { setComponent } from '../Store/util'
import ErrorComponent from '../Components/Error'
import PlayerPage from '../Components/PlayerPage'

const Player: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goBackToPlayerPage = useCallback(() => {
    dispatch(setComponent('players'))
    navigate('/')
  }, [dispatch, navigate])

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />

  return <PlayerPage id={id} goBackToPlayerPage={goBackToPlayerPage} />
}

export default Player
