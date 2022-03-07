import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import router from './routers.js'
import { CookiesProvider } from 'react-cookie'
import AppLayout from './layouts/App'
import 'antd/dist/antd.css'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
const browserHistory = createBrowserHistory()
const App = () => {
  return (
    <CookiesProvider>
      <Router history={browserHistory}>
        <AppLayout renderRouter={router} />
      </Router>
    </CookiesProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
