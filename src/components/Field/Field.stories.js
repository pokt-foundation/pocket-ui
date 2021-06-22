import React from 'react'
import Field from './Field'
import TextInput from '../TextInput/TextInput'

export default {
  title: 'pocketUI/Field',
  component: Field,
  argTypes: {
    label: { control: 'text', defaultValue: 'POKT Address' },
    required: { control: 'boolean', defaultValue: 'false' },
  },
}

const Template = args => {
  const [value, setValue] = React.useState('')

  return (
    <Field {...args}>
      {({ id }) => (
        <TextInput
          placeholder="deadbeef"
          value={value}
          id={id}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </Field>
  )
}

export const Primary = Template.bind({})
