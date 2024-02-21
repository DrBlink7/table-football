import { useCallback, type FC, useState, useEffect } from 'react'
import { Stack, Box, useTheme, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import {
  clearErrorMessage,
  createAPlayer,
  deleteAPlayer,
  editAPlayer,
  retrievePlayerList,
  selectErrorMessage,
  selectPlayerList,
  selectPlayerListStatus,
  setErrorMessage
} from '../Store/player'
import { formatDataForTable, getHomeButtonStyle } from '../Utils/f'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import CustomTable from './CustomTable'
import CustomModal from './CustomModal'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import ConfirmationDialog from '../Components/ConfirmationDialog'
import * as Yup from 'yup'

const Players: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const playerListStatus = useAppSelector(selectPlayerListStatus)
  const playerList = useAppSelector(selectPlayerList)

  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [createPlayer, setCreatePlayer] = useState<boolean>(false)
  const [editPlayer, setEditPlayer] = useState<boolean>(false)
  const [deletePlayer, setDeletePlayer] = useState<boolean>(false)

  const schema = Yup.object().shape({
    player: Yup.string()
      .test('safe-string', t('Player.validationError'), (value) => !((value !== null && value !== undefined) && /[<>&'"]/.test(value)))
  })

  const {
    control: controlCreate, handleSubmit: handleSubmitCreate, formState: { errors: errorsCreate }, reset: resetCreate
  } = useForm<PlayerInputs>({
    resolver: yupResolver(schema),
    defaultValues: { player: '' }
  })

  const {
    control: controlEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue, reset: resetEdit
  } = useForm<PlayerInputs>({
    resolver: yupResolver(schema),
    defaultValues: { player: '' }
  })

  const handleRowSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!Boolean(value) || isNaN(Number(value))) return
    setSelectedRow(Number(value))
    setValue('player', playerList.find(player => player.id === Number(value))?.name ?? '')
  }, [playerList, setValue])

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage())
  }, [dispatch])

  const goToPlayerPage = useCallback(() => {
    if (!Boolean(selectedRow)) return
    navigate(`/player/${selectedRow}`)
  }, [navigate, selectedRow])

  const openCreatePlayer = useCallback(() => {
    setCreatePlayer(true)
  }, [])

  const closeCreatePlayer = useCallback(() => {
    setCreatePlayer(false)
  }, [])

  const openEditPlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setEditPlayer(true)
  }, [selectedRow])

  const closeEditPlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setEditPlayer(false)
  }, [selectedRow])

  const openDeletePlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeletePlayer(true)
  }, [selectedRow])

  const closeDeletePlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeletePlayer(false)
  }, [selectedRow])

  const handleDelete = useCallback(async () => {
    if (!Boolean(selectedRow)) return
    try {
      await dispatch(deleteAPlayer({ token, id: String(selectedRow) }))
      setDeletePlayer(false)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, selectedRow, token])

  const onSubmitCreate: SubmitHandler<PlayerInputs> = useCallback(async (data) => {
    try {
      const name = data.player
      if (name === undefined) return

      await dispatch(createAPlayer({ token, name }))
      setCreatePlayer(false)
      resetCreate()
      setSelectedRow(null)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, resetCreate, token])

  const onSubmitEdit: SubmitHandler<PlayerInputs> = useCallback(async (data) => {
    try {
      const name = data.player
      if (name === undefined || !Boolean(selectedRow)) return

      await dispatch(editAPlayer({ token, name, id: String(selectedRow) }))
      setEditPlayer(false)
      resetEdit()
      setSelectedRow(null)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, resetEdit, selectedRow, token])

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

  if (playerListStatus === 'loading') {
    return <Loader />
  }

  if (playerListStatus === 'error') {
    const msg = errorMessage === '' ? 'player list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const { rows, columns } = formatDataForTable(playerList, t, 'Player')
  const buttonStyle = getHomeButtonStyle(theme)

  return <Stack
    display='flex'
    width='80%'
    height='100%'
    color={theme.palette.primary.contrastText}
    bgcolor={theme.palette.primary.main}
    data-testid="players-list"
  >
    <Box display='flex' width='98%' alignSelf='center' flexDirection='column' height='100%'>
      <Box display='flex' width='100%' alignItems='center' justifyContent='center' height='5%'>
        <Typography>{t('Player.title')}</Typography>
      </Box>
      <CustomTable rows={rows} columns={columns} selectedRow={selectedRow} handleRowSelect={handleRowSelect} />
      <Box display='flex' width='100%' flexDirection='row' height='12%' justifyContent='space-between' alignItems='center'>
        <Button variant="contained" sx={buttonStyle} onClick={openCreatePlayer}>
          {t('Player.create')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openEditPlayer}>
          {t('Player.edit')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openDeletePlayer}>
          {t('Player.delete')}
        </Button>
        <Button variant="contained" disabled={!Boolean(selectedRow)} onClick={goToPlayerPage} sx={buttonStyle}>
          {t('Player.browse')}
        </Button>
      </Box>
      <ConfirmationDialog
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        confirm={handleDelete}
        undo={closeDeletePlayer}
        open={deletePlayer}
        title={t('deletePlayer.title')}
        dialogText={`${t('deletePlayer.dialogText')}'${selectedRow}'`} />
      <CustomModal
        onClose={closeCreatePlayer}
        handleSubmit={handleSubmitCreate}
        onSubmit={onSubmitCreate}
        open={createPlayer}
        control={controlCreate}
        errors={errorsCreate?.player}
        title={t('Player.create')}
        editText={t('Player.createButton')}
        name="player" />
      <CustomModal
        onClose={closeEditPlayer}
        handleSubmit={handleSubmitEdit}
        onSubmit={onSubmitEdit}
        open={editPlayer}
        control={controlEdit}
        errors={errorsEdit?.player}
        title={t('Player.edit')}
        editText={t('Player.editButton')}
        name="player" />
    </Box>
  </Stack>
}

export default Players
