import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import NavBarSearch from './NavBarSearch';
import Results from './Results';

import './App.css';

const App = () =>
  <div>
    <NavBarSearch />     
    <div className="has-header col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">
      <Switch>
        <Route exact path="/" component={Results} />
        <Route exact path="/items" component={Results} />
      </Switch>
    </div>
  </div>;

export default App;
