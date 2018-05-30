import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import Route from './routes';

const App = () => (
  <div>
    Main App
    <Route />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("index")
);
