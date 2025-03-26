import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import './lib/react-widget-wrapper.tsx';

// Render the development preview app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('React Chat Widget web component is registered and available as <react-chat-widget>');
