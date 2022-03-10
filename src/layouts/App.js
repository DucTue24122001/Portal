import React, { useEffect, useState } from 'react'
import Header from '../layouts/components/header/index'
import style from './App.module.css'
import { removeCookie, STORAGEKEY } from '@/utils/storage'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

const App = (props) => {
  const history = useHistory()
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const { renderRouter } = props
  const [hiddenMenu, setHiddenMenu] = useState(false)
  const { success } = useSelector((state) => state.login)

  useEffect(() => {
    if (success === true) {
      setHiddenMenu(true)
    }
  }, [success])

  useEffect(() => {
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      setHiddenMenu(true)
    }
  }, [])

  const logout = async() => {
    removeCookie(STORAGEKEY.ACCESS_TOKEN)
    setHiddenMenu(false)
    history.push('/login')
  }

  return (
    <div className={style.wrapper}>
      {hiddenMenu && <Header logout={logout} />}
      <div className={style.main}>{renderRouter()}</div>
    </div>
  )
}

export default App
