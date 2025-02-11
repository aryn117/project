
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';


import Settings from './pages/Settings';

import { useSettings } from './contexts/settingsContext';



function App() {
  const { settings } = useSettings();

  useEffect(() => {
    const theme = settings.theme;
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (

    <>

      <Router>
        <div className="min-h-screen bg-base-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
      <Toaster position="bottom-right" />

    </>

  );
}

export default App;