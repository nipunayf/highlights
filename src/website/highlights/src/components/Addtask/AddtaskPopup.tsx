import React, { useState, useRef } from 'react';
import { Modal, TextInput, Button, Textarea, Select, ActionIcon, rem } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { IconClock, IconX } from '@tabler/icons-react';
import { createTask as createApiTask } from '@/services/api';

interface AddtaskPopupProps {
  open: boolean;
  onClose: () => void;
  addTask: (newTask: Task) => void;
}

interface Task {
  title: string;
  description: string;
  dueDate: Date | null;
  startTime: string;
  endTime: string;
  reminder: string;
  priority: string;
  subTasks: Task[];
}

interface ApiTask {
  title: string;
  description: string;
  dueDate: string | null;
  startTime: string;
  endTime: string;
  reminder: string;
  priority: string;
  subTasks: ApiTask[];
}

export default function AddtaskPopup({ open, onClose, addTask }: AddtaskPopupProps) {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    reminder: '',
    priority: '',
  });
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Adjust dueDate to UTC
    const adjustedDueDate = dueDate ? new Date(Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())) : null;

    const newTask: Task = {
      title: formState.title,
      description: formState.description,
      dueDate: adjustedDueDate,
      startTime: startTime,
      endTime: endTime,
      reminder: formState.reminder,
      priority: formState.priority,
      subTasks: [],
    };

    const apiTask: ApiTask = {
      ...newTask,
      dueDate: newTask.dueDate ? newTask.dueDate.toISOString() : null,
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      subTasks: [],
    };

    console.log("New Task:", newTask);
    console.log("API Task:", apiTask);

    try {
      await createApiTask(apiTask as any); // Casting to 'any' to bypass type error
      addTask(newTask);
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const pickerControl = (ref: React.RefObject<HTMLInputElement>) => (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const handleSelectChange = (value: string | null) => {
    setFormState(prevState => ({
      ...prevState,
      reminder: value || '',
    }));
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Task Details"
      closeButtonProps={{
        icon: <IconX size={20} stroke={1.5} />,
      }}
      centered
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          label="Title"
          name="title"
          value={formState.title}
          onChange={(e) => setFormState(prevState => ({
            ...prevState,
            title: e.target.value,
          }))}
        />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <DatePicker value={dueDate} onChange={setDueDate} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: rem(10) }}>
          <TimeInput
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.currentTarget.value)}
            ref={startRef}
            rightSection={pickerControl(startRef)}
            style={{ width: '180px' }}
          />
          <TimeInput
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.currentTarget.value)}
            ref={endRef}
            rightSection={pickerControl(endRef)}
            style={{ width: '180px' }}
          />
        </div>

        <Select
          label="Reminder"
          placeholder="Pick value"
          name="reminder"
          value={formState.reminder}
          onChange={handleSelectChange}
          data={['Before 10 minutes', 'Before 15 minutes', 'Before 20 minutes', 'Before 30 minutes'].map(value => ({ value, label: value }))}
          mb="md"
        />

        <Select
          label="Priority"
          placeholder="Pick value"
          name="priority"
          value={formState.priority}
          onChange={(value) => setFormState(prevState => ({
            ...prevState,
            priority: value || '',
          }))}
          data={[
            { value: 'none', label: 'None' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          mb="md"
        />

        <Textarea
          resize="vertical"
          label="Description"
          name="description"
          value={formState.description}
          onChange={(e) => setFormState(prevState => ({
            ...prevState,
            description: e.target.value,
          }))}
          mb="md"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}
