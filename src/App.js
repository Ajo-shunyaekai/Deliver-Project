
import React, { useEffect, useState } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client'

import BuyerSidebar from './components/BuyerSidebar.js';
import SupplierSidebar from './Supplier/components/SupplierSidebar.js'
import AdminSidebar from './Admin/components/AdminSidebar.js';
import { postRequestWithToken } from './api/Requests.js';
import { apiRequests } from './api/index.js';

// const socket = io('http://localhost:3333', {
//     transports: ['websocket'],
//     withCredentials: true
//   }); 

    const activekey = () => {
        var res          = window.location.pathname;
        var baseUrl      = ''; 
        baseUrl          = baseUrl.split("/");
        res              = res.split("/");
        res              = res.length > 0 ? res[baseUrl.length] : "/";
        res              = res ? "/" + res : "/";

        if (res === '/') {
            res = '/buyer';
        }
        return res
    }
    
    
    function App() {
        
        // const getLoggedInUserDetails = async (id) => {
        //     const response = await apiRequests?.getRequest(`/auth/${id}`)
        //     // console.log(`RESPONSE : ${response}`); // NEED TO STORE RESPONSE IN REDUX
            
        // }

        // useEffect(()=>{
        //     getLoggedInUserDetails(sessionStorage.getItem("_id"))
        // },[])

        useEffect(() => {
            const route = activekey();
            if( activekey().indexOf('buyer') > 0 ){
              import('./App.css');
            } else if( activekey().indexOf('supplier') > 0 ){ 
                import('./SupplierApp.css');
            } else if( activekey().indexOf('admin') > 0 ){ 
                import('./AdminApp.css');
            }
              
        }, []);

        if( activekey().indexOf('buyer') > 0 ){
            return ( <>
                <div className='App'>
                    <Router>
                    <ToastContainer />
                        <BuyerSidebar />
                    </Router>
                </div>
                </> );
        } else if( activekey().indexOf('supplier') > 0 ){ 
            return (
                <div className='App-Container'>
                    <Router>
                    <ToastContainer />
                        <SupplierSidebar />
                    </Router>
                </div>
            );
        } else if( activekey().indexOf('admin') > 0 ) {
            return (
                <div className='Admin-Container'>
                    <Router>
                    <ToastContainer />
                        <AdminSidebar />
                    </Router>
                </div>
            )
        }
    }

    export default App;

    