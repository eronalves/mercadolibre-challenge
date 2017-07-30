import React, { Component } from 'react';

import './NavBarSearch.css';

class NavBarSearch extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-light navbar-search">
        <div className="offset-sm-2 col-sm-8">
          <a className="" href="#"><img src="assets/Logo_ML.png" /></a>
        </div>
      </nav>
    );
  }
}

export default NavBarSearch;