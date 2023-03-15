import React from 'react';
import "../asset/Yangilik.scss"
import {useTranslation} from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Yangiliklar(props) {
    const {t } = useTranslation();
    return (
        <>
            <Navbar/>

            <div className='yangiligPage'>
                <div className="title">
                    {t("carusel.Yangiliklar")}
                </div>
            </div>
            <Footer/>
        </>

);
}

export default Yangiliklar;