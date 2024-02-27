import { useState, useCallback, useEffect, type FC, type ChangeEvent } from 'react'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { useNavigate } from 'react-router-dom'
import { selectToken } from '../Store/users'
import { formatDataForTable, getHomeButtonStyle } from '../Utils/f'
import {
  clearTeamState,
  createATeam,
  deleteATeam,
  editATeam,
  retrieveTeamList,
  selectErrorMessage,
  selectTeamList,
  selectTeamListStatus,
  setErrorMessage
} from '../Store/team'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { setComponent } from '../Store/util'
import { clearErrorMessage, retrievePlayerList, selectPlayerList, selectPlayerListStatus } from '../Store/player'
import CustomTable from './CustomTable'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import CustomOptionsModal from './CustomOptionsModal'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import * as Yup from 'yup'

const Teams: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const teamListStatus = useAppSelector(selectTeamListStatus)
  const teamList = useAppSelector(selectTeamList)
  const playerListStatus = useAppSelector(selectPlayerListStatus)
  const errorMessagePlayer = useAppSelector(selectErrorMessage)
  const playerList = useAppSelector(selectPlayerList)

  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [createTeam, setCreateTeam] = useState<boolean>(false)
  const [editTeam, setEditTeam] = useState<boolean>(false)
  const [deleteTeam, setDeleteTeam] = useState<boolean>(false)

  const teamSchema = Yup.object().shape({
    striker: Yup.string()
      .required(t('Team.strikerRequired'))
      .notOneOf([Yup.ref('defender')], t('Team.sameOption')),
    defender: Yup.string()
      .required(t('Team.defenderRequired'))
      .notOneOf([Yup.ref('striker')], t('Team.sameOption')),
    name: Yup.string().required(t('Team.nameRequired'))
  })

  const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate }
  } = useForm<TeamInputs>({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      striker: '',
      defender: '',
      name: ''
    }
  })

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    setValue,
    reset: resetEdit,
    formState: { errors: errorsEdit }
  } = useForm<TeamInputs>({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      striker: '',
      defender: ''
    }
  })

  const handleRowSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!Boolean(value) || isNaN(Number(value))) return
    setSelectedRow(Number(value))
    const team = teamList.find(t => t.id === Number(value))
    if (team === undefined) return

    setValue('defender', String(team.defender.id) ?? '')
    setValue('striker', String(team.striker.id) ?? '')
    setValue('name', String(team.name) ?? '')
  }, [setValue, teamList])

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearTeamState())
    dispatch(clearErrorMessage())
  }, [dispatch])

  const goToTeamPage = useCallback(() => {
    if (!Boolean(selectedRow)) return
    navigate(`/team/${selectedRow}`)
  }, [navigate, selectedRow])

  const openCreateTeam = useCallback(() => {
    setCreateTeam(true)
  }, [])

  const closeCreateTeam = useCallback(() => {
    resetCreate()
    setCreateTeam(false)
  }, [resetCreate])

  const openEditTeam = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setEditTeam(true)
  }, [selectedRow])

  const closeEditTeam = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setEditTeam(false)
  }, [selectedRow])

  const openDeleteTeam = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeleteTeam(true)
  }, [selectedRow])

  const closeDeleteTeam = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeleteTeam(false)
  }, [selectedRow])

  const handleDelete = useCallback(async () => {
    if (!Boolean(selectedRow)) return
    try {
      await dispatch(deleteATeam({ token, id: String(selectedRow) }))
      setDeleteTeam(false)
      setSelectedRow(null)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, selectedRow, token])

  const onSubmitCreate: SubmitHandler<TeamInputs> = useCallback(async (data) => {
    try {
      const striker = Number(data.striker)
      const defender = Number(data.defender)
      if (isNaN(striker) || isNaN(defender)) throw new Error('validation error')

      await dispatch(createATeam({ defender, striker, token, name: data.name }))
      setCreateTeam(false)
      resetCreate()
      setSelectedRow(null)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, resetCreate, token])

  const onSubmitEdit: SubmitHandler<TeamInputs> = useCallback(async (data) => {
    try {
      const defender = Number(data.defender)
      const striker = Number(data.striker)
      if (isNaN(striker) || isNaN(defender)) throw new Error('validation error')

      await dispatch(editATeam({ token, defender, id: String(selectedRow), striker, name: data.name }))
      setEditTeam(false)
      resetEdit()
      setSelectedRow(null)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, resetEdit, selectedRow, token])

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
        await dispatch(retrievePlayerList({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  if (teamListStatus === 'loading' || playerListStatus === 'loading') {
    return <Loader />
  }

  if (teamListStatus === 'error') {
    const msg = errorMessage === '' ? 'team list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  if (playerListStatus === 'error') {
    const msg = errorMessagePlayer === '' ? 'player list error' : errorMessagePlayer

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const { rows, columns } = formatDataForTable(teamList, t, 'Team')
  const buttonStyle = getHomeButtonStyle(theme)

  return <Stack
    display='flex'
    width='80%'
    height='100%'
    color={theme.palette.primary.contrastText}
    bgcolor={theme.palette.primary.main}
    data-testid="teams-list"
  >
    <Box display='flex' width='98%' alignSelf='center' flexDirection='column' height='100%'>
      <Box display='flex' width='100%' alignItems='center' justifyContent='center' height='5%'>
        <Typography>{t('Team.title')}</Typography>
      </Box>
      <CustomTable rows={rows} columns={columns} selectedRow={selectedRow} handleRowSelect={handleRowSelect} />
      <Box display='flex' width='100%' flexDirection='row' height='12%' justifyContent='space-between' alignItems='center'>
        <Button variant="contained" sx={buttonStyle} onClick={openCreateTeam}>
          {t('Team.create')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openEditTeam}>
          {t('Team.edit')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openDeleteTeam}>
          {t('Team.delete')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={goToTeamPage}>
          {t('Team.browse')}
        </Button>
      </Box>
      <ConfirmationDialog
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        confirm={handleDelete}
        undo={closeDeleteTeam}
        open={deleteTeam}
        title={t('deleteTeam.title')}
        dialogText={`${t('deleteTeam.dialogText')}'${selectedRow}'`}
      />
      <CustomOptionsModal
        onClose={closeCreateTeam}
        handleSubmit={handleSubmitCreate}
        onSubmit={onSubmitCreate}
        open={createTeam}
        control={controlCreate}
        firstError={errorsCreate?.defender}
        secondError={errorsCreate?.striker}
        thirdError={errorsCreate?.name}
        options={playerList}
        name="team"
        firstLabel="defender"
        secondLabel="striker"
        thirdLabel='name'
        title={t('Team.create')}
        editText={t('Team.createButton')}
      />
      <CustomOptionsModal
        onClose={closeEditTeam}
        handleSubmit={handleSubmitEdit}
        onSubmit={onSubmitEdit}
        open={editTeam}
        control={controlEdit}
        firstError={errorsEdit?.defender}
        secondError={errorsEdit?.striker}
        thirdError={errorsEdit?.name}
        options={playerList}
        name="team"
        firstLabel="defender"
        secondLabel="striker"
        thirdLabel='name'
        title={t('Team.edit')}
        editText={t('Team.editButton')}
      />
    </Box>
  </Stack>
}

export default Teams
