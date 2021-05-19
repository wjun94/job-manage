import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route, RouteProps } from 'react-router-dom'
import routes from './route'
import { connect } from 'react-redux'
import { setMngList } from '@/store/common/action'

export interface P {
  setMngList: () => void
}

function App(props: P) {
  const { setMngList } = props
  useEffect(() => {
    setMngList()
  }, [setMngList])
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route: RouteProps) => {
            return (
              <Route
                exact={route.path === '/login'}
                key={'router-' + route.path}
                path={route.path}
                component={route.component}
              />
            )
          })}
        </Switch>
      </React.Suspense>
    </Router>
  )
}

export default connect(null, (dispatch) => ({
  setMngList() {
    dispatch(setMngList() as any)
  },
}))(App)
