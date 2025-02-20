import React from 'react';
import { Provider } from 'react-redux';
import {store} from './app/store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import { PersistGate } from 'redux-persist/integration/react';
import { ClerkProvider } from '@clerk/clerk-react';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store} >
      <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)
