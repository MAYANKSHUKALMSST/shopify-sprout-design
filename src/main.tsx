
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a custom event to notify users when app can work offline
window.addEventListener('load', () => {
  function updateOnlineStatus() {
    const condition = navigator.onLine ? 'online' : 'offline';
    console.log(`App is now ${condition}`);
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

createRoot(document.getElementById("root")!).render(<App />);
