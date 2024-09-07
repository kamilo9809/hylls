// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import i18next from 'i18next'
import {I18nextProvider} from 'react-i18next'

import global_en from './locales/en/global.json'
import global_es from './locales/es/global.json'

i18next.init({
  interpolation: {escapeValue:false},
  lng:"es",
  resources:{
    en:{
      global: global_en
    },
    es:{
      global: global_es
    },
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
