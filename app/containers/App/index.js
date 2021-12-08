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

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/loadable';
import Layout from 'containers/Layout/CommonLayout';

import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Profile App" defaultTitle="Profile App">
        <meta name="description" content="Profile App by Numpon M." />
      </Helmet>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/">
          <Layout component={HomePage} />
        </Route>
        <Route path="/features">
          <Layout component={FeaturePage} />
        </Route>
        <Route exact path="">
          <Layout component={NotFoundPage} />
        </Route>
      </Switch>
      <GlobalStyle />
    </>
  );
}
