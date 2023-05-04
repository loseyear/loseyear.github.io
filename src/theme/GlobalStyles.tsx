import React from 'react'
import { Global } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={{
      ':root': {
        '--color-background-code': 'rgba(0, 0, 0, 0.35)',
        '--color-background-default': '#081120',
        '--color-button-background': '#2a3343',
        '--color-button-background-hover': '#454950',
        '--color-button-border': '#18181a',
        '--color-code': '#c67bff',
        '--color-default': '#ffffff',
        '--color-horizontal-rule': '#454950',
        '--color-link': '#dcadff',
        '--color-panel-background': '#192230',
        '--color-panel-background-alternate': '#202124',
        '--color-solid-resize-bar': '#454950',
        '--color-solid-resize-bar-handle': 'rgba(255, 255, 255, 0.2)',
      },
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-background-default)',
        color: 'var(--color-default)',
      },
      body: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        fontFamily: '"SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
        fontSize: '16px',
      },
      '#root': {
        width: '100%',
        height: '100%',
      }
    }}
  />
)

export default GlobalStyles
