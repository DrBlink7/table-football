import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem } from '@mui/material'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

interface LanguageSelectorProps {
  width?: string
  height?: string
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ width, height }) => {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string | undefined): Promise<void> => {
    await i18n.changeLanguage(lng)
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    const selectedLanguage = event.target.value
    void changeLanguage(selectedLanguage)
  }

  return (
    <Box display="flex" height={height ?? '100%'} justifyContent="center" width="100%" >
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        variant="outlined"
        sx={{
          display: 'flex',
          width
        }}
      >
        <MenuItem value="en">🇬🇧🇨🇦 English 🇦🇺🇺🇸</MenuItem>
        <MenuItem value="it">🇮🇹🇸🇲 Italiano 🇻🇦🇮🇹</MenuItem>
      </Select>
    </Box>
  )
}

export default LanguageSelector
