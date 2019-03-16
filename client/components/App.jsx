/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import Navbar from './layout/Navbar.jsx';
import Landing from './layout/Landing.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
      </div>
    );
  }
}
export default App;
