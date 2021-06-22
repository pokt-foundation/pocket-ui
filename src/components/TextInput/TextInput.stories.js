import React from 'react'
import TextInput from './TextInput'

export default {
  title: 'pocketUI/TextInput',
  component: TextInput,
  argTypes: {
    wide: {
      control: 'boolean',
      defaultValue: false,
    },
    value: {
      control: {
        type: 'text',
        defaultValue: '',
      },
    },
  },
}

const Template = args => <TextInput {...args} />

export const Primary = Template.bind({})
