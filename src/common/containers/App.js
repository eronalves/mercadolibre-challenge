import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions';

import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import NavBarSearch from './NavBarSearch';

import './App.css';

const mapStateToProps = state => ({
  counter: state.counter,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}


const App = () =>
  <div>
    <NavBarSearch />
    <Switch>
      <Route exact path="/" component={connect(mapStateToProps, mapDispatchToProps)(Counter)} />
    </Switch>
  </div>;

export default App;
