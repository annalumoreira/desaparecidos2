import React, { Children, StrictMode, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider, Router} from 'react-router-dom'

const Home = lazy(() => import('./routes/Home.jsx'));
const NewPost = lazy(() => import('./routes/NewPost.jsx'));
const Post = lazy(() => import('./routes/Post.jsx'));
const Admin = lazy(() => import('./routes/Admin.jsx'));
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
        path: '/new',
        element: <Suspense fallback={<div>Carregando...</div>}><NewPost /></Suspense>,
      },
      {
        path: '/posts/:id',
        element: <Suspense fallback={<div>Carregando...</div>}><Post /></Suspense>,
      },
      {
      path: '/admin',
      element: <Suspense fallback={<div>Carregando...</div>}><Admin /></Suspense>
      },
      {
        path: '/posts/edit/:id',
        element: <Suspense fallback={<div>Carregando...</div>}><EditPost /></Suspense>,
      },
      {
      path: '/pessoa/:id',
      element: <Suspense fallback={<div>Carregando...</div>}><PessoaDetalhes /></Suspense>,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
