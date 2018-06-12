import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Route from './routes';
import Header from './components/Header/Header';

const App = () => (
  <div>
    <Header />
    <Route />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('index'),
);
