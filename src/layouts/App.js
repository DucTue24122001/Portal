import React from 'react'
import '@/App.css'

const App = (props) => {
  const { renderRouter } = props
  return (
    <>
      <div className={`main`}>
        { renderRouter() }
      </div>
    </>
  )
}

export default App
