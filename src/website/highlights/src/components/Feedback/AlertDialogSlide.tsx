import React from 'react';
import { Button, Grid, Transition, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface AlertDialogSlideProps {
  open: boolean;
  handleClose: (agree: boolean) => void;
}

const AlertDialogSlide: React.FC<AlertDialogSlideProps> = ({ open, handleClose }) => {
  const [formData, setFormData] = React.useState({
    q2: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // Replace with your submission logic
    handleClose(true);
  };

  return (
    <Modal
      opened={open}
      onClose={() => handleClose(false)}
      // transition="slide-up"
      title="Task Completion Form"
      styles={{
        header: {
          backgroundColor: '#2196f3',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        },
        body: {
          padding: '20px',
        },
       
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid gutter="xs">
          <Grid.Col span={12}>
            <TextInput
              id="q2"
              name="q2"
              label="Briefly describe any issues"
              required
             
              value={formData.q2}
              onChange={handleInputChange}
              styles={{
                input: {
                  borderColor: '#1976d2',
                },
                label: {
                  color: '#1976d2',
                },
              }}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit" style={{ backgroundColor: '#2196f3', color: '#fff' ,marginTop: 3,marginLeft:315}}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default AlertDialogSlide;
