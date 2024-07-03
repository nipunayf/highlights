import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { TransitionProps } from '@mui/material/transitions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Confetti from 'react-confetti';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'; // Added import for Typography

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  handleClose: (agree: boolean) => void;
}

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#2196f3',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

const StyledDialogContent = styled(DialogContent)({
  padding: '20px',
});

const StyledDialogActions = styled(DialogActions)({
  justifyContent: 'space-between',
});

const StyledSubmitButton = styled(Button)({
  backgroundColor: '#2196f3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
});

const EmojiButton = styled(Button)({
  minWidth: '50px',
});

export default function AlertDialogSlide({ open, handleClose }: AlertDialogSlideProps) {
  const [formData, setFormData] = React.useState({
    q1: '',
    q2: '',
  });
  const [showConfetti, setShowConfetti] = React.useState(false);

  const handleEmojiClick = (rating: string) => {
    setFormData({ ...formData, q1: rating });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // Replace with your submission logic
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      handleClose(true);
    }, 3000); // Show confetti for 3 seconds
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {showConfetti && <Confetti />}
      <StyledDialogTitle id="alert-dialog-slide-title">
        Task Completion Form
      </StyledDialogTitle>
      <form onSubmit={handleSubmit}>
        <StyledDialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                How would you rate the complexity of this task?
              </Typography>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <EmojiButton onClick={() => handleEmojiClick('1')}>
                    <SentimentVeryDissatisfiedIcon
                      color={formData.q1 === '1' ? 'primary' : 'inherit'}
                    />
                  </EmojiButton>
                </Grid>
                <Grid item>
                  <EmojiButton onClick={() => handleEmojiClick('2')}>
                    <SentimentDissatisfiedIcon
                      color={formData.q1 === '2' ? 'primary' : 'inherit'}
                    />
                  </EmojiButton>
                </Grid>
                <Grid item>
                  <EmojiButton onClick={() => handleEmojiClick('3')}>
                    <SentimentNeutralIcon
                      color={formData.q1 === '3' ? 'primary' : 'inherit'}
                    />
                  </EmojiButton>
                </Grid>
                <Grid item>
                  <EmojiButton onClick={() => handleEmojiClick('4')}>
                    <SentimentSatisfiedIcon
                      color={formData.q1 === '4' ? 'primary' : 'inherit'}
                    />
                  </EmojiButton>
                </Grid>
                <Grid item>
                  <EmojiButton onClick={() => handleEmojiClick('5')}>
                    <SentimentVerySatisfiedIcon
                      color={formData.q1 === '5' ? 'primary' : 'inherit'}
                    />
                  </EmojiButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Did you encounter any issues?
              </Typography>
              <TextField
                margin="dense"
                id="q2"
                name="q2"
                label="Briefly describe any issues"
                fullWidth
                variant="outlined"
                value={formData.q2}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
        </StyledDialogActions>
      </form>
    </Dialog>
  );
}
