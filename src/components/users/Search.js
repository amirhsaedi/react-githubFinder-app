import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
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
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        </form>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;
