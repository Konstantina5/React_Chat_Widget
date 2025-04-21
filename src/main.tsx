import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import './lib/react-widget-wrapper.tsx';
import { Provider } from 'react-redux';
import { store } from './lib/state/store.ts';

// Render the development preview app
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
);

console.log('React Chat Widget web component is registered and available as <react-chat-widget>');
