import * as React from 'react';
// import { Link } from 'react-router-dom';

import Navbar from './Navbar';

import './PageHeader.css';
import { connect } from 'react-redux';
import { RootState, UserState } from 'types';

const loggedOutLinks = [{ path: 'auth', text: 'login / signup' }];

const loggedInLinks = [{ path: 'checkout' }, { path: 'inventory' }];

const PageHeader = (account: UserState) => {
  return (
    <header>
      <div className="Navbar-container">
        <Navbar links={account.loggedIn ? loggedInLinks : loggedOutLinks} />
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootState): UserState => ({
  ...state.currentUser
});

export default connect(mapStateToProps)(PageHeader);
