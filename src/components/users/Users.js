import React, { useContext } from 'react';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
    const { loading, users } = useContext(GithubContext);

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

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users;
