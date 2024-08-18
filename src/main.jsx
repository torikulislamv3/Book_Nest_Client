import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Single page/Home';
import Root from './Single page/Root';
import Login from './Single page/Login';
import AuthProvider from './Single page/authprovider';
import Register from './Single page/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      // {
      //   path : "/",
      //   element : <Home></Home>,
      //   loader : ()=> fetch('http://localhost:5000/BookItems')
      // }
      {
        path: "/",
        element: <Home />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const page = url.searchParams.get('page') || 1;
          const response = await fetch(`http://localhost:5000/BookItems?page=${page}&limit=10`);
          if (!response.ok) {
            throw new Response('Failed to fetch books', { status: response.status });
          }
          return response.json();
        },
      },
      {
        path : "/login",
        element : <Login></Login>
      },
      {
        path : "/register",
        element : <Register></Register>
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)