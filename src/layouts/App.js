import React from 'react'
import s from './App.module.css'
const App = (props) => {
  const { renderRouter } = props
  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        {renderRouter()}
      </div>
    </div>
  )
}

export default App
