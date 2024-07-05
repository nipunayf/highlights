import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface FocusPopupProps {
  open: boolean;
  onClose: () => void;
}

const FocusPopup: React.FC<FocusPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Focus</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Start Stopwatch</Typography>
        <Button variant="contained" color="primary">Start</Button>
        <Typography variant="h6" style={{ marginTop: '20px' }}>Start Pomodoro</Typography>
        <Button variant="contained" color="primary">Start</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FocusPopup;
