import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [formData, setFormData] = React.useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // Replace with your submission logic
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ backgroundColor: '#2196f3', color: '#fff', textAlign: 'center' }} id="alert-dialog-slide-title">
        Task Completion Form
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="q1"
                name="q1"
                label="How often do you encounter tasks that you would consider highly complex?"
                fullWidth
                variant="outlined"
                value={formData.q1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="q2"
                name="q2"
                label="How do you define or perceive task complexity in your work?"
                fullWidth
                variant="outlined"
                value={formData.q2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="q3"
                name="q3"
                label="How often do tasks take longer or shorter than expected?"
                fullWidth
                variant="outlined"
                value={formData.q3}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="q4"
                name="q4"
                label="Do you feel you have enough time to thoroughly complete your tasks without rushing?"
                fullWidth
                variant="outlined"
                value={formData.q4}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="q5"
                name="q5"
                label="Did you need additional time to complete the task? If so, how much more time did you need?"
                fullWidth
                variant="outlined"
                value={formData.q5}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="q6"
                name="q6"
                label="Do you think the time provided matched the complexity of the task?"
                fullWidth
                variant="outlined"
                value={formData.q6}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" sx={{ backgroundColor: '#2196f3', color: '#fff', '&:hover': { backgroundColor: '#1976d2' } }}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
