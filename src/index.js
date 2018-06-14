import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Route from './routes';
// import Header from './components/Header/Header';
import store from './store';

const App = () => (
  <div>
    {/* <Header /> */}
    <Route />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('index'),
);
