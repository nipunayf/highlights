import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  TextField, Select, MenuItem, Button, Typography, Box, 
  Paper, Chip, Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { tableCellClasses } from '@mui/material/TableCell';
import dayjs, { Dayjs } from 'dayjs';

interface RowData {
  projectId: number;
  taskName: string;
  progress: string;
  priority: string;
  startDate: Dayjs | null;
  dueDate: Dayjs | null;
}
interface ProjectData {
  projectId: number;
  projectName: string;
  progress: string;
  priority: string;
  startDate: Dayjs | null;
  dueDate: Dayjs | null;
}

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

const Test: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [projectDetails, setProjectDetails] = useState<ProjectData>({
    projectId: projectId,
    projectName: '',
    progress: '',
    priority: '',
    startDate: null,
    dueDate: null,
  });
  const [rows, setRows] = useState<RowData[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [newAssignee, setNewAssignee] = useState('');

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
    axios.get(`http://localhost:8090/todo/project/${projectId}`)
    .then(response => {
      const project = response.data.value;
      const fetchedProject: ProjectData = {
        projectId: project.projectId,
        projectName: project.projectName,
        progress: project.progress,
        priority: project.priority,
        startDate: project.startDate ? dayjs(project.startDate) : null,
        dueDate: project.dueDate ? dayjs(project.dueDate) : null,
      };
      setProjectDetails(fetchedProject);
    })
    .catch(error => console.error('Error fetching project:', error));
  }, [projectId]);

  useEffect(() => {
    axios.get(`http://localhost:8090/todo/tasks/${projectId}`)
        .then(response => {
            const fetchedProjects = response.data.projects.map((project: any) => ({
                projectId: project.projectId,
                taskName: project.taskName,
                progress: project.progress,
                priority: project.priority,
                startDate: project.startDate ? dayjs(project.startDate) : null,
                dueDate: project.dueDate ? dayjs(project.dueDate) : null,
            }));
            setRows(fetchedProjects);
        })
        .catch(error => console.error('Error fetching projects:', error));
}, []);

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

  const handleProgressChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index].progress = value;
    setRows(updatedRows);
    updateRowInDB(updatedRows[index]);
  };

  const handlePriorityChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index].priority = value;
    setRows(updatedRows);
    updateRowInDB(updatedRows[index]);
  };

  const updateRowInDB = (row: RowData) => {
    axios.put(`http://localhost:8090/todo/updateTask`, row)
      .then(response => console.log('Row updated:', response.data))
      .catch(error => console.error('Error updating row:', error));
  };

  const handleAddRow = () => {
    const newRow: RowData = {
        projectId: projectId,
        taskName: '',
        progress: '',
        priority: '',
        startDate: null,
        dueDate: null,
    };

    axios.post('http://localhost:8090/todo/addTask', {
        projectId: projectId,
        taskName: 'New task',
        progress: 'completed',
        priority: 'low',
        startDate: '2001-01-25',
        dueDate: '2001-02-25',
    })
        .then(response => {
            console.log('New row added:', response.data);
            const newProjects = response.data.projects.map((project: any) => ({
                projectId: project.projectId,
                taskName: project.taskName,
                progress: project.progress,
                priority: project.priority,
                startDate: null,
                dueDate: null,
            }));
            setRows([...rows, ...newProjects]);
            console.log("new projects", ...newProjects);
            console.log("here are my existing projects", response.data.projects);
            console.log("here are my existing rows", rows);
        })
        .catch(error => console.error('Error adding row:', error));
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h4" gutterBottom>Project Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Project Name:</strong> {projectDetails.projectName}</Typography>
              <Typography variant="subtitle1"><strong>Start Date:</strong> {projectDetails.startDate ? projectDetails.startDate.format('DD/MM/YYYY') : ''}</Typography>
              <Typography variant="subtitle1">
                <strong>Status:</strong> 
                <Chip 
                  label={projectDetails.progress} 
                  sx={{ backgroundColor: statusColors[projectDetails.progress as keyof typeof statusColors], color: 'white', marginLeft: 1 }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Due Date:</strong> {projectDetails.dueDate ? projectDetails.dueDate.format('DD/MM/YYYY') : ''}</Typography>
              <Typography variant="subtitle1">
                <strong>Priority:</strong> 
                <Chip 
                  label={projectDetails.priority} 
                  sx={{ backgroundColor: priorityColors[projectDetails.priority as keyof typeof priorityColors], color: 'white', marginLeft: 1 }}
                />
              </Typography>
              <Typography variant="subtitle1"><strong>Assignees:</strong> {assignees.join(', ')}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>Tasks</Typography>
          <TableContainer component={Box} sx={{ maxHeight: '400px', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Task Name</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Progress</StyledTableCell>
                  <StyledTableCell>Priority</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <StyledTableRow key={row.taskName}>
                    <StyledTableCell>
                      <TextField
                        value={row.taskName}
                        onChange={(event) => {
                          const updatedRows = [...rows];
                          updatedRows[rowIndex].taskName = event.target.value;
                          setRows(updatedRows);
                          updateRowInDB(updatedRows[rowIndex]);
                        }}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter project name"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DatePicker
                        value={row.startDate}
                        onChange={(date) => {
                          const updatedRows = [...rows];
                          updatedRows[rowIndex].startDate = date;
                          setRows(updatedRows);
                          updateRowInDB(updatedRows[rowIndex]);
                        }}
                        format="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        placeholder="Pick start date"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <DatePicker
                        value={row.dueDate}
                        onChange={(date) => {
                          const updatedRows = [...rows];
                          updatedRows[rowIndex].dueDate = date;
                          setRows(updatedRows);
                          updateRowInDB(updatedRows[rowIndex]);
                        }}
                        format="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        placeholder="Pick due date"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        fullWidth
                        value={row.progress}
                        onChange={(event) => handleProgressChange(rowIndex, event.target.value as string)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                            },
                          },
                        }}
                      >
                        <MenuItem value="not_started" style={{ color: '#F44336' }}>Not Started</MenuItem>
                        <MenuItem value="in_progress" style={{ color: '#FFC107' }}>In Progress</MenuItem>
                        <MenuItem value="completed" style={{ color: '#4CAF50' }}>Completed</MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        fullWidth
                        value={row.priority}
                        onChange={(event) => handlePriorityChange(rowIndex, event.target.value as string)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                            },
                          },
                        }}
                      >
                        <MenuItem value="low" style={{ color: '#4CAF50' }}>Low</MenuItem>
                        <MenuItem value="medium" style={{ color: '#FFC107' }}>Medium</MenuItem>
                        <MenuItem value="high" style={{ color: '#F44336' }}>High</MenuItem>
                      </Select>
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
