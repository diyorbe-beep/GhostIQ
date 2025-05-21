import React from 'react';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Sciences from './pages/sciences/sciences';
import RainIcons from './components/RainningIcons/RainIcons';
import Statistics from './pages/Statistika/statistika';
const App = () => {
  return (
    <div>
      <RainIcons></RainIcons>
      <RainIcons />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sciences" element={<Sciences />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
