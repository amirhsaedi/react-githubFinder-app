import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = props => {
    const [text, setText] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        props.searchUsers(text);
        setText('');
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
        </form>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired
};

export default Search;
