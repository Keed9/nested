import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";
import UserModel from './models/user.model';

import Login from './routes/login.route';
import Dashboard from './routes/dashboard.route';
import Calendar from './widgets/calendar.widget';
import Register from './widgets/register.widget';
import UpdateUser from './widgets/update.widget';
import Profile from './widgets/profile.widget';
import Schedule from './widgets/schedule.widget';

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
      },
      {
        path: "update/:id",
        element: <UpdateUser />
      },
      {
        path: "user/:id",
        element: <Profile />,
        loader: async({params}) => {
            const userModel = new UserModel();
            return await userModel.findUserById(params.id);
        },
        id: "profile"
      },
      {
        path: "schedule",
        element: <Schedule/>
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
