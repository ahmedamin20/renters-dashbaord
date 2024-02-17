import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import ChatIcon from '@mui/icons-material/Chat';
// import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

const ScrollDialog = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box m={2}>
      <Button
        sx={{
          background: colors.greenAccent[700],
          color:colors.grey[100],
          fontWeight: "bold", fontSize: "16px"
        }}
        onClick={handleClickOpen('paper')}>
        {<ChatIcon />}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle display="flex" flexDirection="row" justifyContent="space-between" id="scroll-dialog-title" sx={{fontWeight:"bold", fontSize:"18px"}}><div>{props.name}</div><div>{props.phone}</div></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            sx={{fontWeight:"bold", fontSize:"16px"}}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{
            background: colors.redAccent[600],
            color:colors.grey[100]
          }} onClick={handleClose}>{<CloseIcon/>}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default  ScrollDialog