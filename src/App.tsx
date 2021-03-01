import React from 'react';
import { HashRouter as Router, Switch, Route, RouteProps } from "react-router-dom";
import routes from './route'

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {
            routes.map((route: RouteProps) => {
              return <Route exact={route.path === "/login"} key={'router-' + route.path} path={route.path} component={route.component} />
            })
          }
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
