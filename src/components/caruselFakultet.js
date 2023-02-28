import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Autoplay, FreeMode, Pagination} from "swiper";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";


function CaruselFakultet(props) {
    const {t } = useTranslation();
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
                        <SwiperSlide >
                            <img src="./1.png" alt=""/>
                            <div className="content">
                                <div className="title">
                                    72-B TTJ 588-o'ringa ega
                                </div>
                                <div className="d-flex">
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Band")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Bo'sh")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <img src="./1.png" alt=""/>
                            <div className="content">
                                <div className="title">
                                    72-A TTJ 588-o'ringa ega
                                </div>
                                <div className="d-flex">
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Band")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Bo'sh")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <img src="./1.png" alt=""/>
                            <div className="content">
                                <div className="title">
                                    72-C TTJ 588-o'ringa ega
                                </div>
                                <div className="d-flex">
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Band")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                    <div className="orinlar">
                                        <div className="text">{t("carusel.Bo'sh")}</div>
                                        <p>1-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>2-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>3-{t("carusel.Kurs")}: <span>400</span></p>
                                        <p>4-{t("carusel.Kurs")}: <span>400</span></p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-6 right">
                    <div className="menu">
                        <div className="bizHaqimizda">
                            <a href='#' target={"_blank"}>
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
                            <Link to="#">
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