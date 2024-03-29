import React, {
  lazy,
  Suspense,
} from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import GlobalStyles from '@/theme/GlobalStyles'
import theme from '@/theme/theme'

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const ResizablePanels = lazy(() => import('@/pages/ResizablePanels/ResizablePanels'))
const JavaScript = lazy(() => import('@/pages/JavaScript/JavaScript'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'))
const Loading = lazy(() => import('@/pages/ErrorPage/ErrorPage'))

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ul>
          {
            [
              {
                link: '/',
                name: 'home',
              },
              {
                link: '/ResizablePanels',
                name: 'ResizablePanels',
              },
              {
                link: '/JavaScript',
                name: 'JavaScript',
              },
            ].map(
              v => (
                <li key={v.link}>
                  <Link to={v.link}>{v.name}</Link>
                </li>
              )
            )
          }
        </ul>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Suspense fallback={<Loading />}><HomePage /></Suspense>} />
          <Route path="/ResizablePanels" element={<Suspense fallback={<Loading />}><ResizablePanels /></Suspense>} />
          <Route path="/JavaScript" element={<Suspense fallback={<Loading />}><JavaScript /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<Loading />}><ErrorPage /></Suspense>} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
