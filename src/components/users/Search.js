import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const { searchUsers, clearUsers, users } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const [text, setText] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        if (text === '') {
            setAlert('Please enter something.', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    const onChange = event => setText(event.target.value);

    return (
        <form onSubmit={onSubmit} className="form">
            <input
                type="text"
                name="text"
                onChange={onChange}
                value={text}
                placeholder="Search users ..."
            />
            <input
                type="submit"
                value="search"
                className="btn btn-dark btn-block"
            />
            {users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </form>
    );
};

export default Search;
