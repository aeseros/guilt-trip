import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Container>
        <NavBar />

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Container>
    </Router>
  );
}

export default App;
