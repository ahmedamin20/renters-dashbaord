import React from 'react'
import { tokens } from '../theme';
import { Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const GreenButton = ({ disabled, onClick,text }) => {
    const {t} = useTranslation()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
  return (
    <Button
    disabled={disabled ? true : false}
    variant="contained"
      sx={{ background: `${colors.greenAccent[600]}`}}
    onClick={onClick}
  >
    {t(text)}
  </Button>
  )
}

export default GreenButton