import React, { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // SEARCH GITHUB USERS
  const searchUsers = async query => {
    setLoading(true);

    try {
      const users = await axios.get(
        `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(users.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // GET SINGLE GITHUB USER
  const getUser = async username => {
    setLoading(true);

    try {
      const user = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(user.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // GET USERS REPOS
  const getUserRepos = async username => {
    setLoading(true);

    try {
      const repo = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setRepos(repo.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // CLEAR USERS FROM STATE
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // SET ALERT
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => (
            <Fragment>
              <Alert alert={alert} />
              <Search
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={showAlert}
              />
              <Users loading={loading} users={users} />
            </Fragment>
          )} />
          <Route exact path="/about" component={About} />
          <Route exact path={'/user/:login'} render={props => (
            <User
              {...props}
              loading={loading}
              user={user}
              repos={repos}
              getUser={getUser}
              getUserRepos={getUserRepos}
            />
          )} />
        </Switch>
      </div>
    </div>
  );
};

export default App;