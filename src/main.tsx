import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {setupStore} from "./store/store.ts";

import {PrimeReactProvider} from "primereact/api";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <App/>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>,
)
