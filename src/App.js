import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // SEARCH GITHUB USERS
  searchUsers = async query => {
    this.setState({ loading: true });

    try {
      const users = await axios.get(
        `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: users.data.items, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  // CLEAR USERS FROM STATE
  clearUsers = () => this.setState({ users: [], loading: false });

  // SET ALERT
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path="/" render={() => (
              <Fragment>
                <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </div>
    );
  }
};

export default App;
