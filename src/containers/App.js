import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Timer from './Timer';
import RoutinesExplore from './RoutinesExplore';
import RoutineTimer from './RoutineTimer';
import NewRoutineForm from './NewRoutineForm';
import EditRoutineForm from './EditRoutineForm';
import Register from './Register';
import SignIn from './SignIn';
import SignOut from './SignOut';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <nav>
            <ul>
              <li><Link to="/">Basic Timer</Link></li>
              <li><Link to="/timer/routine">Routine Timer</Link></li>
              <li><Link to="/routines">Routines</Link></li>
              <li><Link to="/routines/new">New Routine</Link></li>
              { this.props.loggedIn ? (
                <div>
                  <li><Link to="/signout">Sign Out</Link></li>
                </div>
              ) : (
                <div>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/signin">Sign In</Link></li>
                </div>
              )}
            </ul>
          </nav>
          <div>
            <Route exact path='/' component={Timer} />
            <Switch>
              <Route path='/timer/routine/:routineId' component={RoutineTimer} />
              <Route path='/timer/routine' component={RoutineTimer} />
            </Switch>
            <Switch>
              <Route
                path='/routines/:routineId/edit'
                component={EditRoutineForm} />
              <Route path='/routines/new' component={NewRoutineForm} />
              <Route path='/routines' component={RoutinesExplore} />
            </Switch>
            <Route path='/register' component={Register} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signout' component={SignOut} />
          </div>
      </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.session,
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
