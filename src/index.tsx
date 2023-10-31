import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './karyanaStoreStyless/app.css'
import store from '../src/reduxStore/store/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from './GloalErrorsHanlder/FallackReader';

let el = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(el);
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
    <ErrorBoundary
        FallbackComponent={FallbackRender}
        onReset={():void => {console.log('reset the page') }}
        > 
        <App />
      </ErrorBoundary>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

