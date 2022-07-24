import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Provider} from "react-redux";
import {setupStore} from "./store";
import App from './App';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
