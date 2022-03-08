import React from 'react'
import Header from '../layouts/components/header/index'
import style from './App.module.css'

const App = (props) => {
  const { renderRouter } = props

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.main}>{renderRouter()}</div>
    </div>
  )
}

export default App
