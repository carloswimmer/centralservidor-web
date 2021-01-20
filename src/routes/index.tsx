import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NextPage from '../pages/NextPage';

const Routes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={500}>
      <Switch location={location}>
        <Route path="/" exact component={SignIn} isPublic />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/next-page" component={NextPage} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default Routes;
