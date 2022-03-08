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
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store'

const browserHistory = createBrowserHistory()
const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Router history={browserHistory}>
          <AppLayout renderRouter={router} />
        </Router>
      </CookiesProvider>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
