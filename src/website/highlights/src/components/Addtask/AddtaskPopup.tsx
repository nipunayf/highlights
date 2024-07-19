import React, { useState, useRef } from 'react';
import { Modal, TextInput, Button, Textarea, Select, ActionIcon, rem, Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { IconClock, IconX } from '@tabler/icons-react';
import { createTask as createApiTask } from '@/services/api';

interface AddtaskPopupProps {
  open: boolean;
  onClose: () => void;
  // addTask: (newTask: Task) => void;
}

interface Task {
  title: string;
  description: string;
  dueDate: Date | null;
  startTime: string;
  endTime: string;
  reminder: string;
  priority: string;
  
}

interface ApiTask {
  title: string;
  description: string;
  dueDate: string | null;
  startTime: string;
  endTime: string;
  reminder: string;
  priority: string;
 
}

export default function AddtaskPopup({ open, onClose }: AddtaskPopupProps) {
  // State hooks to manage form input values and other state
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    reminder: '',
    priority: '',
  });
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Refs for accessing the TimeInput components' methods
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const newErrors: { [key: string]: string } = {};

    if (!formState.title) newErrors.title = 'Title is required';
    if (!formState.description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    if (startTime && endTime && new Date(`1970-01-01T${startTime}Z`).getTime() >= new Date(`1970-01-01T${endTime}Z`).getTime()) {
      newErrors.time = 'Start time should be less than end time';
    }
    if (dueDate && dueDate.getTime() < new Date().setHours(0, 0, 0, 0)) newErrors.dueDate = 'Due date should be today or a future date';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Adjust dueDate to UTC
    const adjustedDueDate = dueDate ? new Date(Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())) : null;

    // Constructing newTask object with form data
    const newTask: Task = {
      title: formState.title,
      description: formState.description,
      dueDate: adjustedDueDate,
      startTime: startTime,
      endTime: endTime,
      reminder: formState.reminder,
      priority: formState.priority,
      // subTasks: [],
    };

    // Constructing apiTask object with data adjusted for API consumption
    const apiTask: ApiTask = {
      ...newTask,
      dueDate: newTask.dueDate ? newTask.dueDate.toISOString() : null,
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      // subTasks: [],
    };

    // Logging newTask and apiTask for debugging purposes
    console.log("New Task:", newTask);
    console.log("API Task:", apiTask);

    try {
      // Calling API function to create task
      await createApiTask(apiTask as any); // Casting to 'any' to bypass type error
      // Adding new task locally after successful API call
      // addTask(newTask);
      
      // Resetting form state after successful submission
      setFormState({
        title: '',
        description: '',
        reminder: '',
        priority: '',
      });
      setDueDate(null);
      setStartTime('');
      setEndTime('');
      setErrors({});
      
      // Closing the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  // Function to render clock icon and handle click event to show time picker
  const pickerControl = (ref: React.RefObject<HTMLInputElement>) => (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  // Function to handle change in Select component for Reminder
  const handleSelectChange = (value: string | null) => {
    setFormState(prevState => ({
      ...prevState,
      reminder: value || '',
    }));
  };

  // Rendering the modal component with form inputs
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
        {/* TextInput component for Title */}
        <TextInput
          withAsterisk
          label="Title"
          name="title"
          value={formState.title}
          onChange={(e) => setFormState(prevState => ({
            ...prevState,
            title: e.target.value,
          }))}
          error={errors.title}
        />

        {/* DatePicker component for Due Date */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <DatePicker 
            value={dueDate} 
            onChange={setDueDate} 
            minDate={new Date()} // Prevent selection of past dates
          />
          {errors.dueDate && <Text color="red">{errors.dueDate}</Text>}
        </div>

        {/* TimeInput components for Start Time and End Time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: rem(10) }}>
          <TimeInput
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.currentTarget.value)}
            ref={startRef}
            rightSection={pickerControl(startRef)}
            style={{ width: '180px' }}
            error={errors.startTime}
          />
          <TimeInput
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.currentTarget.value)}
            ref={endRef}
            rightSection={pickerControl(endRef)}
            style={{ width: '180px' }}
            error={errors.endTime || errors.time}
          />
          {/* {errors.time && <Text color="red">{errors.time}</Text>} */}
        </div>

        {/* Select component for Reminder */}
        <Select
          label="Reminder"
          placeholder="Pick value"
          name="reminder"
          value={formState.reminder}
          onChange={handleSelectChange}
          data={['Before 10 minutes', 'Before 15 minutes', 'Before 20 minutes', 'Before 30 minutes'].map(value => ({ value, label: value }))}
          mb="md"
          error={errors.reminder}
        />

        {/* Select component for Priority */}
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
          error={errors.priority}
        />

        {/* Textarea component for Description */}
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
          error={errors.description}
        />

        {/* Submit button */}
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}
