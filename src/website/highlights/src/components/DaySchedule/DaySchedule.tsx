import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, MenuItem } from '@mui/material';
import styles from './DaySchedule.module.css';

const DaySchedule: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Learning Ballerina',
      time: '8.00 am - 10.00 am',
      subtasks: [
        { id: '1', title: 'Learning Ballerina' },
        { id: '2', title: 'Learning Ballerina' },
        { id: '3', title: 'Learning Ballerina' }
      ]
    },
    {
      id: '2',
      title: 'Learning React',
      time: '10.00 am - 12.00 pm',
      subtasks: [
        { id: '1', title: 'Setup environment' },
        { id: '2', title: 'Build components' }
      ]
    },
    {
      id: '3',
      title: 'Exercise',
      time: '3.00 pm - 4.00 pm',
      subtasks: []
    }
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);

    setTasks(newTasks);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleEditTask = () => {
    // Implement edit task functionality
    handleMenuClose();
  };

  const handleDeleteTask = () => {
    // Implement delete task functionality
    const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
    setTasks(updatedTasks);
    handleMenuClose();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>2024. 06.19</div>
          <div>Wednesday</div>
        </div>
        <div className={styles.tasks}>
          {tasks.map((task, index) => (
            <div key={task.id} className={styles.taskContainer}>
              <div className={styles.task}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskDetails}>
                  <span className={styles.title}>{task.title}</span>
                  <span className={styles.time}>{task.time}</span>
                </div>
                <button
                  onClick={(event) => handleMenuOpen(event, task)}
                  className={styles.menuButton}
                >
                  ...
                </button>
              </div>
              <Droppable droppableId={`subtasks-${task.id}`} type="SUBTASK">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.subtasks}
                  >
                    {task.subtasks.map((subtask, subIndex) => (
                      <Draggable
                        key={subtask.id}
                        draggableId={`subtask-${subtask.id}`}
                        index={subIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.subtask}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                            />
                            <span className={styles.title}>{subtask.title}</span>
                            <button className={styles.menuButton}>...</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditTask}>Edit Task</MenuItem>
        <MenuItem onClick={handleDeleteTask}>Delete Task</MenuItem>
      </Menu>
    </DragDropContext>
  );
};

export default DaySchedule;
