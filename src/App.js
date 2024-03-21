import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import BoardList from './routes/boardList';
import Home from './routes/Home';
import Login from './routes/Login';
import Assign from './routes/Assign';

class App extends Component {
  componentDidMount() {
    // Check if "LoginID" is not present or null in localStorage
    if (!localStorage.getItem('LoginID')) {
      // Set "LoginID" to "guest"
      localStorage.setItem('LoginID', 'guest');
    }
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Home stateRefresh={this.props.stateRefresh} />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Assign" element={<Assign />} />
      </Routes>
    );
  }
}

export default App;
