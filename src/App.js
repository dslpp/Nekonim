// App.js
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import ThemeContext, { ThemeProvider } from './ThemeContext';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
