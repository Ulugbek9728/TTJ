import React, {useEffect} from 'react';
import CaruselFakultet from "../components/caruselFakultet";
import "../asset/navbar.scss"
import Section from "../components/section";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import {ApiName1} from "../APIname1";


function Home() {

    return (
        <div >
            <Navbar/>

            <CaruselFakultet/>
            <Section/>
            <Footer/>
        </div>
    );
}

export default Home;