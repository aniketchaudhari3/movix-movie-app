import React from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Home,
  Signup,
  Login,
  Profile,
  About,
  ForgotPassword,
  Search,
  MovieDetails,
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
          <Route path="/search/:query" component={Search} />
          <Route path="/movie/:movieId" component={MovieDetails} />
          <Redirect from="/movie/" to="/" />
          <Redirect from="/search/" to="/" />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
