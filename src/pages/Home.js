import React from 'react';
import CaruselFakultet from "../components/caruselFakultet";
import "../asset/navbar.scss"
import Section from "../components/section";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";


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