# DataView

DataView is a component that can adapt to several different ways of representing and selecting data, switching from a table layout to a list layout depending on the available space.

## Usage

```jsx
<DataView
  fields={['Account', 'Amount']}
  entries={[
    { account: addr(), amount: '-7.900,33 POKT' },
    { account: addr(), amount: '-8.760,90 POKT' },
    { account: addr(), amount: '+5.321 POKT' },
  ]}
  renderEntry={({ account, amount }) => {
    return [<Web3Wallet entity={account} />, <Amount>{amount}</Amount>]
  }}
/>
```

## Props

### fields

| Type    | Default value   |
| ------- | --------------- |
| `Array` | None (required) |

The different fields of data, displayed in the column headers in table mode.

```jsx
<DataView fields={['Account', 'Amount']} />
```

An object form exists, allowing to set additional settings:

```jsx
<DataView
  fields={[
    // `priority` allows to change the fields
    // order when DataView is in list mode.
    { label: 'Account', priority: 1 },
    { label: 'Amount', priority: 2 },
  ]}
/>
```

#### field.label

The content displayed for the field.

#### field.priority

List mode only. Set this to any number to set the field priority.

#### field.align

Table mode only. Forces the table header to be aligned on a specific side: `end` or `start`.

#### field.childStart

Table mode only. Set this to `true` on the field you want the expansion rows to be aligned. See `renderEntryExpansion()` for more details.

### entries

| Type    | Default value   |
| ------- | --------------- |
| `Array` | None (required) |

The actual data entries. An array of any kind of data structure. Every value set in this array will be passed to `renderEntry`.

Important: `entries` should always be cached, for example by using `useMemo()`, rather than being passed inline. That way, `DataView` will know that your entries haven’t changed, and won’t do unnecessary renders or reset the pagination state.

Example with an array of objects:

```jsx
<DataView
  fields={['Account', 'Amount']}
  entries={[
    { account: addr(), amount: '-7.900,33 POKT' },
    { account: addr(), amount: '-8.760,90 POKT' },
    { account: addr(), amount: '+5.321 POKT' },
  ]}
  renderEntry={({ account, amount }) => {
    return [<IdentityBadge entity={account} />, <Amount>{amount}</Amount>]
  }}
/>
```

An array of arrays:

```jsx
<DataView
  fields={['Account', 'Amount']}
  entries={[
    [addr(), '-7.900,33 POKT'],
    [addr(), '-8.760,90 POKT'],
    [addr(), '+5.321 POKT'],
  ]}
  renderEntry={([account, amount]) => {
    return [<IdentityBadge entity={account} />, <Amount>{amount}</Amount>]
  }}
/>
```

Or anything else, like a string:

```jsx
<DataView
  fields={['Account', 'Amount']}
  entries={[
    `${addr()} | -7.900,33 POKT`,
    `${addr()} | -8.760,90 POKT`,
    `${addr()} | +5.321 POKT`,
  ]}
  renderEntry={entry => {
    const [account, amount] = entry.split(' | ')
    return [<IdentityBadge entity={account} />, <Amount>{amount}</Amount>]
  }}
/>
```

### heading

| Type         | Default value |
| ------------ | ------------- |
| `React node` | None          |

Set this to add a header inside the `DataView` surface.

### mode

| Type                              | Default value |
| --------------------------------- | ------------- |
| `"adaptive"`, `"table"`, `"list"` | `"adaptive"`  |

Set this to force the display mode of DataView.

### page

| Type     | Default value |
| -------- | ------------- |
| `Number` | None          |

Index of the current page. When not provided, `DataView` will manage the pagination itself.

