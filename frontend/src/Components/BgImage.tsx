import { type FC } from 'react'
import { Stack, type SxProps, type Theme } from '@mui/material'
import bg from '../Images/logo.png'

type BgImageProps = WithChildren & {
  style?: SxProps<Theme>
}

const BgImage: FC<BgImageProps> = ({ style, children }) => (
  <Stack
    sx={{
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      ...style
    }}
  >
    {children}
  </Stack>
)

export default BgImage
