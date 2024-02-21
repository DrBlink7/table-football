import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface EditModalProps {
  open: any
  defaultValue: any
  onClose: any
  handleSubmit: any
  onSubmit: any
  control: any
  errors: any
  editText: any
  title: any
}

const EditModal: FC<EditModalProps> = ({
  open,
  defaultValue,
  onClose,
  handleSubmit,
  onSubmit,
  control,
  errors,
  editText,
  title
}) => {
  const { t } = useTranslation()

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="message"
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors)}
                  helperText={errors.message ?? ''}
                />
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
    </Modal>
  )
}

export default EditModal
