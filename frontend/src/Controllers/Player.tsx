import { useState, type FC, useCallback } from 'react'
import { useTheme } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../Utils/store'
import { setComponent } from '../Store/util'
import ErrorComponent from '../Components/Error'
import PlayerPage from '../Components/PlayerPage'

const Player: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()

  const [teamColor, setTeamColor] = useState<TeamColor>('blue')

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goBackToPlayerPage = useCallback(() => {
    dispatch(setComponent('players'))
    navigate('/')
  }, [dispatch, navigate])

  const changeTeam = useCallback(() => {
    if (teamColor === 'blue') setTeamColor('red')
    else setTeamColor('blue')
  }, [teamColor])

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />

  const blue = theme.palette.primary
  const red = theme.palette.secondary

  return <PlayerPage id={id} teamColor={teamColor} blue={blue} red={red} goBackToPlayerPage={goBackToPlayerPage} changeTeam={changeTeam} />
}

export default Player
