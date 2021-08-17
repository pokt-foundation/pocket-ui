# Main

Provides the base needed by the other components (styles and context providers) to work properly.

## Usage

```jsx
import { Main } from '@pokt-foundation/ui'

function App () {
  return (
    <Main>
      {/* Your app goes here */}
    </Main>
  )
}
```

## Props

### `layout`

| Type      | Default value |
| --------- | ------------- |
| `Boolean` | `true`        |

Enable `<Layout />`.

### `scrollView`

| Type      | Default value |
| --------- | ------------- |
| `Boolean` | `true`        |

Enable `<ScrollView />`.

### `theme`

| Type                 | Default value |
| -------------------- | ------------- |
| `String` or `Object` | `dark`       |

The main theme used by pocketUI.
