import React, { Component } from 'react';

import SearchInput from '../components/SearchInput';

import './NavBarSearch.css';

class NavBarSearch extends Component {

  onSearch(term, debounce) {
    console.log(term, debounce);
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-light navbar-search">
        <div className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">        
          <a className="logo" href="#"><img src="assets/Logo_ML.png" /></a>
          <SearchInput onSearch={this.onSearch.bind(this)} />
        </div>
      </nav>
    );
  }
}

export default NavBarSearch;