import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => (
  <GithubState>
    <AlertState>
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path={'/user/:login'} component={User} />
          </Switch>
        </div>
      </div>
    </AlertState>
  </GithubState>
);

export default App;