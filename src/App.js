import logo from './logo.svg';
import './App.css';
import BoardList from "./routes/boardList";
import Home from "./routes/Home";
import {Route, Routes} from "react-router-dom";

/* App.js */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<BoardList />} />
    </Routes>
    
  );
}

export default App;