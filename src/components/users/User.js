import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

const User = ({ getUser, loading, user, match }) => {
    useEffect(() => {
        getUser(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        html_url,
        login,
        company,
        bio,
        blog,
        followers,
        following,
        hireable,
        public_gists,
        public_repos,
        location
    } = user;

    let userData = (
        <Fragment>
            <Link to="/" className="btn btn-light">Back To Search</Link>
            Hireable: {' '}
            {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt={name} className="round-img" style={{ width: '170px' }} />
                    <h1>{name}</h1>
                    <address>Location: {location}</address>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
        </Fragment>
    );

    if (loading) userData = <Spinner />;

    return userData;
};

User.propTypes = {
    getUser: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired
};

export default User;