import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  TextField, Select, MenuItem, Button, Typography, Box, Avatar, 
  Paper, Chip, IconButton, Tooltip, LinearProgress, Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import { Divider } from '@mantine/core';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Test: React.FC = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    projectDescription: '',
    startDate: '',
    dueDate: '',
    assignees: '',
    status: '',
    priority: ''
  });
  const [progress, setProgress] = useState('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [newAssignee, setNewAssignee] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tableRows, setTableRows] = useState<number[]>([0]);

  const priorityColors = {
    low: '#4CAF50',
    medium: '#FFC107',
    high: '#F44336'
  };

  const statusColors = {
    not_started: '#F44336',
    in_progress: '#FFC107',
    completed: '#4CAF50'
  };

  useEffect(() => {
    axios.get('/api/project-details')
      .then(response => {
        setProjectDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
      });
  }, []);

  const handleProgressChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProgress(event.target.value as string);
  };

  const handleAddAssignee = () => {
    if (newAssignee.trim() !== '') {
      setAssignees([...assignees, newAssignee.trim()]);
      setNewAssignee('');
    }
  };

  const toggleAssigneeDisplay = (index: number) => {
    const updatedAssignees = [...assignees];
    updatedAssignees[index] = updatedAssignees[index].startsWith('@') ? updatedAssignees[index].substring(1) : `@${updatedAssignees[index]}`;
    setAssignees(updatedAssignees);
  };

  const handleProjectNameClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAddRow = () => {
    setTableRows([...tableRows, tableRows.length]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h4" gutterBottom>Project Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Project Name:</strong> {projectDetails.projectName}</Typography>
              <Typography variant="subtitle1"><strong>Start Date:</strong> {projectDetails.startDate}</Typography>
              <Typography variant="subtitle1">
                <strong>Status:</strong> 
                <Chip 
                  label={projectDetails.status} 
                  sx={{ backgroundColor: statusColors[projectDetails.status as keyof typeof statusColors], color: 'white', marginLeft: 1 }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Due Date:</strong> {projectDetails.dueDate}</Typography>
              <Typography variant="subtitle1">
                <strong>Priority:</strong> 
                <Chip 
                  label={projectDetails.priority} 
                  sx={{ backgroundColor: priorityColors[projectDetails.priority as keyof typeof priorityColors], color: 'white', marginLeft: 1 }}
                />
              </Typography>
              <Typography variant="subtitle1"><strong>Assignees:</strong> {projectDetails.assignees}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}><strong>Description:</strong> {projectDetails.projectDescription}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>Tasks</Typography>
          <TableContainer component={Box} sx={{ maxHeight: '400px', overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Project Name</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Assignees</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Progress</StyledTableCell>
                  <StyledTableCell>Priority</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((rowIndex) => (
                  <StyledTableRow key={rowIndex}>
                    <StyledTableCell>
                      <Autocomplete
                        freeSolo
                        options={['Project A', 'Project B', 'Project C']}
                        renderInput={(params) => (
                          <TextField {...params} onClick={handleProjectNameClick} variant="outlined" size="small" />
                        )}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DatePicker
                        value={null}
                        onChange={() => {}}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DatePicker
                        value={null}
                        onChange={() => {}}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {assignees.map((assignee, index) => (
                          <Tooltip title={assignee} key={index}>
                            <Chip
                              avatar={<Avatar>{assignee.charAt(0).toUpperCase()}</Avatar>}
                              label={assignee.split('@')[0]}
                              onClick={() => toggleAssigneeDisplay(index)}
                              variant="outlined"
                            />
                          </Tooltip>
                        ))}
                        <Tooltip title="Add Assignee">
                          <IconButton size="small" onClick={() => setNewAssignee('')}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        value={progress}
                        onChange={handleProgressChange}
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="not_started">
                          <Chip label="Not Started" size="small" sx={{ backgroundColor: statusColors.not_started, color: 'white' }} />
                        </MenuItem>
                        <MenuItem value="in_progress">
                          <Chip label="In Progress" size="small" sx={{ backgroundColor: statusColors.in_progress, color: 'white' }} />
                        </MenuItem>
                        <MenuItem value="completed">
                          <Chip label="Completed" size="small" sx={{ backgroundColor: statusColors.completed, color: 'white' }} />
                        </MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell>
                      <LinearProgress variant="determinate" value={50} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        value={progress}
                        onChange={handleProgressChange}
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="low">
                          <Chip label="Low" size="small" sx={{ backgroundColor: priorityColors.low, color: 'white' }} />
                        </MenuItem>
                        <MenuItem value="medium">
                          <Chip label="Medium" size="small" sx={{ backgroundColor: priorityColors.medium, color: 'white' }} />
                        </MenuItem>
                        <MenuItem value="high">
                          <Chip label="High" size="small" sx={{ backgroundColor: priorityColors.high, color: 'white' }} />
                        </MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} textAlign="center">
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddRow}>
              Add Task
            </Button>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default Test;