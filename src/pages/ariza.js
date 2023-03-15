import React from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import Navbar from "../components/Navbar";

import Footer from "../components/footer";


function Ariza(props) {
    const {t } = useTranslation();
    return (
        <>
            <Navbar/>

            <div className='ArizaPage'>
                <div className="title">
                    {t("carusel.Ariza yuborish")}
                </div>
            </div>
            <Footer/>

        </>
    );
}

export default Ariza;