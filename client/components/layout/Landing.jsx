/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Build</b> a login/auth app with the{' '}
              <span style={{ fontFamily: 'monospace' }}>MERN</span> stack from
              scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
            <Link to="/register">
              <span
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </span>
            </Link>
            <Link to="/login">
              <span
                style={{
                  marginLeft: '2rem',
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className="btn btn-large waves-effect white hoverable black-text"
              >
                Log In
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
