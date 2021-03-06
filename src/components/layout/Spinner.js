import React, { Fragment } from 'react';

import spinner from '../../assets/spinner.gif';

const Spinner = () => (
    <Fragment>
        <img
            src={spinner}
            alt="Loading ..."
            style={{
                width: '200px',
                display: 'block',
                margin: 'auto'
            }}
        />
    </Fragment>
);

export default Spinner;