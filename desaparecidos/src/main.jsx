import React, { Children, StrictMode, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider, Router} from 'react-router-dom'
import PessoaMaisInfo from './routes/PessoaMaisInfo.jsx'

const Home = lazy(() => import('./routes/Home.jsx'));
const EditPost = lazy(() => import('./routes/EditPost.jsx'));
const PessoaDetalhes = lazy(() => import('./routes/PessoaDetalhe.jsx'));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<div>Carregando página...</div>}><Home /></Suspense>,
      },
      
      {
        path: '/posts/edit/:id',
        element: <Suspense fallback={<div>Carregando...</div>}><EditPost /></Suspense>,
      },
      {
      path: '/v1/pessoas/:id',
      element: <Suspense fallback={<div>Carregando...</div>}><PessoaDetalhes /></Suspense>,
      },
      {
        path: 'v1/ocorrencias/informacoes-desaparecido',
        element: <Suspense fallback={<div>Carregando...</div>}><PessoaMaisInfo /></Suspense>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
