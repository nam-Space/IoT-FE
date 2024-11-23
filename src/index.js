import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'chartjs-adapter-moment';
import "chart.js/auto";
import App from './App';
import { UserProvider } from './utils/UserContext';
import { BrowserRouter, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
