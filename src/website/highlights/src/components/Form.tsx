import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';


export default function Form() {

    const [value, setValue] = useState<Date | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      title: '',
    //   date: Date,
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      title: (value) => (value ? null : 'Name cannot be empty'),
    },
  });

  return (
    <>
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        label="Title"
        // placeholder=""
        key={form.key('title')}
        {...form.getInputProps('title')}
      />

<Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />

<DatePicker/>


      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key('termsOfService')}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
</>
  );
}