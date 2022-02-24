import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Router from './routers.js'
import { CookiesProvider } from 'react-cookie'
import AppLayout from './layouts/App'

const App = () => {
  return (
    <CookiesProvider>
      <AppLayout renderRouter={Router} />
    </CookiesProvider>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
