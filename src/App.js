import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { ThemeProvider } from './ThemeContext';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
        if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          localStorage.setItem('theme', 'light');
        }
        check().then(data => {
          user.setUser(data);
          user.setIsAuth(true);
        }).catch(() => {
          localStorage.clear();});};
    fetchData();
  }, [user]);
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
