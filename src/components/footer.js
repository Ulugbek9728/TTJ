import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import TEL from "../img/tel.svg"
import TDTU from "../img/network.png"
import PHONE from "../img/phone-call.png"
import YOUTUBE from "../img/youtube (1).png"
import Bolim from "../img/logoBo'lim.png"
import axios from "axios";
import {ApiName1} from "../APIname1";

function    Footer(props) {
    const {t} = useTranslation();
    const [GetContact, setGetContact] = useState({});


    function getContact(){
        axios.get(`${ApiName1}/contact`,'').then((res)=>{
            console.log(res)
            setGetContact(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(() => {
        getContact();
    }, []);
    return (
        <div className="container footerBox">
            <div className="row">
                <div className="left col-6 cartaBox">
                    <div className="titleB">
                        <img src={Bolim} alt=""/>
                        <span>{t("Bo'limName")}.</span>
                    </div>
                    <div className="d-flex w-100 contact_Box">
                        <div className="aloqa">
                            <div className="title">
                                {t("Mesenger")}
                            </div>
                            <div className="mesenger">
                                <p>
                                    <a href={GetContact.telegramContact} target='_blank'>
                                        <img src={TEL} alt=""/>
                                        Telegram
                                    </a>
                                </p>
                                <p>
                                    <a href={GetContact.siteContact} target='_blank'>
                                    <img src={TDTU} alt=""/>
                                    tdtu.uz
                                    </a>
                                </p>
                                <p>
                                    <a href={GetContact.youtubeContact} target='_blank'>
                                        <img src={YOUTUBE} alt=""/>
                                        Youtube
                                    </a>
                                </p>
                                <p>
                                    <a href={GetContact.idSiteContact} target='_blank'>
                                    <img src={TDTU} alt=""/>
                                    id.tdtu.uz
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="tel">
                            <div className="title">{t("Aloqa")}</div>
                            <a href={`tel:${GetContact.phoneContact}`}>
                                <img src={PHONE} alt=""/>
                                {GetContact.phoneContact}
                            </a>
                        </div>
                    </div>

                </div>
                <div className="col-6 cartaBox">
                    <iframe className="carta"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.9912226757915!2d69.2045495157262!3d41.352544506116836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c3da3c6e5c3%3A0x9882f2a6b7329d1d!2sToshkent%20davlat%20texnika%20universiteti!5e0!3m2!1sen!2s!4v1677566100718!5m2!1sen!2s"
                            allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"/>
                </div>

            </div>
        </div>
    );
}

export default Footer;