import * as types from '../types';

const GithubReducer = (state, action) => {
    switch (action.type) {
        case types.SEARCH_USERS:
            return { ...state, users: action.payload, loading: false };
        case types.GET_USER:
            return { ...state, user: action.payload, loading: false };
        case types.GET_REPOS:
            return { ...state, repos: action.payload, loading: false };
        case types.CLEAR_USERS:
            return { ...state, users: [], loading: false };
        case types.SET_LOADING:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default GithubReducer;