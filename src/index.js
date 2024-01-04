import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import { Provider } from 'react';
import reportWebVitals from './reportWebVitals';
//import {applyMiddleware,compose} from 'redux'
//import { createStore } from 'redux';
//import {thunk} from "redux-thunk"
//import Reducers from './reducers';


const root = ReactDOM.createRoot(document.getElementById('root'));
//const store=createStore(Reducers,compose(applyMiddleware(thunk)))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);
reportWebVitals();
