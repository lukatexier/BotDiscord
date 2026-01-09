import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Etudiants from './pages/etudiants';
import Edt from './pages/edt';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/edt/:id" element={<Edt />} />
      </Routes>
    </Router>
  );
}

export default App;

