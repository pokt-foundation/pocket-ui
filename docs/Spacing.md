# Spacing

pocketUI components, apart from the "Main" component which sets some important properties for apps, don't try to enforce spacing at all. However, we do go by some rules regarding spacing, and this is where the grid unit becomes useful.

## Grid unit

The grid unit is a base value we use for dimensions, including element geometry and spacing. It is set to `8`.

This is how it is generally used:

```jsx
import { Main, GU } from '@pokt-foundation/ui'

function App() {
  return (
    <Main>
      <div
        css={`
          width: ${10 * GU}px;
          padding: ${4 * GU}px ${2 * GU}px;
        `}
      />
    </Main>
  )
}
```
