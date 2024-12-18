import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="58028218160-akgv2cekj8t4teb1re221pop9u98qlia.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

