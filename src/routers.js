import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { STORAGEKEY } from '@/utils/storage'
import { checkPermission } from '@/utils/JWT'
import NotFoundRoute from './pages/404'
import LoginPage from './pages/login'
import MyLeavePage from './pages/myleave'
import NoicePage from './pages/notice'
import RequestsPage from './pages/requests'
import TimesheetPage from './pages/timesheet'
import profileContentPage from './pages/profile/profileContent'
import profileContentUpdate from './pages/profile/profileContentUpdate'
import Home from './pages/home'
import RegisterLateEarly from './layouts/components/registerLateEarly'
import EditLateEarly from './layouts/components/updateLateEarly'
import ConfirmRegisterLateEarly from './layouts/components/confirmRegisterLateEarly'
import RegisterOT from './layouts/components/registerOT'

const PrivateRoute = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const Component = props.component
  return (
    <Route
      {...props.rest}
      exact
      render={(prop) =>
        cookies[STORAGEKEY.ACCESS_TOKEN] ? (
          <Component {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { redirect_url: prop.location }
            }}
          />
        )
      }
    />
  )
}

const WhiteListRoute = (props) => {
  const whiteList = ['/login', '/forget-password']
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN])
  const isWhiteList = (path) => !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0

  return (
    <Route
      {...props.rest}
      exact
      render={(prop) =>
        isWhiteList(props.path) ? (
          <div>{React.createElement(props.component, prop)}</div>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

export const appRouter = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: profileContentPage,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: false,
      child: false
    }
  },
  {
    name: 'ProfileUpdate',
    path: '/profileUpdate',
    component: profileContentUpdate,
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
  },
  {
    name: 'registerLateEarly',
    path: '/registerLateEarly',
    component: RegisterLateEarly,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: true,
      child: false
    }
  },
  {
    name: 'updateLateEarly',
    path: '/updateLateEarly',
    component: EditLateEarly,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: true,
      child: false
    }
  },
  {
    name: 'confirmLateEarly',
    path: '/confirmLateEarly',
    component: ConfirmRegisterLateEarly,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: true,
      child: false
    }
  },
  {
    name: 'registerOT',
    path: '/registerOT',
    component: RegisterOT,
    meta: {
      role: '*',
      isPrivate: true,
      hidden: true,
      child: false
    }
  }
]

const renderRouter = (routes) => {
  let arr = []
  routes.forEach((route) => {
    const tmpRoute = route.meta.isPrivate ? (
      <PrivateRoute exact path={route.path} component={route.component} key={route.name} />
    ) : (
      <WhiteListRoute path={route.path} component={route.component} key={route.name} />
    )
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
      <Switch>
        {renderRouter(appRouter).map((render) => render)}
        {/* <PrivateRoute path='/test/:id' component={Keyword} /> */}
        <PrivateRoute path='/test/:id' />
        <Route path='*' component={NotFoundRoute} />
      </Switch>
    </div>
  )
}

export default routes
