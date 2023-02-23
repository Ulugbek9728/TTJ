import React, {useEffect, useState} from 'react';
import { getLocale } from "../utils/locales/getLocale";
import { useTranslation } from "react-i18next";


import "../asset/navbar.scss"

function Navbar(props) {
    const {t, i18n } = useTranslation();
    const [leng, setLeng] = useState('');

    const lang = getLocale();

    const changeLanguage = (language)=>{
        i18n.changeLanguage(language);
        
    };

    useEffect(()=>{
        setLeng(localStorage.getItem("i18nextLng"));
        if (leng==="ru"){
            document.getElementById("RU").classList.add('active');
            document.getElementById("UZ").classList.remove('active')
        }
        if (leng==="uz") {
            document.getElementById("UZ").classList.add('active');
            document.getElementById("RU").classList.remove('active')
        }
    });
    return (
<div className="container navbar">
    <div className="row">
        <div className="col-6 left">
            <img src="logo.png" alt=""/>
            <p className="title">
                {t("header.Title")}
            </p>
        </div>
        <div className="col-6 rihgt">
            <div className="profilBox">
                <a className="profil" href="#">{t("header.profilButton")}</a>
                <div className="leng">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <button id={"UZ"} className='nav-link UZ' onClick={() => changeLanguage("uz")}>
                                UZ
                            </button>
                        </li>
                        <li className="nav-item">
                            <button id={"RU"} className='nav-link RU' onClick={() => changeLanguage("ru")}>
                                RU
                            </button>
                        </li>
                    </ul>


                </div>
            </div>

          <div className="src">
              <input type="text" className="form-control"/>
              <button type="submit" className="btn">Submit</button>
          </div>


        </div>
    </div>

        </div>
    );
}

export default Navbar;