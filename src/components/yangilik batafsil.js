import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import Footer from "./footer";
import {useParams} from "react-router";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {useTranslation} from "react-i18next";

function YangilikBatafsil() {
    const {t} = useTranslation();

    const {id} = useParams();
    const lang = localStorage.getItem('i18nextLng');

    const [News, setNews] = useState({});


    useEffect(()=>{
        GetNews()
    },[]);

    function GetNews() {
        axios.get(`${ApiName1}/public/news/${id}`,)
            .then((response) => {
               console.log(response.data)
                setNews(response.data)
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Navbar/>
            <div className="container yangilikFull">
                <div className="row">
                    <div className="title">
                        {(lang === 'uz' || lang === 'ru') ? (lang=== 'uz'? News.titleUz:News.titleRu) : News.titleEn}
                    </div>
                    <img src={`${ApiName1}${News.imageUrl}`} alt=""/>

                    <div className="text">
                        {(lang === 'uz' || lang === 'ru') ? (lang=== 'uz'? News.nameUz:News.nameRu) : News.nameEn}
                    </div>

                </div>

            </div>

            <Footer/>
        </div>
    );
}

export default YangilikBatafsil;