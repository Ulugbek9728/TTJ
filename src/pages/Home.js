import React from 'react';
import CaruselFakultet from "../components/caruselFakultet";
import "../asset/navbar.scss"
import Section from "../components/section";


function Home() {
    return (
        <div >
            <CaruselFakultet/>
            <Section/>
        </div>
    );
}

export default Home;