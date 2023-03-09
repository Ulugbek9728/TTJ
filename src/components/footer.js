import React from 'react';
import {useTranslation} from "react-i18next";
import TEL from "../img/tel.svg"
import FBOOK from "../img/fb.svg"
import TW from "../img/tw.svg"
import PHONE from "../img/phone-call.png"
import Bolim from "../img/logoBo'lim.png"

function Footer(props) {
    const {t} = useTranslation();

    return (
        <div className="footerBox">
            <div className="left">
                <div className="titleB">
                    <img src={Bolim} alt=""/>
                    <span>{t("Bo'limName")}.</span>
                </div>
                <div className="d-flex w-100">
                    <div className="aloqa">
                        <div className="title">
                            {t("Mesenger")}
                        </div>
                        <div className="mesenger">
                            <a href="#">
                                <img src={TEL} alt=""/>
                            </a>
                            <a href="#">
                                <img src={FBOOK} alt=""/>
                            </a>
                            <a href="#">
                                <img src={TW} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className="tel">
                        <div className="title">{t("Aloqa")}</div>
                        <a href="#">
                            <img src={PHONE} alt=""/>
                            +998998715321
                        </a>
                    </div>
                </div>

            </div>
            <iframe className="carta"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.9912226757915!2d69.2045495157262!3d41.352544506116836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c3da3c6e5c3%3A0x9882f2a6b7329d1d!2sToshkent%20davlat%20texnika%20universiteti!5e0!3m2!1sen!2s!4v1677566100718!5m2!1sen!2s"
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"/>

        </div>
    );
}

export default Footer;