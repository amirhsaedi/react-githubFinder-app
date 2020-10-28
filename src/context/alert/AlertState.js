import React, { useReducer } from 'react';

import AlertContext from '../alert/alertContext';
import AlertReducer from '../alert/alertReducer';
import * as types from '../types';

const GithubState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // SET ALERT
    const setAlert = (message, type) => {
        dispatch({ type: types.SET_ALERT, payload: { message, type } });

        setTimeout(() => dispatch({ type: types.REMOVE_ALERT }), 5000);
    };

    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default GithubState;