### onPageChange

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Gets called when a page change is requested. Use with `page` to manage the pagination in a [controlled](https://reactjs.org/docs/forms.html#controlled-components) way.

### entriesPerPage

| Type     | Default value |
| -------- | ------------- |
| `Number` | `10`          |

Number of items per page. Set to `-1` to display the items without pagination.

### selection

| Type    | Default value |
| ------- | ------------- |
| `Array` | None          |

A list of selected items, using their indexes. When not provided, `DataView` will manage the selection itself. See also `onSelectEntries()`.

### onSelectEntries(entries, indexes)

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Gets called when the entries selection changes. If not set, the checkboxes won’t be displayed. Use with `selection` to manage the selection in a [controlled](https://reactjs.org/docs/forms.html#controlled-components) way.

Note: only one of `onSelectEntries` and `renderEntryExpansion` can be set at a time.

### renderEntry(entry, index, { selected, mode })

| Type       | Default value   |
| ---------- | --------------- |
| `Function` | None (required) |

Renders an entry by returning an array of nodes with items corresponding to every field.

#### Note: hooks in render props

Hooks won’t work in one of the `render` prefixed methods. The reason is that these are not components, but functions called conditionally from `DataView`.

This is not possible:

```jsx
<DataView
  fields={['Account', 'Amount']}
  entries={[
    [addr(), '-7.900,33 POKT'],
    [addr(), '-8.760,90 POKT'],
    [addr(), '+5.321 POKT'],
    [addr(), '-328,65 POKT'],
    [addr(), '+3.321 POKT'],
    [addr(), '-328,65 POKT'],
  ]}
  renderEntry={({ account, amount }) => {
    const { account: connectedAccount } = useWallet()
    return [
      <div>
        <Wallet address={account} />
        {connectedAccount === account && <span>You</span>}
      </div>,
      <Amount>{amount}</Amount>,
    ]
  }}
/>
```

But hooks can be used in components, so we can create one:

```jsx
function Account({ address }) {
  const { account: connectedAccount } = useWallet()
  return (
    <div>
      <wallet address={address} />
      {accountConnected === address && <span>You</span>}
    </div>
  )
}

function App() {
  return (
    <DataView
      fields={['Account', 'Amount']}
      entries={[
        [addr(), '-7.900,33 POKT'],
        [addr(), '-8.760,90 POKT'],
        [addr(), '+5.321 POKT'],
        [addr(), '-328,65 POKT'],
        [addr(), '+3.321 POKT'],
        [addr(), '-328,65 POKT'],
      ]}
      renderEntry={([address, amount]) => {
        return [<Account address={account} />, <Amount>{amount}</Amount>]
      }}
    />
  )
}
```

### renderEntryActions(entry, index, { selected, mode })

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Renders the actions of an entry, usually as a `ContextMenu`.

### renderEntryExpansion(entry, index, { selected, mode })

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Make it possible for the user to expand a given entry, and reveal more content related to it. This content can be a series of rows that will adhere to the table layout or a custom React tree.

It should return one of these:

- A non empty array, to be displayed as individual rows.
- A React node, to remove any specific layout constraint.
- `null` or an empty array, to make the entry not expandable.

When a non-empty array is returned, each of its entries will be displayed as a row, whose height is determined by the value of `tableRowHeight` − even in list view mode. The alignment of these rows can also start from a specific column in table mode: see `field.childStart`.

When a React node is returned, there are no layout constraints anymore and the expansion's height depends on the returned content.

Note: only one of `onSelectEntries` and `renderEntryExpansion` can be set at a time.

### renderSelectionCount(count)

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Renders the label used to indicate the current selection. If not provided, “X items selected” will be displayed.

### tableRowHeight

| Type     | Default value     |
| -------- | ----------------- |
| `Number` | `8 * GU` (`64px`) |

The height of a row, in `px`.

### status

| Type     | Default value |
| -------- | ------------- |
| `String` | `default`     |

Can be `default`, `loading`, `empty-filters` and `empty-search`. The correct illustration and text styles are used depending on the status.

### emptyState

Use this prop to customize the empty state of `DataView`. The type of empty state currently active is determined by the `status` prop.

This prop accepts two types: a configuration object or a function.

#### Configuration object

The object can define one of the possible values of `status` as keys, and an object.

This object can contain the following values:

- `title`, `subtitle` and `illustration` are React nodes that can override any of these parts. Set to `null` to disable.
- `displayLoader` is a boolean that can be used to display a loader before the title.
- `clearLabel` is the content of the clearing link, and can contain any React node. Set to `null` to disable. See also `onStatusEmptyClear`.

Any undefined `status`, or undefined key on that object will use the default. `null` can be passed to disable a specific part of the empty state.

The default values are the following:

```jsx
<DataView
  emptyState={{
    default: {
      displayLoader: false,
      title: 'No data available.',
      subtitle: null,
      illustration: <img src="empty-state-illustration-blue.png" alt="" />,
      clearLabel: null,
    },
    loading: {
      displayLoader: true,
      title: 'No data available.',
      subtitle: null,
      illustration: <img src="empty-state-illustration-blue.png" alt="" />,
      clearLabel: null,
    },
    'empty-filters': {
      displayLoader: false,
      title: 'No results found.',
      subtitle: 'We can’t find any item matching your filter selection.',
      illustration: <img src="empty-state-illustration-red.png" alt="" />,
      clearLabel: 'Clear filters',
    },
    'empty-search': {
      displayLoader: false,
      title: 'No results found.',
      subtitle: 'We can’t find any item matching your search query.',
      illustration: <img src="empty-state-illustration-red.png" alt="" />,
      clearLabel: 'Clear filters',
    },
  }}
/>
```

#### Function mode

The function allows to completely override the empty state content. It takes the current `status` as a unique parameter, and is expected to return a React node, or `null` to let DataView display the default.

Use it this way:

```jsx
<DataView
  emptyState={status => {
    if (status === 'loading') {
      return <div>Loading!</div>
    }

    // Use the default for other `status` values.
    return null
  }}
/>
```

### onStatusEmptyClear

| Type       | Default value |
| ---------- | ------------- |
| `Function` | None          |

Called when one of the default clearing links gets clicked. This is happening in `empty-filters` or `empty-search` by default, or if a custom status has a non-empty `clearLabel`.

### statusEmpty

| Type   | Default value |
| ------ | ------------- |
| `Node` | None          |

If you want to customize the `default` status content.

**Note: this prop is deprecated and will be removed in a future version. Please use `emptyState` instead.**

### statusLoading

| Type   | Default value |
| ------ | ------------- |
| `Node` | None          |

If you want to customize the `loading` status content.

**Note: this prop is deprecated and will be removed in a future version. Please use `emptyState` instead.**

### statusEmptyFilters

| Type   | Default value |
| ------ | ------------- |
| `Node` | None          |

If you want to customize the `empty-filters` status content.

**Note: this prop is deprecated and will be removed in a future version. Please use `emptyState` instead.**

### statusEmptySearch

| Type   | Default value |
| ------ | ------------- |
| `Node` | None          |

If you want to customize the `empty-search` status content.

**Note: this prop is deprecated and will be removed in a future version. Please use `emptyState` instead.**
