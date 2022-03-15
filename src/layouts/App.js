import React, { useEffect, useState } from 'react'
import Header from '../layouts/components/header/index'
import style from './App.module.css'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'

const App = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const { renderRouter } = props
  const [hiddenMenu, setHiddenMenu] = useState(false)
  const { success } = useSelector((state) => state.login)
  // const { successLogout } = useSelector((state) => state.logout)

  useEffect(() => {
    if (success === true) {
      setHiddenMenu(true)
    }
  }, [success])

  // useEffect(() => {
  //   if (successLogout === true) {
  //     setHiddenMenu(false)
  //   }
  // }, [successLogout])

  useEffect(() => {
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      setHiddenMenu(true)
    }
  }, [])

  return (
    <div className={style.wrapper}>
      {hiddenMenu && <Header />}
      <div className={style.main}>{renderRouter()}</div>
    </div>
  )
}

export default App
