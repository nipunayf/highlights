import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TransitionProps } from '@mui/material/transitions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import classes from './Addtask_popup.module.css';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddTaskPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskPopup({ open, onClose }: AddTaskPopupProps) {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [timeRange, setTimeRange] = React.useState<[Dayjs | null, Dayjs | null]>([dayjs(), dayjs()]);
  const [reminder, setReminder] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  const handleTimeRangeChange = (newTimeRange: [Dayjs | null, Dayjs | null]) => {
    setTimeRange(newTimeRange);
  };

  const handleReminderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReminder(event.target.value);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAgree = () => {
    console.log(`Title: ${title}, Date: ${date}, Time Range: ${timeRange}, Reminder: ${reminder}, Priority: ${priority}, Description: ${description}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      className={classes['custom-dialog']}
      classes={{ paper: classes['dialog-paper'] }}
    >
      
      <DialogContent>
        <TextField
          margin="dense"
          id="title"
          label="Add Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={handleTitleChange}
          InputLabelProps={{
            className: classes['custom-label'], 
          }}
          className={classes['custom-input']}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={handleDateChange}
          />
          <MultiInputTimeRangeField
            value={timeRange}
            onChange={handleTimeRangeChange}
            slotProps={{
              textField: ({ position }) => ({
                label: position === 'start' ? 'Start Time' : 'End Time',
                fullWidth: true,
                variant: 'standard',
                className: classes['custom-time-picker'],
                InputLabelProps: { className: classes['custom-label'] }
              }),
            }}
          />
        </LocalizationProvider>
        <TextField
          select
          margin="dense"
          id="reminder"
          label="Reminder"
          value={reminder}
          onChange={handleReminderChange}
          fullWidth
          variant="standard"
          className={classes['custom-input']}
          InputLabelProps={{ className: classes['custom-label'] }}
        >
          <MenuItem value="10">Before 10 minutes</MenuItem>
          <MenuItem value="15">Before 15 minutes</MenuItem>
          <MenuItem value="30">Before 30 minutes</MenuItem>
          <MenuItem value="60">Before 1 hour</MenuItem>
        </TextField>
        <TextField
          select
          margin="dense"
          id="priority"
          label="Priority"
          value={priority}
          onChange={handlePriorityChange}
          fullWidth
          variant="standard"
          className={classes['custom-input']}
          InputLabelProps={{ className: classes['custom-label'] }}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="standard"
          value={description}
          onChange={handleDescriptionChange}
          className={classes['custom-textarea']}
          InputLabelProps={{ className: classes['custom-label'] }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={classes['custom-button1']}>Cancel</Button>
        <Button onClick={handleAgree} className={classes['custom-button2']}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
