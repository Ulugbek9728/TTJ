import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Autoplay, FreeMode, Pagination} from "swiper";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";
import ReactBnbGallery from "react-bnb-gallery";

function Section(props) {
    const {t } = useTranslation();
    const [Media, setMedia] = useState([]);
    const [Allkvota, setAllKvota] = useState({});
    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        GetNews();
    },[]);

    function GetNews() {
        axios.get(`${ApiName1}/clips/public`, '').then((response) => {
            setMedia(response.data);
        }).catch((error) => {
            console.log(error)
        });

        axios.get(`${ApiName1}/public/count`, '',).then((response) => {
            setAllKvota(response.data);

        }).catch((error) => {
            console.log(error.response)
        })
    }

    return (
        <div className="container sectionBox">
            <div className="row">
                <div className="section">
                    <div className="box">
                        <div className="title">{t("umumiyKvota")}</div>
                        <div className="text">{Allkvota.all_count}</div>
                    </div>
                    <div className="box">
                        <div className="title">{t("umumiyBand")}</div>
                        <div className="text">{Allkvota.booked_count}</div>
                    </div>
                    <div className="box">
                        <div className="title">{t("umumiyBo'sh")}</div>
                        <div className="text">{Allkvota.free_count}</div>
                    </div>
                    <div className="box">
                        <div className="title">{t("umumiyAriza")}</div>
                        <div className="text">{Allkvota.applied_count}</div>
                    </div>
                </div>
                <video className="video" src={`${ApiName1}${Media.video_url}`} controls={true}/>

                <div className="FotoLavhalar">{t("FotoLavha")}</div>

               <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        freeMode={true}
                        pagination={{clickable: true,}}
                        autoplay={{delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true,}}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="swiper2">
                   {Media.photos && Media.photos.map((item, index)=>{
                    return<SwiperSlide key={index}>
                            <img src={`${ApiName1}${item}`} alt=""/>


                        </SwiperSlide>
                })}
                    </Swiper>



            </div>
        </div>

    );
}

export default Section;