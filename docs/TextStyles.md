# Text styles

Text styles provided by pocketUI can be used through the `textStyle()` utility, which returns a series of CSS declarations corresponding to the desired text style.

The CSS properties can include any of the following, depending on the requested style:

- `font-size`
- `font-family`
- `font-weight`
- `text-transform`
- `line-height`

It is recommended to use the utility and stick to the provided styles rather than mix them, to ensure consistency throughout the app.

## Usage

```jsx
import { Main, textStyle } from '@pokt-foundation/ui'

function App() {
  return (
    <div
      css={`
        ${textStyle('body3')};
      `}
    >
      Body 3 text style
    </div>
  )
}
```
