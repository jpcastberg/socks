/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SockViewer from './SockViewer.jsx';
import { logoutUser } from '../../actions/authActions';

const defaultSock = {
  brand: '-',
  color: '-',
  description: 'No socks are available for today! Go to the sock store!',
  image: 'https://cdn.drawception.com/images/panels/2016/3-24/dwrnhO6q84-4.png',
};

class TodaysSocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysSocks: {
        left: defaultSock,
        right: defaultSock,
      },
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const { id } = auth.user;
    fetch(`/api/socks/${id}`)
      .then((todaysSocks) => {
        return todaysSocks.json();
      })
      .then((json) => {
        if (json.length > 0) {
          this.setState({
            todaysSocks: json[json.length - 1],
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
    const { todaysSocks } = this.state;
    const { left, right } = todaysSocks;
    const { auth } = this.props;
    const { user } = auth;
    return (
      <div style={{ height: '75vh', marginTop: '10%' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <p>{`Here are your socks for today, ${user.name.split(' ')[0]}!`}</p>
            </h4>
            <br/>
            <br/>
            <SockViewer foot="LEFT" sock={left} />
            <SockViewer foot="RIGHT" sock={right} />
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
TodaysSocks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser },
)(TodaysSocks);
