import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
