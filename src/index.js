import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/main.css';
// Importing routes for pages
import Jobs from './pages/jobs';
import Home from './pages/Home';
import NewJHA from './pages/NewJHA';

const router = createBrowserRouter([
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new_job_hazard_analysis',
    element: <NewJHA />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
