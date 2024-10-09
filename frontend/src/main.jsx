import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from './layouts/MainLayout.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
