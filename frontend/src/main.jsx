
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'; //  activa Tailwind

import Nav from './components/Nav'

// páginas 
import CategoriesList from './pages/CategoriesList'
import CategoryForm from './pages/CategoryForm'
import ProductsList from './pages/ProductsList'
import ProductForm from './pages/ProductForm'

function Layout({ children }) {
  return (<div><Nav/>{children}</div>);
}

  // Categorias
const router = createBrowserRouter([
  { path: '/', element: <Layout children={<CategoriesList/>} /> },
  { path: '/categories', element: <Layout children={<CategoriesList/>} /> },
  { path: '/categories/new', element: <Layout children={<CategoryForm/>} /> },
  { path: '/categories/:id', element: <Layout children={<CategoryForm/>} /> },
  
  // productos 
 
  { path: '/products', element: <Layout children={<ProductsList/>} /> },
  { path: '/products/new', element: <Layout children={<ProductForm/>} /> },
  { path: '/products/:id', element: <Layout children={<ProductForm/>} /> },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
