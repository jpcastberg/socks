/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SockViewer from './SockViewer.jsx';
import { logoutUser } from '../../actions/authActions';

class MySocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socks: [],
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const { id } = auth.user;
    fetch(`/api/socks/all/${id}`)
      .then((allSocks) => {
        return allSocks.json();
      })
      .then((json) => {
        if (json.length > 0) {
          this.setState({
            socks: json,
          });
        }
      });
  }

  onLogoutClick(e) {
    const { logoutUser } = this.props;
    e.preventDefault();
    logoutUser();
  }

  render() {
    const { socks } = this.state;
    const { auth } = this.props;
    const { user } = auth;
    const sockElements = socks.map((sock) => {
      return (
        <SockViewer sock={sock} />
      );
    });
    return (
      <div style={{ height: '75vh', marginTop: '15%' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <p>{`Here are all of your your socks, ${user.name.split(' ')[0]}!`}</p>
            </h4>
            <br/>
            <br/>
            {sockElements}
            <br/>
            <Link
              to="/addasock"
              style={{
                fontFamily: 'monospace',
                position: 'relative',
              }}
              className="col s5 brand-logo center black-text"
            >
              Add A Sock
            </Link>
            <br/>
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              onClick={this.onLogoutClick.bind(this)}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
MySocks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser },
)(MySocks);
