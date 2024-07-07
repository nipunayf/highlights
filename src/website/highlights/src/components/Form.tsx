import { Button, Group, Modal, Select, TextInput, ActionIcon, Textarea, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker, TimeInput } from '@mantine/dates';
import { IconClock, IconX,IconFlagCog} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useRef, useState } from 'react';




export default function Form() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  

  const pickerControl = (ref: React.RefObject<HTMLInputElement>) => (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const form = useForm({
    initialValues: {
      title: '',
      termsOfService: false,
    },
    validate: {
      title: (value) => (value ? null : 'Title cannot be empty'),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Task Details"
        closeButtonProps={{
          icon: <IconX size={20} stroke={1.5} />,
        }}
        centered
      >
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Title"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />

          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <DatePicker />
          </div>

          <div style={{ display: 'flex',justifyContent: 'space-between', marginBottom: rem(10) }}>
          <TimeInput label="Start Time" ref={startRef} rightSection={pickerControl(startRef)} style={{ width: '180px' }} />
          <TimeInput label="End Time" ref={endRef} rightSection={pickerControl(endRef)} style={{ width: '180px' }} />
          </div>

          <Select
            label="Reminder"
            placeholder="Pick value"
            data={['Before 10 minutes', 'Before 15 minutes', 'Before 20 minutes', 'Before 30 minutes']}
            mb="md"
          />

          <Select
            // label="Priority"
            placeholder="Pick value"
            data={[
              { value: 'none', label: 'None'},
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium'},
              { value: 'high', label: 'High'},
            ]}
            
            
            mb="md"
          />

          <Textarea resize="vertical" label="Description" placeholder="Your comment" mb="md" />

          
            <Button type="submit">Submit</Button>
         
        </form>
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
}
