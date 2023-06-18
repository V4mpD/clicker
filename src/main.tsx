import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import {Provider} from "react-redux";
import {store} from "./store/index.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
