import React from 'react'
import Table from './Table'
import TableCell from './TableCell'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

export default {
  title: 'pocketUI/Table',
  component: Table,
}

const Template = args => (
  <Table
    header={
      <>
        <TableRow>
          <TableHeader title="Month" />
          <TableHeader title="Activity" />
        </TableRow>
      </>
    }
    {...args}
  >
    <TableRow>
      <TableCell>
        <p>January</p>
      </TableCell>
      <TableCell>
        <p>10 commits</p>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <p>February</p>
      </TableCell>
      <TableCell>
        <p>32 commits</p>
      </TableCell>
    </TableRow>
  </Table>
)

export const Primary = Template.bind({})
