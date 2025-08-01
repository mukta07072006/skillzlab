import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import OneSignal from 'react-onesignal';

function Root() {
  useEffect(() => {
    // Only run on client-side and only once
    if (!window.OneSignalInitialized) {
      OneSignal.init({
        appId: 'b87d2935-bc73-4e90-b5ec-92ce466d47a4',
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      window.OneSignalInitialized = true;
    }
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
