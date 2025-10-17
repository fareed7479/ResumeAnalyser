import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReportProvider } from './context/ReportContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';

function App() {
  return (
    <ReportProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyzer" element={<Analyzer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatAssistant />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ReportProvider>
  );
}

export default App;
