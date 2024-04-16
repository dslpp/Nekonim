import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';

import { ThemeProvider } from './ThemeContext';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true); // Состояние для отслеживания процесса загрузки

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          localStorage.setItem('theme', 'light');
        }
        check().then(data => {
          user.setUser(data);
          user.setIsAuth(true);
        }).catch(() => {
          localStorage.clear();
        });
      } finally {
        setLoading(false); // Установка состояния загрузки в false при завершении загрузки данных
      }
    };

    fetchData();
  }, [user]);

  // Показывать прелоадер, пока происходит загрузка данных
  if (loading) {
    return <div>Loading...</div>; // Здесь можно использовать компонент прелоадера
  }

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
