import { type FC } from 'react'
import { Controller, type Control, type UseFormHandleSubmit, type SubmitHandler, type FieldError } from 'react-hook-form'
import { Modal, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../Utils/store'
import { selectPlayerList } from '../Store/player'

interface CustomTextModalProps {
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: SubmitHandler<any>
  open: boolean
  control: Control<any>
  firstError: FieldError | undefined
  secondError: FieldError | undefined
  name: string
  firstLabel: string
  secondLabel: string
  editText?: string
  title?: string
}

const CustomTextModal: FC<CustomTextModalProps> = ({
  onClose,
  handleSubmit,
  onSubmit,
  open,
  control,
  firstError,
  secondError,
  name,
  firstLabel,
  secondLabel,
  editText,
  title
}) => {
  const { t } = useTranslation()

  const playerList = useAppSelector(selectPlayerList)

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="edit-modal" variant="h6" component="h2">
          {title ?? t('editModal.title')}
        </Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} id={name}>
          <Controller
            name={firstLabel}
            control={control}
            render={({ field }) => (
              <>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label-1">{firstLabel}</InputLabel>
                  <Select
                    {...field}
                    labelId="select-label-1"
                    label={firstLabel}
                    error={Boolean(firstError)}
                  >
                    {playerList.map((player, index) => (
                      <MenuItem key={index} value={String(player.id)}>{player.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {Boolean(firstError) && (
                  <FormHelperText error>{firstError?.message ?? ''}</FormHelperText>
                )}
              </>
            )}
          />
          <Controller
            name={secondLabel}
            control={control}
            render={({ field }) => (
              <>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label-2">{secondLabel}</InputLabel>
                  <Select
                    {...field}
                    labelId="select-label-2"
                    label={secondLabel}
                    error={Boolean(secondError)}
                  >
                    {playerList.map((player, index) => (
                      <MenuItem key={index} value={String(player.id)}>{player.name}</MenuItem>
                    ))}
                  </Select>
                  {Boolean(secondError) && (
                    <FormHelperText error>{secondError?.message ?? ''}</FormHelperText>
                  )}
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {editText ?? t('editModal.edit')}
                </Button>
              </>
            )}
          />
        </form>
      </Box>
    </Modal >
  )
}

export default CustomTextModal
