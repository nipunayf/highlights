import React from 'react';
import { Modal, Text, Button } from '@mantine/core';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  startTime: string;
  endTime: string;
  label: string;
  reminder: string;
  priority: string;
}

interface TaskDetailPopupProps {
  task: Task;
  opened: boolean;
  onClose: () => void;
}
console.log("sk")

const TaskDetailPopup: React.FC<TaskDetailPopupProps> = ({ task, opened, onClose }) => {
  const formatDate = (date: Date | null) => {
    return date ? new Date(date).toDateString() : 'No due date';
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Task Details" centered>
      <div>
        <Text><b>Title:</b> {task.title}</Text>
        <Text><b>Description:</b> {task.description}</Text>
        <Text><b>Due Date:</b> {formatDate(task.dueDate)}</Text>
        <Text><b>Start Time:</b> {task.startTime}</Text>
        <Text><b>End Time:</b> {task.endTime}</Text>
        <Text><b>Label:</b> {task.label}</Text>
        <Text><b>Reminder:</b> {task.reminder}</Text>
        <Text><b>Priority:</b> {task.priority}</Text>
      </div>
      <Button onClick={onClose}>Close</Button>
    </Modal>
  );
};

export default TaskDetailPopup;
