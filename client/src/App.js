import './App.css';
import BoardList from "./routes/boardList";
import Home from "./routes/Home";
import {Route, Routes} from "react-router-dom";
import Login from './routes/Login';


/* App.js */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
      <Route path = '/Login' element={<Login/>}/>
    </Routes>
    
  );
}

export default App;