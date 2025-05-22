import React from 'react';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Sciences from './pages/sciences/sciences';
import RainIcons from './components/RainningIcons/RainIcons';
import Statistics from './pages/Statistika/statistika';
import Login from './pages/login/login';
import Signup from './pages/Signup/Signup';
import Matematika from '../src/pages/test/Math/Math.jsx'
import OnaTili from './pages/test/OnaTili/OnaTili';
const App = () => {
  return (
    <div>
      <RainIcons></RainIcons>
      <RainIcons />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sciences" element={<Sciences />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Matematika" element={<Matematika />} />
          <Route path="/OnaTili" element={<OnaTili />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
