import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import Routes from "./routes";
import { BrowserRouter  } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
    {/* <App /> */}
    </Provider>

);


