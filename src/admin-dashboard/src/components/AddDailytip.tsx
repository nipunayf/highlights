// import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Textarea, ActionIcon, rem, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { addTip } from '../../../website/highlights/src/services/api';

interface AddDailyTipPopupProps {
  open: boolean;
  onClose: () => void;
  formState: { label: string; tip: string };
  setFormState: React.Dispatch<React.SetStateAction<{ label: string; tip: string }>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: { [key: string]: string };
}

const AddDailyTipPopup: React.FC<AddDailyTipPopupProps> = ({
  open,
  onClose,
  formState,
  setFormState,
  handleSubmit,
  errors,
}) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Add Daily Tip"
      closeButtonProps={{
        icon: <IconX size={20} stroke={1.5} />,
      }}
      centered
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          label="Label"
          name="label"
          value={formState.label}
          onChange={(e) => setFormState(prevState => ({
            ...prevState,
            label: e.target.value,
          }))}
          error={errors.label}
        />

        <Textarea
          withAsterisk
          resize="vertical"
          label="Tip"
          name="tip"
          value={formState.tip}
          onChange={(e) => setFormState(prevState => ({
            ...prevState,
            tip: e.target.value,
          }))}
          mb="md"
          error={errors.tip}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default AddDailyTipPopup;
