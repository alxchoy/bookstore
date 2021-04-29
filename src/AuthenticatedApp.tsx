import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useAuth } from './context/auth-context';

function Home() {
  const { authLogout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={authLogout}>Logout</button>
    </div>
  );
}

export default function AuthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
}
