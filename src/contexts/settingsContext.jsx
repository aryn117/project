import { createContext, useContext, useEffect, useState } from "react";

// Create context
const SettingsContext = createContext();

// Provide settings to the app
export const SettingsProvider = ({ children }) => {
  // Load settings from localStorage or use defaults
  const getInitialSettings = () => {
    return {
      theme: localStorage.getItem("theme") || "business",
      resultLayout: localStorage.getItem("resultLayout") || "card",
    };
  };

  const [settings, setSettings] = useState(getInitialSettings);

  // Update localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("theme", settings.theme);
    localStorage.setItem("resultLayout", settings.resultLayout);
  }, [settings]);

  // Function to update settings
  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export const useSettings = () => useContext(SettingsContext);
