import { type FC, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../Utils/store'
import { setComponent } from '../Store/util'
import ErrorComponent from '../Components/Error'
import MatchPage from '../Components/MatchPage'

const Match: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goBackToMatchPage = useCallback(() => {
    dispatch(setComponent('matches'))
    navigate('/')
  }, [dispatch, navigate])

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />

  return <MatchPage id={id} goBackToMatchPage={goBackToMatchPage} />
}

export default Match
