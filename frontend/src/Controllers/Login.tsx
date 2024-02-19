import { useState, type FC, useCallback } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'
import {
  CssBaseline,
  Box,
  Avatar,
  TextField,
  Button,
  Stack,
  Typography,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  clearErrorMessage,
  clearUserAuthStatus,
  selectErrorMessage,
  selectUserInfoStatus,
  setErrorMessage,
  authenticateUser
} from '../Store/users'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ErrorComponent from '../Components/Error'
import * as yup from 'yup'

const Login: FC = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const errorMessage = useAppSelector(selectErrorMessage)
  const userInfoStatus = useAppSelector(selectUserInfoStatus)

  const [showPassword, setShowPassword] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t('login.emailRequired'))
      .email(t('login.emailError')),
    password: yup
      .string()
      .required(t('login.passRequired'))
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|^$*.[\]{}()?"!@#%&/\\,><'':;|_~`+=-]).{8,}$/,
        t('login.passError')
      )
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await dispatch(authenticateUser({ email: data.email, password: data.password }))
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const clearError = useCallback(() => {
    dispatch(clearUserAuthStatus())
    dispatch(clearErrorMessage())
    reset()
    navigate('/login')
  }, [dispatch, navigate, reset])

  if (userInfoStatus === 'error') {
    const msg = errorMessage === '' ? 'Authentication error' : errorMessage

    return (
      <ErrorComponent msg={msg} clearError={clearError} />
    )
  }

  return (
    <Stack
      display='flex'
      height='100vh'
      justifyContent='center'
      width='100vw'
      sx={{
        backgroundColor: theme.palette.primary.main
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
          width: '35%',
          padding: '4%',
          borderRadius: '5%',
          minHeight: '50vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
      >
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center'
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"> {t('login.signin')} </Typography>
          <Box>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('login.emailLabel')}
                  data-testid="email-text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  autoFocus
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('login.passLabel')}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  data-testid="password-text"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword(!showPassword)
                            setValue('password', field.value)
                          }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              data-testid="login-button"
              sx={{ mt: 3, mb: 2, fontWeight: 800 }}
              size='large'
            >
              {t('login.signin')}
            </Button>
          </Box>
        </form>
      </Box>
    </Stack >
  )
}

export default Login
