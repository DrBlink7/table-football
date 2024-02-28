import { type FC, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { setComponent } from '../Store/util'
import { selectToken } from '../Store/users'
import { retrieveAMatch, selectErrorMessage, selectMatchList, selectMatchListStatus, setErrorMessage } from '../Store/match'
import useMatchConnection from '../Hooks/useMatchConnection'
import ErrorComponent from '../Components/Error'
import MatchPage from '../Components/MatchPage'
import Loader from '../Components/Loader'
import LiveMatch from '../Components/LiveMatch'

const Match: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const token = useAppSelector(selectToken)
  const matchList = useAppSelector(selectMatchList)
  const matchListStatus = useAppSelector(selectMatchListStatus)
  const errorMessage = useAppSelector(selectErrorMessage)

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goToTeamPage = useCallback((id: number) => {
    navigate(`/team/${id}`)
  }, [navigate])

  const goBackToMatchPage = useCallback(() => {
    dispatch(setComponent('matches'))
    navigate('/')
  }, [dispatch, navigate])

  useEffect(() => {
    (async () => {
      try {
        if (id === undefined) return
        await dispatch(retrieveAMatch({ token, id }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch, id])

  useMatchConnection(token)

  if (matchListStatus === 'loading') {
    return <Loader />
  }

  if (matchListStatus === 'error') {
    const msg = errorMessage === '' ? 'match list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />
  const match = matchList.find(match => match.id === Number(id))

  if (match === undefined) return <ErrorComponent msg='match id not found' clearError={clearError} />

  return match.status === 'ongoing'
    ? <LiveMatch goBackToMatchPage={goBackToMatchPage} match={match} />
    : <MatchPage goBackToMatchPage={goBackToMatchPage} goToTeamPage={goToTeamPage} match={match} />
}

export default Match
