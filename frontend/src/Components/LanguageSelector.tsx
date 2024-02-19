import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem, type SxProps, type Theme } from '@mui/material'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

interface LanguageSelectorProps {
  style?: SxProps<Theme>
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ style }) => {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string | undefined): Promise<void> => {
    await i18n.changeLanguage(lng)
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    const selectedLanguage = event.target.value
    void changeLanguage(selectedLanguage)
  }

  return (
    <Box display="flex"
      sx={{
        justifyContent: 'center',
        width: '100%',
        ...style
      }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        variant="outlined"
        sx={{
          display: 'flex'
        }}
      >
        <MenuItem value="en">English</MenuItem>
      </Select>
    </Box>
  )
}

export default LanguageSelector
