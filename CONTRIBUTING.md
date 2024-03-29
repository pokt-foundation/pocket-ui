# Contribute to pocketUI

## Build

Clone this repository and install the dependencies:

```sh
npm install
```

Build:

```sh
npm run build
```

Auto rebuild:

```sh
npm run dev
```

## Structure

```
src/
  components/   # The React components.
  icons/        # Contains the icon components exported by pocketUI.
    components/ # Icon components (autogenerated)
    svg/        # Icon SVG files used to generate the icon components.
  libs/         # Internal library, contains various utilities. Nothing here is exported.
  style/        # Everything related to the styles: spring configs, text styles, etc.
  theme/        # The theming system.
  utils/        # Public utility library. Everything in there is exported and part of the public API.
```
