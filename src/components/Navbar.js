import React, {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import "../asset/navbar.scss"
import {Link} from "react-router-dom";
import Logo from "../img/logo.png"



function Navbar(props) {
    const {t, i18n } = useTranslation();
    const [leng, setLeng] = useState('');

    const changeLanguage = (language)=>{
        i18n.changeLanguage(language);
    };

    useEffect(()=>{
        setLeng(localStorage.getItem("i18nextLng"));
        if (leng==="ru"){
            document.getElementById("RU").classList.add('active');
            document.getElementById("UZ").classList.remove('active');
            document.getElementById("EN").classList.remove('active')

        }
        if (leng==="uz") {
            document.getElementById("UZ").classList.add('active');
            document.getElementById("RU").classList.remove('active');
            document.getElementById("EN").classList.remove('active')

        }
        if (leng==="en") {
            document.getElementById("EN").classList.add('active');
            document.getElementById("RU").classList.remove('active');
            document.getElementById("UZ").classList.remove('active')

        }
    });
    return (
<div className="container navbar">
    <div className="row">
        <div className="col-lg-6 col-md-6 col-12 left">
            <Link to="/">
            <img src={Logo} alt=""/>
            </Link>
            <p className="title">
                {t("header.Title")}
            </p>
        </div>
        <div className="col-lg-6 col-md-6 col-12 rihgt">
            <div className="profilBox">
                <Link className="profil" to="/login">
                    {t("header.profilButton")}
                </Link>
                <div className="leng">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button id={"UZ"} className='nav-link UZ'
                                    onClick={() => changeLanguage("uz")}>
                                UZ
                            </button>
                        </li>
                        <li className="nav-item">
                            <button id={"RU"} className='nav-link RU' onClick={() => changeLanguage("ru")}>
                                RU
                            </button>
                        </li>
                        <li className="nav-item">
                            <button id={"EN"} className='nav-link EN' onClick={() =>
                                changeLanguage("en")}>
                                EN
                            </button>
                        </li>
                    </ul>


                </div>
            </div>

          <div className="src">
              <input type="text" className="form-control"/>
              <button type="submit" className="btn">{t("header.qidiruv")}</button>
          </div>
        </div>
    </div>

        </div>
    );
}

export default Navbar;