/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from 'containers/Page/ProfilePage/loadable';
import NotFoundPage from 'containers/Page/NotFoundPage/Loadable';
import LoginPage from 'containers/Page/LoginPage/loadable';
import RegistrationPage from 'containers/Page/RegistrationPage/loadable';
import Layout from 'containers/Layout/CommonLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from '../../global-styles';
import PrivateRoute from './privateRoute';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Profile App" defaultTitle="Profile App">
        <meta name="description" content="Profile App by Numpon M." />
      </Helmet>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <PrivateRoute path="/profile" exact>
          <Layout component={ProfilePage} />
        </PrivateRoute>
        <PrivateRoute path="/" exact>
          <Layout component={ProfilePage} />
        </PrivateRoute>
        <Route exact path="">
          <Layout component={NotFoundPage} />
        </Route>
      </Switch>
      <GlobalStyle />
    </>
  );
}
