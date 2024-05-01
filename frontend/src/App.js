import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
//import Loader from './component/layout/Loader/Loader.js';
//import Loader from "../layout/Loader/Loader.js"
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store.js"
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import { useState } from 'react';
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from './component/admin/UsersList.js';
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";


function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("")
  
  async function getStripeApiKey() {

    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);

  }

React.useEffect(() => {

  WebFont.load({

    google:{
      families:["Roboto", "Driod sans", "Chilanka"]
    },
  })

  store.dispatch(loadUser());

  getStripeApiKey()
}, [])

window.addEventListener("contextmenu", (e) => e.preventDefault());

  return ( 
    
    <Router>
     
    <Header />
    {isAuthenticated && <UserOptions user={user}/>}
    

    <Routes>
    
    
    <Route exact path="/" Component={Home}/>
    <Route exact path="/about" Component={About}/>
    <Route exact path="/contact" Component={Contact}/>
    <Route exact path="/product/:id" Component={ProductDetails}/>
    <Route exact path="/products" Component={Products}/>
    <Route path="/products/:keyword" Component={Products}/>
    <Route exact path="/search" Component={Search}/>
    <Route exact path="/account" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <Profile/></ProtectedRoute>}/>

      <Route exact path="/me/update" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <UpdateProfile/></ProtectedRoute>}/>
     
      <Route exact path="/password/update" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <UpdatePassword/></ProtectedRoute>}/>

      <Route exact path="/password/forgot" Component={ForgotPassword}/>

      <Route exact path="/password/reset/:token" Component={ResetPassword}/>
     
    <Route exact path="/login" Component={LoginSignUp}/>

    <Route exact path="/cart" Component={Cart}/>

    <Route exact path="/shipping" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <Shipping/></ProtectedRoute>}/>

      <Route exact path="/order/confirm" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <ConfirmOrder/></ProtectedRoute>}/>

      {stripeApiKey && (
      <Route exact path="/process/payment" element={(
        <Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute isAuthenticated={isAuthenticated}><Payment/></ProtectedRoute>
          </Elements> 
      )}/> )}
      
      <Route exact path="/success" Component={OrderSuccess}/>

      <Route exact path="/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <MyOrders/></ProtectedRoute>}/>
      
      <Route exact path="/order/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
      
      <OrderDetails/></ProtectedRoute>}/>

      <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <Dashboard/></ProtectedRoute>}/> 
      
      <Route exact path="/admin/products" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <ProductList/></ProtectedRoute>}/> 

      <Route exact path="/admin/product" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <NewProduct/></ProtectedRoute>}/> 

      <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <UpdateProduct/></ProtectedRoute>}/> 

      <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <OrderList/></ProtectedRoute>}/> 

      <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <ProcessOrder/></ProtectedRoute>}/> 

      <Route exact path="/admin/users" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <UsersList/></ProtectedRoute>}/> 

      <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <UpdateUser/></ProtectedRoute>}/> 

      <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin = {true} 
        isAuthenticated={isAuthenticated}> <ProductReviews/></ProtectedRoute>}/>

      <Route path = "*" Component={window.location.pathname === "/process/payment" ? null : NotFound}/>
       
    </Routes>
    <Footer/>
    </Router>
    
  );
}

export default App;
