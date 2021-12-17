import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation/>
      <App />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

