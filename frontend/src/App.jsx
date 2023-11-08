/*
 * ROUTES COMPONENT
 * AQUI SE COLOCAN TODAS LAS RUTAS Y SE ENVIA LA TOOLBAR
 * QUE ES EL COMPONENTE DONDE VAN TODAS LAS RUTAS DE LA APP
 *
 */

import {
    createBrowserRouter,
    RouterProvider
} from  'react-router-dom';
import Login from './scenes/login' ;

const session = false;

const router = createBrowserRouter([
    {
        path: "/",
        element: session ?  <h1> Roots </h1> : <Login />
    }
]);

export default function App(){
    return(
        <RouterProvider router={router}/>
    );
}

/*
    DEBO HACER EL CONTROL DE LOGIN AQUI, O HACER 
    UNA LOGICA PARA ESE CONTROL DESDE EL FRONT END
    SI CUMPLE CON TENER UNA SESION ABIERTA SE ENVIA AL
    ROUTER PROVIDER, DE NO SER ASI SE ENVIA AL LOGIN

    LA LOGICA SE HARA EL COMPONENTE DE LA APP,
    QUIZA UN MIDDLE WAR
*/


