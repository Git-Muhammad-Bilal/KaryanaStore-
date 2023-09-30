import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './karyanaStoreStyless/app.css'
import {store} from '../src/reduxStore/store/store';
import App from './App';

let el = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(el);
root.render(

  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

