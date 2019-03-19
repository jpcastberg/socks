/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div style={{ marginBottom: '20%' }} className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: 'monospace',
              }}
              className="col s5 brand-logo center black-text"
            >
              Home
            </Link>
            <br />
            <Link
              to="/todayssocks"
              style={{
                fontFamily: 'monospace',
              }}
              className="col s5 brand-logo center black-text"
            >
              Today's Socks
            </Link>
              <br/>
            <Link
              to="/mysocks"
              style={{
                fontFamily: 'monospace',
              }}
              className="col s5 brand-logo center black-text"
            >
              My Socks
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
