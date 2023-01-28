import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import ContextProvider from './components/Context';
import Dashboard from './components/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import EditUser from './components/EditUser'
import Products from './components/Products';
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <BrowserRouter>
            <Routes>
               
                <Route element={<App />} path='/'/>
                <Route element={<Register />} path='/register'/>

                <Route element={<Login />} path='/login'/>
                <Route element={<Cart />} path='/cart'/>
                <Route element={<Wishlist />} path='/wishlist'/>
                
                <Route element={<AdminLayout />}>
                    <Route element={<Dashboard />} path='/dashboard'/>
                    <Route element={<EditUser />} path='/dashboard/users/edit/:id' />

                    <Route element={<Products />} path='/dashboard/products' />
                    <Route element={<AddProduct />} path='/dashboard/products/add' />
                    <Route element={<EditProduct />} path='/dashboard/products/edit/:id' />
                </Route>
                
            </Routes>
        </BrowserRouter>
    </ContextProvider>
);