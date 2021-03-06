import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import UrlSearchParamsHOC from './UrlSearchParamsHOC';
import NavBarSearch from './NavBarSearch';
import Breadcrumbs from './Breadcrumbs';
import Results from './Results';
import Details from './Details';

import './App.css';

const App = () =>
  <div>
    <NavBarSearch />     
    <div className="has-header col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">
      <Breadcrumbs />
      <Switch>
        <Route exact path="/" component={UrlSearchParamsHOC(Results)} />
        <Route exact path="/items/:id" component={UrlSearchParamsHOC(Details)}/>
        <Route exact path="/items" component={UrlSearchParamsHOC(Results)} />
      </Switch>
    </div>
  </div>;

export default App;
