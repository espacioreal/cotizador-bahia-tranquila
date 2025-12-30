import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CotizacionesProvider } from './context/CotizacionesContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Historial from './pages/Historial';

function App() {
  return (
    
    <CotizacionesProvider>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
          
          <Header />
          
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/historial" element={<Historial />} />
            </Routes>
          </main>

          <Footer />
          
        </div>
      </Router>
    </CotizacionesProvider>
  );
}

export default App;