/* eslint-disable import/extensions */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './layout/Navbar.jsx';
import Landing from './layout/Landing.jsx';
import Register from './auth/Register.jsx';
import Login from './auth/Login.jsx';
import store from '../store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
