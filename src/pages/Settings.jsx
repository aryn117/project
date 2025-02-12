import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useSettings } from '../contexts/settingsContext';

function Settings() {

  const { settings, updateSettings } = useSettings();


 
  const themes = [
    { name: 'light', color: '#ffffff' },
    { name: 'dark', color: '#1d232a' },
    { name: 'cupcake', color: '#faf7f5' },
    { name: 'bumblebee', color: '#fde68a' },
    { name: 'emerald', color: '#10b981' },
    { name: 'corporate', color: '#4b6bfb' },
    { name: 'synthwave', color: '#2d1b69' },
    { name: 'retro', color: '#ef9995' },
    { name: 'cyberpunk', color: '#ff7598' },
    { name: 'valentine', color: '#e96d7b' },
    { name: 'halloween', color: '#f28c18' },
    { name: 'garden', color: '#5c7f67' },
    { name: 'forest', color: '#1eb854' },
    { name: 'aqua', color: '#09ecf3' },
    { name: 'lofi', color: '#808080' },
    { name: 'pastel', color: '#d1c1d7' },
    { name: 'fantasy', color: '#6e0b75' },
    { name: 'wireframe', color: '#b8b8b8' },
    { name: 'black', color: '#000000' },
    { name: 'luxury', color: '#gold' },
    { name: 'dracula', color: '#ff79c6' },
    { name: 'cmyk', color: '#45AEEE' },
    { name: 'autumn', color: '#8C0327' },
    { name: 'business', color: '#1C4E80' },
    { name: 'acid', color: '#00FF00' },
    { name: 'lemonade', color: '#D9ED92' },
    { name: 'night', color: '#0F172A' },
    { name: 'coffee', color: '#6F4E37' }
  ];

  useEffect(() => {
    console.log("refreshed")
  }, [settings]);

  const handleThemeChange = (newTheme) => {
    updateSettings('theme', newTheme );
    toast.success(`Theme updated to ${newTheme}!`);
  };

  const handleResultLayoutChange = (newLayout) => { 

    updateSettings('resultLayout' , newLayout);
    toast.success(`Result layout updated to ${newLayout}!`);
  };


  console.log('Settings:', settings);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 font-mono text-4xl font-bold">Settings</h1>

        {/* Layout Selector Selector */}
        <div className="shadow-xl my-4 card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6  font-mono card-title">Results Layout</h2>
         
              <ul className="menu menu-horizontal bg-base-200 w-fit rounded-box">
                <li className={`${settings.resultLayout === 'card' ? 'bg-primary text-white' : ''}`}  onClick={() => handleResultLayoutChange('card')} ><a>Card</a></li>
                <li className={`${settings.resultLayout === 'compact-card' ? 'bg-primary text-white' : ''}`} onClick={() => handleResultLayoutChange('compact-card')} ><a>Compact Card</a></li>
                <li className={`${settings.resultLayout === 'table' ? 'bg-primary text-white' : ''}`} onClick={() => handleResultLayoutChange('table')} ><a>Table</a></li>
              </ul>
       

          </div>
        </div>
        {/* Theme Selector */}
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6 font-mono card-title">Themes</h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => handleThemeChange(t.name)}
                >
                  <div
                    className={`w-12 h-12 rounded-md border-4 ${settings.theme === t.name ? 'border-primary' : 'border-transparent'
                      }`}
                    style={{
                      backgroundColor: t.color,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <span className="font-mono text-sm capitalize">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;