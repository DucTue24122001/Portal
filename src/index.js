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
<<<<<<< HEAD
=======
import { Provider } from 'react-redux'
import store from './redux/store/store'
>>>>>>> c52cbd4a4fa959b11ae5961e1322e2ed57576a78

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
