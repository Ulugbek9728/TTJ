import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "./utils/i18n";
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import "react-toastify/dist/ReactToastify.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <BrowserRouter>
          <Suspense fallback={<span class="loader" />}>
              <Provider store={store}>
                  <App />
              </Provider>
          </Suspense>
      </BrowserRouter>

);



