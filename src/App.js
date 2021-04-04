import React from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  Home,
  Signup,
  Login,
  Profile,
  About,
  ForgotPassword,
  PrivateRoute,
  PublicRoute
} from './components'

import { AuthProvider } from './context/authContext'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
