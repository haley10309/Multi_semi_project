import './App.css';
import BoardList from "./routes/boardList";
import Home from "./routes/Home";
import {Route, Routes} from "react-router-dom";
import Login from './routes/Login';
import { Component } from 'react';
import Assign from './routes/Assign';


/* App.js */

class App extends Component {
  render(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardList />} />
        <Route path = '/Login' element={<Login/>}/>
        <Route path = '/Assign' element={<Assign/>}/>
      </Routes>
      
    );
  }
  
}

export default App;