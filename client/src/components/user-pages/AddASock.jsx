/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

class AddASock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      color: '',
      description: '',
      image: '',
    };
  }

  onLogoutClick(e) {
    const { logoutUser } = this.props;
    e.preventDefault();
    logoutUser();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit() {
    const { auth } = this.props;
    const { id } = auth.user;
    const body = JSON.stringify(this.state);
    console.log(body);
    fetch(`/api/socks/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  render() {
    const { brand, color, description, image } = this.state;
    const { auth } = this.props;
    const { user } = auth;
    return (
      <div style={{ height: '75vh', marginTop: '10%' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <b>Brand</b>
            <input id="brand" value={brand} onChange={(e) => { this.handleChange(e); }} type="text" />
            <b>Color</b>
            <input id="color" value={color} onChange={(e) => { this.handleChange(e); }} type="text" />
            <b>Description</b>
            <input id="description" value={description} onChange={(e) => { this.handleChange(e); }} type="text" />
            <b>Image</b>
            <input id="image" value={image} onChange={(e) => { this.handleChange(e); }} type="text" />
            <p>
              ^^Use
              <a href="https://imgur.com/upload" target="_blank"> Imgur </a>
              to upload an image, then paste the link here!^^
            </p>
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              onClick={() => { this.handleSubmit(); }}
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Add
            </button>
            <br />
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
AddASock.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser },
)(AddASock);
