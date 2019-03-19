/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    const { auth, history } = this.props;
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      history.push('/todayssocks');
    }
  }

  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Socks: </b>
              A new, fabulous way to randomize what you wear!
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Release the burden of choosing socks each day into the open arms of technology.
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
)(Landing);
