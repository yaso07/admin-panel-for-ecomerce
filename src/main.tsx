 
import ReactDOM from 'react-dom/client'

import './index.css'
import { lazy } from 'react';
import { RouterProvider } from 'react-router';

import { mainRoutes } from './routes';
import { routes } from './Router';

export const Dashboard =lazy(()=>import('./Admin'))
console.log(window.location.pathname)

ReactDOM.createRoot(document.getElementById("root")!).render(
   
       <RouterProvider router={routes}>
            
       </RouterProvider>
);
