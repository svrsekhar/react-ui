// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './Pages/Products';
import Admin from './Pages/Admin';
import NotFound from './Pages/NotFound';
import './App.scss'

function App() {
  
  return ( 
    <div className='App'>
      <nav>
        <Link to="/products">Products</Link>
        {' | '}
        <Link to="/admin">Admin</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
