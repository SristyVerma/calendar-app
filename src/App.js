// src/App.js
import React from 'react';
import './App.css';
import store from './Redux/store';
import { Provider } from 'react-redux';
import ProtectedRoutes from './Route/ProtectedRoutes';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from '././Components/Auth/authProvider'; // Import the new AuthProvider component
import Layout from './Components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
         <Layout>
         <ToastContainer />
          <ProtectedRoutes />
          </Layout>

        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
