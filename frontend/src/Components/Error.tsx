import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import ErrorLayout from './ErrorLayout'

interface ErrorComponentProps {
  msg?: string
  clearError: () => void
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  msg = 'Houston!',
  clearError
}) => {
  const { t } = useTranslation()

  return (
    <ErrorLayout>
      <Box
        display='flex'
        flexDirection='column'
      >
        <Typography variant="h1" sx={{ mb: 2.5 }}>
          {t('error.title')}
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 2.5, fontSize: 'large' }}
        >
          {msg}
        </Typography>
        <Typography variant="body2">{t('error.body')}</Typography>
      </Box>
      <Button
        variant="contained"
        onClick={clearError}
        sx={{ marginTop: '2vh', width: '20vw' }}
      >
        {t('error.button')}
      </Button>
    </ErrorLayout>
  )
}

export default ErrorComponent
