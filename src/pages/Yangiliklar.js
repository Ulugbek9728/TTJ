import React, {useEffect, useState} from 'react';
import "../asset/Yangilik.scss"
import {useTranslation} from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";


function Yangiliklar(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [NewsGroup, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [isLast, setIsLast] = useState(true);
    const lang = localStorage.getItem('i18nextLng');

    useEffect(() => {
        GetNews();
    }, [page]);

    function GetNews() {
        axios.post(`${ApiName1}/public/news`, '',{params:{page:page,size:12}})
            .then((response) => {
                NewsGroup.push(...response.data.content);
               setIsLast(response.data.last);
        }).catch((error) => {
            console.log(error)
        })
    }

    const reloadNews = () => {
        setPage(page+1);
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
                            {NewsGroup && NewsGroup?.map((item, index) => {
                                return <div className="col-6 big" key={index}
                                            onClick={()=>navigate(`/News/${item.id}`)}>
                                    <img src={`${ApiName1}${item.imageUrl}`} alt=""/>
                                    <div className="box">
                                        <div className="date">{item.created_date}</div>
                                        <div className="title">
                                            {(lang === 'uz' || lang === 'ru') ? (lang=== 'uz'? item.titleUz:item.titleRu) : item.titleEn}
                                        </div>
                                        <div className="text">
                                            {(lang === 'uz' || lang === 'ru') ? (lang=== 'uz'? item.nameUz:item.nameRu) : item.nameEn}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                    <button className="btn SeeMore" onClick={reloadNews} disabled={isLast}>see more</button>
                </div>
            </div>

            <Footer/>
        </>

    );
}

export default Yangiliklar;