import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ensure initial load or hard refresh starts at the very top (header + banner visible)
window.requestAnimationFrame(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
