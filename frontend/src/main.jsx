import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import Login from './pages/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Dashboard</h1>
  },
  {
    path: "/login",
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
