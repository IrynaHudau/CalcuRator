import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import reducer from './redux/store/reducers/reducer';
import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const logger = store => {
  return next => {
      return action => {
          // console.log('[Middleware] Dispatching', action);
          const result = next(action);
          // console.log('[Middleware] next state', store.getState());
          return result;
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
