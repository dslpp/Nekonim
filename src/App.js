import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { ThemeProvider } from './ThemeContext';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user}= useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    
    check().then(data=>{
      user.setUser(true)
      user.setIsAuth(true)
    }).
    finally(()=> setLoading(false))
}, [])
 
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
});

export default App;
