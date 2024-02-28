import { type FC, useCallback, useEffect, useState } from 'react'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import { setComponent } from '../Store/util'
import {
  clearMatchState,
  createAMatch,
  deleteAMatch,
  editAMatch,
  retrieveMatchList,
  selectErrorMessage,
  selectMatchList,
  selectMatchListStatus,
  setErrorMessage
} from '../Store/match'
import { getHomeButtonStyle, filterMatches } from '../Utils/f'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { retrieveTeamList, selectTeamList } from '../Store/team'
import { ToastContainer, toast } from 'react-toastify'
import { dismissMatchNotification, selectSseNotifications } from '../Store/sse'
import Scrollbar from 'react-perfect-scrollbar'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import useMatchNotifications from '../Hooks/useMatchNotifications'
import CustomOptionsModal from '../Components/CustomOptionsModal'
import MatchList from '../Components/MatchList'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import * as Yup from 'yup'
import 'react-perfect-scrollbar/dist/css/styles.css'

const Matches: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const matchListStatus = useAppSelector(selectMatchListStatus)
  const matchList = useAppSelector(selectMatchList)
  const teamList = useAppSelector(selectTeamList)
  const onGoingMatchId = matchList.find(match => match.status === 'ongoing')?.id ?? 0
  const notification = useAppSelector(selectSseNotifications)

  const [isOnGoingFoldableOpen, setOnGoingIsFoldableOpen] = useState<boolean>(true)
  const [isEndedFoldableOpen, setEndedIsFoldableOpen] = useState<boolean>(false)
  const [isPreparingFoldableOpen, setPreparingIsFoldableOpen] = useState<boolean>(false)
  const [createMatch, setCreateMatch] = useState<boolean>(false)
  const [editMatch, setEditMatch] = useState<number>(0)
  const [deleteMatch, setDeleteMatch] = useState<number>(0)

  const matchSchema = Yup.object().shape({
    blue: Yup.string()
      .required(t('matches.blueRequired'))
      .notOneOf([Yup.ref('red')], t('matches.sameOption')),
    red: Yup.string()
      .required(t('matches.redRequired'))
      .notOneOf([Yup.ref('blue')], t('matches.sameOption'))
  })

  const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate }
  } = useForm<MatchInputs>({
    resolver: yupResolver(matchSchema),
    defaultValues: {
      blue: '',
      red: ''
    }
  })

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    setValue,
    reset: resetEdit,
    formState: { errors: errorsEdit }
  } = useForm<MatchInputs>({
    resolver: yupResolver(matchSchema),
    defaultValues: {
      blue: '',
      red: ''
    }
  })

  const matchToEdit = useCallback((id: number) => {
    const match = matchList.find(m => m.id === id)
    if (match === undefined) return
    setValue('blue', String(match.blue.id) ?? '')
    setValue('red', String(match.red.id) ?? '')
    setEditMatch(id)
  }, [setValue, matchList])

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearMatchState())
  }, [dispatch])

  const goToTeamPage = useCallback((id: number) => {
    navigate(`/team/${id}`)
  }, [navigate])

  const goToLiveMatch = useCallback((id: number) => {
    navigate(`/match/${id}`)
  }, [navigate])

  const goToStats = useCallback(() => {
    dispatch(setComponent('stats'))
  }, [dispatch])

  const toggleOnGoingFoldable = useCallback(() => {
    setOnGoingIsFoldableOpen(!isOnGoingFoldableOpen)
  }, [isOnGoingFoldableOpen])

  const toggleEndedFoldable = useCallback(() => {
    setEndedIsFoldableOpen(!isEndedFoldableOpen)
  }, [isEndedFoldableOpen])

  const togglePreparingFoldable = useCallback(() => {
    setPreparingIsFoldableOpen(!isPreparingFoldableOpen)
  }, [isPreparingFoldableOpen])

  const openCreateMatch = useCallback(() => {
    setCreateMatch(true)
  }, [])

  const closeCreateMatch = useCallback(() => {
    resetCreate()
    setCreateMatch(false)
  }, [resetCreate])

  const closeEditMatch = useCallback(() => {
    setEditMatch(0)
  }, [])

  const matchToDelete = useCallback((id: number) => {
    setDeleteMatch(id)
  }, [])

  const closeDeleteMatch = useCallback(() => {
    setDeleteMatch(0)
  }, [])

  const handleDelete = useCallback(async () => {
    if (deleteMatch === 0) return
    try {
      await dispatch(deleteAMatch({ token, id: String(deleteMatch) }))
      setDeleteMatch(0)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [deleteMatch, dispatch, token])

  const onSubmitCreate: SubmitHandler<MatchInputs> = useCallback(async (data) => {
    try {
      const red = Number(data.red)
      const blue = Number(data.blue)
      if (isNaN(blue) || isNaN(red)) throw new Error('validation error')

      await dispatch(createAMatch({ blue, red, token }))
      setCreateMatch(false)
      resetCreate()
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, resetCreate, token])

  const onSubmitEdit: SubmitHandler<MatchInputs> = useCallback(async (data) => {
    try {
      const blue = Number(data.blue)
      const red = Number(data.red)
      if (isNaN(red) || isNaN(blue)) throw new Error('validation error')

      await dispatch(editAMatch({ token, blue, red, id: String(editMatch) }))
      setEditMatch(0)
      resetEdit()
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, editMatch, resetEdit, token])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveTeamList({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveMatchList({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  useEffect(() => {
    if (notification[onGoingMatchId]?.message !== '') {
      toast.success(notification[onGoingMatchId]?.message, {
        position: 'top-center',
        autoClose: 5000
      })
      dispatch(dismissMatchNotification({ matchid: onGoingMatchId }))
    }
  }, [dispatch, onGoingMatchId, t, notification])

  useMatchNotifications(token)

  if (matchListStatus === 'loading') {
    return <Loader />
  }

  if (matchListStatus === 'error') {
    const msg = errorMessage === '' ? 'match list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const buttonStyle = getHomeButtonStyle(theme)

  const { onGoing, ended, preparing } = filterMatches(matchList)

  const options = teamList.map(team => ({
    id: team.id,
    name: team.name
  }))

  return (
    <Stack
      display='flex'
      width='80%'
      height='100%'
      alignItems='center'
      alignSelf='center'
      justifyContent='center'
      color={theme.palette.primary.contrastText}
      bgcolor={theme.palette.primary.main}
    >
      <ToastContainer position="top-center" autoClose={5000} />
      <Box display='flex' width='90%' flexDirection='row' height='12%' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6'>{t('matches.title')}</Typography>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, width: '20%' }}
          fullWidth onClick={openCreateMatch}
          endIcon={<SportsSoccerIcon />}
        >
          {t('matches.create')}
        </Button>
      </Box>
      <Stack width='90%' height='88%' spacing={2}>
        <CustomOptionsModal
          onClose={closeCreateMatch}
          handleSubmit={handleSubmitCreate}
          onSubmit={onSubmitCreate}
          open={createMatch}
          control={controlCreate}
          firstError={errorsCreate?.blue}
          secondError={errorsCreate?.red}
          options={options}
          icon={<SportsSoccerIcon />}
          name="match"
          firstLabel="blue"
          secondLabel="red"
          title={t('matches.createTitle')}
          editText={t('matches.create')}
        />
        <CustomOptionsModal
          onClose={closeEditMatch}
          handleSubmit={handleSubmitEdit}
          onSubmit={onSubmitEdit}
          open={Boolean(editMatch)}
          control={controlEdit}
          firstError={errorsEdit?.blue}
          secondError={errorsEdit?.red}
          options={options}
          icon={<SportsSoccerIcon />}
          name="match"
          firstLabel="blue"
          secondLabel="red"
          title={t('matches.editTitle')}
          editText={t('matches.edit')}
        />
        <ConfirmationDialog
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          confirm={handleDelete}
          undo={closeDeleteMatch}
          open={Boolean(deleteMatch)}
          title={t('matches.deletedTitle')}
          dialogText={`${t('matches.dialogText')}'${deleteMatch}'`}
        />
        <Scrollbar style={{ maxHeight: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <MatchList
            matches={onGoing}
            isOpen={isOnGoingFoldableOpen}
            title={t('matches.onGoing')}
            goToStats={goToStats}
            toggle={toggleOnGoingFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            testIdLabel="matches-ongoing"
          />
          <MatchList
            matches={preparing}
            isOpen={isPreparingFoldableOpen}
            title={t('matches.preparing')}
            goToStats={goToStats}
            toggle={togglePreparingFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            matchToEdit={matchToEdit}
            matchToDelete={matchToDelete}
            testIdLabel="matches-preparing"
          />
          <MatchList
            matches={ended}
            isOpen={isEndedFoldableOpen}
            title={t('matches.ended')}
            goToStats={goToStats}
            toggle={toggleEndedFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            matchToDelete={matchToDelete}
            testIdLabel="matches-ended"
          />
        </Scrollbar>
      </Stack>
    </Stack >
  )
}

export default Matches
