import React from 'react';

const SockViewer = (props) => {
  const image = () => {
    if (props.sock.image) {
      return (
        <img style={{ width: '25%' }} src={props.sock.image} alt=""/>
      );
    }
    return (
      <p>No image :(</p>
    );
  };

  const foot = () => {
    if (props.foot) {
      return (
        <b>{`${props.foot}:`}</b>
      );
    }
  };

  return (
    <div>
      {foot()}
      <br/>
      {props.sock.brand}
      <br/>
      {props.sock.color}
      <br/>
      {props.sock.description}
      <br/>
      {image()}
    </div>
  );
};

SockViewer.defaultProps = {
  foot: 'no foot',
  sock: {},
};

export default SockViewer;
