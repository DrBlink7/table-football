import { type FC } from 'react'
import { Box } from '@mui/material'
import errorImage from '../Images/error.jpeg'
import ImageLayout from './ImageLayout'

const ErrorLayout: FC<WithChildren> = ({ children }) => (
  <ImageLayout
    url={errorImage}
    style={{
      width: '100%',
      overflowX: 'hidden',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }} >
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      textAlign='center'
      width='35%'
      padding='4%'
      borderRadius='5%'
      boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }}
    >
      {children}
    </Box>
  </ImageLayout >
)

export default ErrorLayout
