import React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import App from './pages'
import { createBrowserHistory } from 'history'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'
import { checkPermission } from '@/utils/JWT'
import NotFoundRoute from './pages/404'
import LoginPage from './pages/login'
import MyLeavePage from './pages/myleave'
import NoicePage from './pages/notice'
import RequestsPage from './pages/requests'
import TimesheetPage from './pages/timesheet'

const browserHistory = createBrowserHistory()

const PrivateRoute = (props) => {
  // const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const Component = props.component
  return (
    <Route {...props.rest} exact
      render = {(prop) => (
        // cookies[STORAGEKEY.ACCESS_TOKEN] ? (
        <Component {...prop} />
        // )
        //   : (
        //     <Redirect
        //       to={{
        //         pathname: '/login',
        //         state: { redirect_url: prop.location }
        //       }}
        //     />
        //   )
      )}
    />
  )
}

const WhiteListRoute = (props) => {
  const whiteList = ['/login', '/forget-password']
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const isWhiteList = (path) => !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0

  return (
    <Route {...props.rest} exact
      render = {(prop) => (
        isWhiteList(props.path)
          ? (<div>{React.createElement(props.component, prop)}</div>)
          : (<Redirect to={{ pathname: '/' }} />)
      )}
    />
  )
}

export const appRouter = [
  {
    name: 'Dashboard',
    path: '/',
    component: App,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'MyLeave',
    path: '/leave',
    component: MyLeavePage,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Notice',
    path: '/notice',
    component: NoicePage,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Requests',
    path: '/requests',
    component: RequestsPage,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Timesheet',
    path: '/timesheet',
    component: TimesheetPage,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage,
    meta: {
      role: '*',
      isPrivate: false,
      hidden: true,
      child: false
    }
  }

]

const renderRouter = (routes) => {
  let arr = []
  routes.forEach(route => {
    const tmpRoute = route.meta.isPrivate
      ? (<PrivateRoute exact path={route.path} component={route.component} key={route.name} />)
      : (<WhiteListRoute path={route.path} component={route.component} key={route.name} />)
    if (checkPermission(route.meta.role)) {
      arr.push(tmpRoute)
    }
    if (route.children) {
      arr = arr.concat(renderRouter(route.children))
    }
  })
  return arr
}

const routes = () => {
  const whiteList = ['/login', '/forget-password']
  const path = window.location.pathname
  const isWhiteList = whiteList.indexOf(path) >= 0

  return (
    <div className={`main-content ${isWhiteList && 'whitelist'}`}>
      <Router history={browserHistory}>
        <Switch>
          { renderRouter(appRouter).map(render => render) }
          {/* <PrivateRoute path='/test/:id' component={Keyword} /> */}
          <PrivateRoute path='/test/:id' />
          <Route path='*' component={NotFoundRoute} />
        </Switch>
      </Router>
    </div>
  )
}

export default routes
