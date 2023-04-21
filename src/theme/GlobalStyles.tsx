import React from 'react'
import { Global } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        width: '100%',
        height: '100%',
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
