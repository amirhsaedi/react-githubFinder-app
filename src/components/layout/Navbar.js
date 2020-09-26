import React from 'react';
import PropsTypes from 'prop-types';

const Navbar = ({ icon, title }) => (
    <nav className="navbar bg-primary">
        <h1>
            <i className={icon}></i> {title}
        </h1>
    </nav>
);

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropsTypes.string.isRequired,
    icon: PropsTypes.string.isRequired
};

export default Navbar;