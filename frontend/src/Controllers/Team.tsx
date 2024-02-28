import { type FC, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { setComponent } from '../Store/util'
import { selectToken } from '../Store/users'
import { clearTeamState, retrieveTheTeamStats, selectErrorMessage, selectTeamStatsStatus, setErrorMessage } from '../Store/team'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import ErrorComponent from '../Components/Error'
import TeamPage from '../Components/TeamPage'
import Loader from '../Components/Loader'
import 'react-toastify/dist/ReactToastify.css'

const Team: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { t } = useTranslation()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const teamStatStatus = useAppSelector(selectTeamStatsStatus)

  const [isOnGoingFoldableOpen, setOnGoingIsFoldableOpen] = useState<boolean>(true)
  const [isEndedFoldableOpen, setEndedIsFoldableOpen] = useState<boolean>(false)
  const [isPreparingFoldableOpen, setPreparingIsFoldableOpen] = useState<boolean>(false)

  const toggleOnGoingFoldable = useCallback(() => {
    setOnGoingIsFoldableOpen(!isOnGoingFoldableOpen)
  }, [isOnGoingFoldableOpen])

  const toggleEndedFoldable = useCallback(() => {
    setEndedIsFoldableOpen(!isEndedFoldableOpen)
  }, [isEndedFoldableOpen])

  const togglePreparingFoldable = useCallback(() => {
    setPreparingIsFoldableOpen(!isPreparingFoldableOpen)
  }, [isPreparingFoldableOpen])

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearTeamState())
    navigate('/')
  }, [dispatch, navigate])

  const goBackToTeamPage = useCallback(() => {
    dispatch(setComponent('team'))
    navigate('/')
  }, [dispatch, navigate])

  const goToTeamPage = useCallback((teamId: number) => {
    if (Number(id) === teamId) {
      toast.info(`${t('team.samePage')}${id}!`)
      return
    }
    navigate(`/team/${teamId}`)
  }, [id, navigate, t])

  const goToLiveMatch = useCallback((id: number) => {
    navigate(`/match/${id}`)
  }, [navigate])

  const goToStats = useCallback(() => {
    dispatch(setComponent('stats'))
    navigate('/')
  }, [dispatch, navigate])

  if (id === undefined || isNaN(Number(id))) return <ErrorComponent msg='invalid Team id' clearError={clearError} />

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveTheTeamStats({ token, id: Number(id) }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch, id])

  if (teamStatStatus === 'loading') {
    return <Loader />
  }

  if (teamStatStatus === 'error') {
    const msg = errorMessage === '' ? 'team stats error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  return <>
    <ToastContainer position="top-center" autoClose={5000} />
    <TeamPage
      goBackToTeamPage={goBackToTeamPage}
      goToStats={goToStats}
      goToLiveMatch={goToLiveMatch}
      goToTeamPage={goToTeamPage}
      togglePreparingFoldable={togglePreparingFoldable}
      toggleEndedFoldable={toggleEndedFoldable}
      toggleOnGoingFoldable={toggleOnGoingFoldable}
      isOnGoingFoldableOpen={isOnGoingFoldableOpen}
      isEndedFoldableOpen={isEndedFoldableOpen}
      isPreparingFoldableOpen={isPreparingFoldableOpen}
    />
  </>
}

export default Team
