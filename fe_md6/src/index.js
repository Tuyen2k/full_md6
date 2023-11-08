import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/Header";
import Home from "./component/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./layout/Footer";
import PopupAppCart from "./layout/PopupAppCart";
import CreateProduct from "./component/CreateProduct";
import FormRegister from "./component/Merchant";
import ProductList from "./component/ProductList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<>
              <Header/>
              <Home/>
              <Footer/>
              <PopupAppCart/>
          </>}>

          </Route>
          <Route path="/list" element={<ProductList/>}></Route>
          <Route path="/product/create" element={<CreateProduct/>}></Route>
          <Route path={'/register'} element={<FormRegister/>}></Route>
      </Routes>
  </BrowserRouter>
);

