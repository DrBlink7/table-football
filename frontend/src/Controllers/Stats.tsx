import { useState, useEffect, type FC, useCallback } from 'react'
import { Box, Stack, useTheme, Select, MenuItem, type SelectChangeEvent, Paper, InputLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import {
  clearStatsState,
  retrieveTheRankings,
  retrieveTheDefenders,
  retrieveTheStrikers,
  selectErrorMessage,
  selectRankings,
  selectStatsStatus,
  setErrorMessage,
  selectDefenders,
  selectStrikers
} from '../Store/stats'
import { selectToken } from '../Store/users'
import { setComponent } from '../Store/util'
import { formatDataForTable } from '../Utils/f'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import CustomTable from './CustomTable'

const Stats: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const token = useAppSelector(selectToken)
  const rankinkgs = useAppSelector(selectRankings)
  const defenders = useAppSelector(selectDefenders)
  const strikers = useAppSelector(selectStrikers)
  const statStatus = useAppSelector(selectStatsStatus)
  const errorMessage = useAppSelector(selectErrorMessage)

  const [selectedOption, setSelectedOption] = useState<Stats>('Rankings')

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearStatsState())
  }, [dispatch])

  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as Stats)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (selectedOption === 'Rankings') {
          await dispatch(retrieveTheRankings({ token }))
        } else if (selectedOption === 'Defenders') {
          await dispatch(retrieveTheDefenders({ token }))
        } else if (selectedOption === 'Strikers') {
          await dispatch(retrieveTheStrikers({ token }))
        }
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [selectedOption, token, dispatch])

  if (statStatus === 'loading') {
    return <Loader />
  }

  if (statStatus === 'error') {
    const msg = errorMessage === '' ? 'team list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const { rows: rankingRows, columns: rankingColumns } = formatDataForTable(rankinkgs, t, 'Team')
  const { rows: defenderRows, columns: defenderColumns } = formatDataForTable(defenders, t, 'Player')
  const { rows: strikerRows, columns: strikeColumns } = formatDataForTable(strikers, t, 'Player')

  return <Stack
    display='flex'
    width='80%'
    height='100%'
    alignItems='center'
    color={theme.palette.primary.contrastText}
    bgcolor={theme.palette.primary.main}
    data-testid="stats-list"
  >
    <Box display='flex' width='98%' flexDirection='column' height='100%'>
      <Paper
        sx={{ display: 'flex', width: '100%', height: '8%', justifyContent: 'center', alignItems: 'center', margin: '1vh 0' }}
        elevation={1}
      >
        <InputLabel id="select">{t('stats.label')}</InputLabel>
        <Select value={selectedOption} onChange={handleChange} sx={{ display: 'flex', marginLeft: '2vw', width: '25%' }}>
          <MenuItem value="Rankings">{t('stats.rankings')}</MenuItem>
          <MenuItem value="Defenders">{t('stats.defenders')}</MenuItem>
          <MenuItem value="Strikers">{t('stats.strikers')}</MenuItem>
        </Select>
      </Paper>
      {
        selectedOption === 'Rankings' &&
        <CustomTable
          columns={rankingColumns}
          rows={rankingRows}
          selectable={false}
          defaultOrderBy='points'
          defaultOrder='desc'
          tableHeight='92%'
        />
      }
      {
        selectedOption === 'Defenders' &&
        <CustomTable
          columns={defenderColumns}
          rows={defenderRows}
          selectable={false}
          defaultOrderBy="goalsConcededPerMatch"
          defaultOrder='asc'
          tableHeight='92%'
        />
      }
      {
        selectedOption === 'Strikers' &&
        <CustomTable
          columns={strikeColumns}
          rows={strikerRows}
          selectable={false}
          defaultOrderBy="goalsScoredPerMatch"
          defaultOrder='desc'
          tableHeight='92%'
        />
      }
    </Box>
  </Stack>
}

export default Stats
