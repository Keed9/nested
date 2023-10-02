import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider
} from  'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1> Hello there!! </h1>
    }
]);

/*
    DEBO HACER EL CONTROL DE LOGIN AQUI, O HACER 
    UNA LOGICA PARA ESE CONTROL DESDE EL FRONT END
    SI CUMPLE CON TENER UNA SESION ABIERTA SE ENVIA AL
    ROUTER PROVIDER, DE NO SER ASI SE ENVIA AL LOGIN

    LA LOGICA SE HARA EL COMPONENTE DE LA APP
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
