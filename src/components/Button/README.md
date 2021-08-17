# Button

A simple Button component, available in different modes.

Both `children` and the `label` prop can be used to add its contents.

## Usage

```jsx
function App() {
  return <Button label="Click me" />
}
```

## Props

### `label`

| Type         | Default value |
| ------------ | ------------- |
| `React node` | None          |

The textual content of the button.

### `icon`

| Type         | Default value |
| ------------ | ------------- |
| `React node` | None          |

The icon to incorporate in the button. When only an icon is desired, it is recommended to set a `label` with the `display` prop set to `"icon"`: the label will then be set on the `title` attribute of the element.

### `display`

| Type                             | Default value |
| -------------------------------- | ------------- |
| `auto`, `all`, `icon` or `label` | `auto`        |

Use this prop to force a specific display mode.

#### Example:

```jsx
<Button icon={<IconDownload />} label="Download" />
```

### `children`

| Type         | Default value |
| ------------ | ------------- |
| `React node` | None          |

Having children on a `Button` will override `label`, `icon`, and `display`. It is generally not recommended when there's more than text, but can be useful in some situations.

### `mode`

| Type               | Default value |
| ------------------ | ------------- |
| `normal`, `strong` | `normal`      |

Set this property to the desired variant.

#### Example:

```jsx
<Button mode="strong">Accept</Button>
```

### `size`

| Type                        | Default value |
| --------------------------- | ------------- |
| `medium`, `small` or `mini` | `medium`      |

Use this property to change the size of the button.

#### Example:

```jsx
<Button size="small">Accept</Button>
```

### `wide`

| Type      | Default value |
| --------- | ------------- |
| `Boolean` | `false`       |

Set to true to obtain a button that expands horizontally.

#### Example:

```jsx
<Button wide>Accept</Button>
```
