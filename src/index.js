import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import GoodsStore from './store/GoodsStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={
    {
      user: new UserStore(),
      goods:new GoodsStore()
    }}>
    <App/>
  </Context.Provider>
);

