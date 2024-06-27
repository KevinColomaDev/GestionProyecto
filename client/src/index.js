import React from 'react';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Rutas from './rutas/Rutas'
import {createRoot} from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Rutas />
  </BrowserRouter>,
  document.getElementById("raiz")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
