import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import * as types from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // SEARCH USERS
    const searchUsers = async query => {
        setLoading();

        try {
            const response = await axios.get(
                `https://api.github.com/search/users?q=${query}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );

            dispatch({ type: types.SEARCH_USERS, payload: response.data.items });
        } catch (error) {
            console.log(error);
        }
    };

    // GET USER
    const getUser = async username => {
        setLoading();

        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );

            dispatch({ type: types.GET_USER, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    // GET REPOS
    const getUserRepos = async username => {
        setLoading();

        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
            );

            dispatch({ type: types.GET_REPOS, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    // CLEAR USERS
    const clearUsers = () => dispatch({ type: types.CLEAR_USERS });

    // SET LOADING
    const setLoading = () => dispatch({ type: types.SET_LOADING });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
