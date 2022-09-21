import Cookies from 'js-cookie'
import type { ReactElement } from 'react'
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import classes from './styles.module.scss'

const RequireAuth: React.FC<{
  children: ReactElement
}> = ({ children }) => {
  const token = Boolean(Cookies.get('token'))
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  const [is403, setIs403] = useState<boolean>(false)
  useEffect(() => {
    setIsLoggedIn(token)
    if (!token) {
      setIs403(true)
    }
  }, [token])
  return (
    <div className={classes.requireAuth}>
      {isLoggedIn && children}
      {is403 && 403}
    </div>
  )
}
export default RequireAuth
