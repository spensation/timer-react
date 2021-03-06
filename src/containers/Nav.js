import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react'

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Menu size="small" borderless>
          <Menu.Item header>React Timer</Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            activeClassName="active"
            to="/"
            icon="home" />
          <Menu.Item
            as={NavLink}
            icon="clock"
            activeClassName="active"
            to="/timer/routine"
            name="Routine Timer" />
          <Menu.Item
            as={NavLink}
            exact
            icon="list"
            activeClassName="active"
            to="/routines"
            name="Routines" />
          <Menu.Item
            as={NavLink}
            activeClassName="active"
            icon="plus"
            to="/routines/new"
            name="New Routine" />
          { this.props.loggedIn ? (
            <Menu.Menu position='right'>
              <Menu.Item
                as={NavLink}
                activeClassName="active"
                to="/signout"
                icon="sign out"
                name="Sign Out" />
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              <Menu.Item
                as={NavLink}
                activeClassName="active"
                to="/register"
                icon="signup"
                name="Register" />
              <Menu.Item
                as={NavLink}
                activeClassName="active"
                to="/signin"
                icon="sign in"
                name="Sign In" />
            </Menu.Menu>
          )}
        </Menu>
      </nav>
    );
  }
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}
