
import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import { AuthProvider } from './context/Authprovider.jsx';
import {BrowserRouter} from "react-router-dom";
import { SocketProvider } from './context/SocketContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketProvider>
<App/>
    </SocketProvider>
 
</AuthProvider>
  </BrowserRouter>

);
