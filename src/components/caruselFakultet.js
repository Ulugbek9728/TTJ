import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Autoplay, FreeMode, Pagination} from "swiper";



function CaruselFakultet(props) {
    const {t } = useTranslation();
    const [kvota, setKvota] = useState([]);
    const [Courskvota, setCoursKvota] = useState([]);


    useEffect(() => {
        Getkvta()
    },[]);
    function Getkvta() {
        axios.get(`${ApiName1}/public/main`, '',).then((response) => {
            console.log(response.data);
            setKvota(response.data);

        }).catch((error) => {
            console.log(error.response)
        });

    }

    return (
        <div className="container caruselBox">
            <div className="row">
                <div className="col-6 left">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={5}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="swiper1"
                    >
                        {kvota && kvota.map((item, index)=>{
                            const jsonCourse = item?.courses;
                            let course;
                            if (jsonCourse){
                              course=JSON.parse(item?.courses);
                            }

                            return <SwiperSlide key={index}>
                                <img src={`${ApiName1}${item.photo_url}`} alt=""/>
                                <div className="content">
                                    <div className="title">
                                        {item.name}- {t("umumiyKvota")}  {item.actual_count}
                                    </div>
                                    <div className="d-flex">
                                        <div className="orinlar">
                                            <div className="text">{t("carusel.Band")}</div>
                                            {course?.map((item, index)=>{
                                                return <p>{index+1}-{t("carusel.Kurs")}: <span>{item.left_count}</span></p>
                                            })}
                                        </div>
                                        <div className="orinlar">
                                            <div className="text">{t("carusel.Bo'sh")}</div>
                                            {course?.map((item, index)=>{
                                                return <p>{index+1}-{t("carusel.Kurs")}: <span>{item.actual_count}</span></p>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}


                    </Swiper>

                </div>
                <div className="col-6 right">
                    <div className="menu">
                        <div className="bizHaqimizda">
                            <a href='https://tdtu.uz/structure/sections/15' target={"_blank"}>
                                {t("carusel.Biz_Haqimizda")}
                            </a>
                        </div>
                        <div className="yangiliklar">
                            <Link to='/News'>
                            {t("carusel.Yangiliklar")}
                            </Link>
                        </div>
                    </div>
                    <div className="menu">
                        <div className="yangiliklar">
                            <Link to="/Submit">
                            {t("carusel.Ariza yuborish")}
                            </Link>
                        </div>
                        <div className="bizHaqimizda">
                            <Link to="/Result">
                            {t("carusel.TTJ")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CaruselFakultet;