import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import { TransactionProvider } from './context/TransactionContext.jsx'
import App from './App.jsx'
import './index.css'
import { IntersectionObserverProvider } from './context/IntersectionObserverContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-1te1emklmo360xly.us.auth0.com"
    clientId="PIMgtYFCw6nFSUJuYoNXUhYKBPhXajXe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
  <IntersectionObserverProvider>
  <TransactionProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionProvider> 
  </IntersectionObserverProvider>
  </Auth0Provider>
  
)
