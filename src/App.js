import React from 'react';
import HOME from './pages/Home'
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./asset/navbar.scss"
import BizHaqimizda from "./pages/BizHaqimizda";
import Yangiliklar from "./pages/Yangiliklar";
import Ariza from "./pages/ariza";
import Login from "./pages/login";



function App() {



  return (
    <div className="App">
        <Navbar/>
      <Routes>
        <Route path={"/AboutUs"} element={ <BizHaqimizda/>}/>
        <Route path={"/News"} element={ <Yangiliklar/>}/>
        <Route path={"/login"} element={ <Login/>}/>
        <Route path={"/Submit"} element={ <Ariza/>}/>
        <Route path={"/"} element={ <HOME/>}/>
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
