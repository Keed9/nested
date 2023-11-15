import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import Login from './routes/login.route';
import Dashboard from './routes/dashboard.route';
import Calendar from './widgets/calendar.widget';
import Register from './widgets/register.widget';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "calendar",
        element: <Calendar />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
