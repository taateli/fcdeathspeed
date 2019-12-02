import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Kirjaudu ulos</span>
        </a>
        <li>
          <Link to='/addPlayer'>
            <i className='fas fa-user-plus'></i>Lisää pelaaja
          </Link>
        </li>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/adminLogin'>Admin</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-futbol'></i> FC Deathspeed
        </Link>
      </h1>
      <h2>
        <Link to='/players'>
          <i className='fas fa-users'></i> Pelaajat
        </Link>
      </h2>
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
