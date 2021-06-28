![pocketUI](.github/assets/logo.svg)

## Overview

pocketUI is a React library used to build user interfaces for Pocket Network and its related projects. It provides the components needed to build experiences that embody the principles of the nascent Pocket Design System, and can be used both client or server side rendering.

The complete documentation will be coming soon!

### Quick setup

Install pocketUI alongside styled-components from npm:

```sh
npm install --save @pocket-foundation/ui styled-components
```

Wrap your app with the `Main` component:

```jsx
import React from 'react'
import { Main } from '@pokt-foundation/ui'

function App() {
  return (
    <Main>
      <h1>Hello pocketUI!</h1>
    </Main>
  )
}
```

_Your project is now ready to use pocketUI. 💫_

## Build and Develop

Please have a look at [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT, see [LICENSE](LICENSE).
