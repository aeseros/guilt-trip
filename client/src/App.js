import React from 'react';
// eslint-disable-next-line
import  { BrowserRouter as Router, Route } from 'react-router-dom'
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
      
      <Route exact path="/register">
        <Register />
      </Route>
    </Router>
  );
}

export default App;
