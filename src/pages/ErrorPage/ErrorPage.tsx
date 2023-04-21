import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const ErrorPage: FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Error Page !!!</h1>
      <Button
        onClick={() => navigate('/')}
      >
        返回首页
      </Button>
    </div>
  )
}

export default ErrorPage
