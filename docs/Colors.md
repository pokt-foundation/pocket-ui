# Colors

Colors in pocketUI are managed by its theming system. An pocketUI theme is a set of colors assigned to a predefined palette. All pocketUI components use colors from this palette, making it possible to swap the theme for another one dynamically.

## Usage

The theme palette can be obtained in a component by using the `useTheme()` hook:

```jsx
function App() {
  const theme = useTheme()
  return (
    <Main>
      <p
        css={`
          color: ${theme.accent};
        `}
      >
        content
      </p>
    </Main>
  )
}
```
