import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomeView from './home/HomeView.js'
import HomePage from './home/pages/HomePage.js'
import AboutPage from './home/pages/AboutPage.js'
import LoginPage from './other/LoginPage.js'
import NotFoundView from './NotFoundView'
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <BrowserRouter>
            <ToastContainer style={{ top: "5rem" }} />
            <Routes>
                <Route path="/" element={<HomeView />} >
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />

                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}
