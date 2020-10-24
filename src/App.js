import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  // componentDidMount() {
  //   this.fetchGithubUsers();
  // };

  // fetchGithubUsers = async () => {
  //   this.setState({ loading: true });

  //   try {
  //     const users = await axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     this.setState({ users: users.data, loading: false });
  //   } catch (error) {
  //     this.setState({ loading: false });
  //     console.log(error);
  //   }
  // };

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

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
};

export default App;
