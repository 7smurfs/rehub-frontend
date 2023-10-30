import './index.css';
import Login from './pages/Login';
import Index from './pages/Index';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route exact path="/" element={<Index />}/>
        <Route path="/about" element={<>About smurf</>}/>
      </Routes>
    </Router>
  );
}

export default App;
