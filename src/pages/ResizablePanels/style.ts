import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  'Container': {
    width: '100%',
    height: 'calc(100% - 45px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  'TopRow': {
    flex: '0 0 auto',
    textAlign: 'center',
  },
  'BottomRow': {
    flex: '1 1 auto',
  },
  'Panel': {
    display: 'flex',
    flexDirection: 'column',
  },
  'PanelContent': {
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--color-panel-background)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '0.5rem',
  },
  'Button': {
    color: 'var(--color-default)',
    backgroundColor: 'var(--color-button-background)',
    border: '1px solid var(--color-button-border)',
    borderRadius: '0.25rem',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--color-button-background-hover)',
    },
  },
  'Link': {
    display: 'block',
    color: 'var(--color-link)',
    marginBottom: '0.5rem',
  },
  ResizeHandleOuter: {
    flex: '0 0 1.5em',
    position: 'relative',
    outline: 'none',
    '--background-color': 'transparent',
    '&[data-resize-handle-active]': {
      '--background-color': 'var(--color-solid-resize-bar-handle)',
    },
  },
  'ResizeHandleInner': {
    position: 'absolute',
    top: '0.25em',
    bottom: '0.25em',
    left: '0.25em',
    right: '0.25em',
    borderRadius: '0.25em',
    backgroundColor: 'var(--background-color)',
    transition: 'background-color 0.2s linear',
  },
  'Icon': {
    width: '1em',
    height: '1em',
    position: 'absolute',
    left: 'calc(50% - 0.5rem)',
    top: 'calc(50% - 0.5rem)',
  },
}))

export default useStyles
