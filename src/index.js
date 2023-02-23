import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "./utils/i18n";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Suspense fallback={<span class="loader" />}>
              <App />
          </Suspense>
      </BrowserRouter>

  </React.StrictMode>
);



