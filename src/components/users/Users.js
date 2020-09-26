import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ users, loading }) => {
    let usersData = (
        <div style={userStyle}>
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    );

    if (loading) {
        usersData = <Spinner />;
    }

    return usersData;
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users;
