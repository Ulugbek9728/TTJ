import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Autoplay, FreeMode, Pagination} from "swiper";
import {useTranslation} from "react-i18next";

function Section(props) {
    const {t } = useTranslation();

    return (
        <div className="container sectionBox">
            <div className="row">
                <div className="section">
                    <div className="box">
                        <div className="title">{t("umumiyKvota")}</div>
                        <div className="text">4385</div>
                    </div>
                    <div className="box">
                        <div className="title">{t("umumiyBand")}</div>
                        <div className="text">4385</div>
                    </div>
                    <div className="box">
                        <div className="title">{t("umumiyBo'sh")}</div>
                        <div className="text">4385</div>
                    </div>
                </div>
                <iframe className="video" src="https://www.youtube.com/embed/s2-2uwIGcLU"
                        title="JANAGA - Ай бала ( Ay bala ) LYRIC VIDEO" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                />

                <div className="FotoLavhalar">{t("FotoLavha")}</div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
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
                    className="swiper2"
                >
                    <SwiperSlide >
                        <img src="./1.png" alt=""/>

                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="./1.png" alt=""/>

                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="./1.png" alt=""/>
                    </SwiperSlide>
                </Swiper>

            </div>
        </div>

    );
}

export default Section;