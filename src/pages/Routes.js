import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Paga from './Paga';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/paga" component={Paga} />
  </Switch>
);

export default Routes;
