import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./auth";
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <Provider store={store}>

      <AuthProvider>

        <BrowserRouter>

          <App />

        </BrowserRouter>

      </AuthProvider>

    </Provider>
    
  </React.StrictMode>
);


