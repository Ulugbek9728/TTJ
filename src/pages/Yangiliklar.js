import React, {useEffect, useState} from 'react';
import "../asset/Yangilik.scss"
import {useTranslation} from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {SwiperSlide} from "swiper/react";

function Yangiliklar(props) {
    const {t} = useTranslation();
    const [NewsGroup, setNews] = useState([]);

    useEffect(() => {
       GetNews();
    },[]);

    function GetNews() {
        axios.post(`${ApiName1}/public/news`, '').then((response) => {
            setNews(response.data.content);
            console.log(response.data.content)

        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <Navbar/>

            <div className='container yangiligPage'>
                <div className="row">
                    <div className="title">
                        {t("carusel.Yangiliklar")}
                    </div>
                    <div className="container">
                        <div className="row">
                            {NewsGroup && NewsGroup.map((item, index)=>{
                                return<div className="col-6 p-0">
                                        <div className="row">
                                            <div className="col-12 big">
                                                <img src={`${ApiName1}${item.imageUrl}`} alt=""/>
                                                <div className="box">
                                                    <div className="date">{item.created_date}</div>
                                                    <div className="title">{item.titleUz}</div>
                                                    <div className="text">{item.nameUz}</div>
                                                </div>
                                            </div>
                                            <div className="col-6 small">
                                                <img src={`${ApiName1}${item.imageUrl}`} alt=""/>
                                                <div className="box">
                                                    <div className="date">{item.created_date}</div>
                                                    <div className="title">{item.titleUz}</div>
                                                </div>
                                            </div>
                                            <div className="col-6 small">
                                                <img src={`${ApiName1}${item.imageUrl}`} alt=""/>
                                                <div className="box">
                                                    <div className="date">{item.created_date}</div>
                                                    <div className="title">{item.titleUz}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            })}
                    </div>

                    </div>
                    <button className="btn SeeMore">see more</button>
                </div>
            </div>
            <Footer/>
        </>

    );
}

export default Yangiliklar;