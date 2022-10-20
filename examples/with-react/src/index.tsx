import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MaestroProvider } from 'toggle-maestro';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MaestroProvider accessToken={process.env.REACT_APP_MAESTRO_KEY as string} enableExtension>
      <App />
    </MaestroProvider>
  </React.StrictMode>
);
