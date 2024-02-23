import { type FC, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../Utils/store'
import { setComponent } from '../Store/util'
import ErrorComponent from '../Components/Error'
import TeamPage from '../Components/TeamPage'

const Team: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goBackToTeamPage = useCallback(() => {
    dispatch(setComponent('team'))
    navigate('/')
  }, [dispatch, navigate])

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />

  return <TeamPage id={id} goBackToTeamPage={goBackToTeamPage} />
}

export default Team
