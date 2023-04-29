import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreatorPage from './pages/CreatorPage';
import TakerPage from './pages/TakerPage';
import SurveyCreation from './pages/SurveyCreation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-ayqodrm6v6my2o1d.us.auth0.com"
    clientId="8ahytMiFc08gEo2yaZkIfgupTIVFUvsD"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/taker" element={<TakerPage />} />
          <Route path="/survey" element={<SurveyCreation />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
