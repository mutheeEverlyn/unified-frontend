import React from 'react';
import { Provider } from 'react-redux';
import {store,persistedStore} from './app/store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistedStore}>
      <App />
      </PersistGate>
      </Provider>
  </React.StrictMode>,
)
