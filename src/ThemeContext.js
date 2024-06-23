import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNegative, setIsNegative] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    const currentNegative = localStorage.getItem('negative'); 

    if (currentTheme) {
      setIsDarkMode(currentTheme === 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    if (currentNegative) {
      setIsNegative(currentNegative === 'true'); 
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', newTheme);
    setIsNegative(!isNegative);
    setIsDarkMode(!isDarkMode);

    localStorage.setItem('negative', (!isNegative).toString());
  };

  return (
    <ThemeContext.Provider value={{ isNegative, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
