import React from 'react'
import PropTypes from 'prop-types'
import { ViewportProvider } from 'use-viewport'
import BaseStyles from '../BaseStyles/BaseStyles'
import ToastHubProvider from '../ToastHub/ToastHub'
import { Root } from '../Root/Root'
import { Theme } from '../../theme'

import '@fontsource/manrope'
import '@fontsource/source-code-pro'

export default function Main({ children, theme = 'dark' }) {
  return (
    <Root.Provider>
      <BaseStyles />
      <Theme theme={theme}>
        <ViewportProvider>
          <ToastHubProvider>{children}</ToastHubProvider>
        </ViewportProvider>
      </Theme>
    </Root.Provider>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
}
