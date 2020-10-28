import React, { Fragment } from 'react';

import Alert from '../../components/layout/Alert';
import Search from '../../components/users/Search';
import Users from '../../components/users/Users';

const Home = () => (
    <Fragment>
        <Alert />
        <Search />
        <Users />
    </Fragment>
);

export default Home;
