import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomeView from './home/HomeView.js'
import AddInventuraPage from './home/pages/AddInventuraPage.js'
import AboutPage from './home/pages/AboutPage.js'
import LoginPage from './other/LoginPage.js'
import NotFoundView from './NotFoundView'
import 'react-toastify/dist/ReactToastify.css';
import InventuraPage from './home/pages/InventuraPage';
import InventuraDetailPage from './home/pages/InventuraDetailPage.js';
import HomePage from './home/pages/HomePage'

export default function App() {
    return (
        <BrowserRouter>
            <ToastContainer style={{ top: "5rem" }} />
            <Routes>
                <Route path="/" element={<HomeView />} >
                    <Route index element={<HomePage />} />
                    <Route path="addinventura" element={<AddInventuraPage />} />
                    <Route path="inventura" element={<InventuraPage />} />
                    <Route path="inventura/:id" element={<InventuraDetailPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />

                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}
