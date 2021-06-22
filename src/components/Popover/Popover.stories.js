import React from 'react'
import Button from '../Button/Button'
import Popover from './Popover'

export default {
  title: 'pocketUI/Popover',
  component: Popover,
  argTypes: {
    visible: { control: 'boolean', defaultValue: false },
  },
}

const Template = args => {
  const opener = React.createRef()

  return (
    <div>
      <Button onClick={() => {}} ref={opener}>
        Show
      </Button>
      <Popover
        visible={args.visible || false}
        opener={opener.current}
        {...args}
      >
        Hey
      </Popover>
    </div>
  )
}

export const Primary = Template.bind({})
