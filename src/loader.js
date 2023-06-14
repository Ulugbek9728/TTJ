import React from 'react';
import "./asset/loader.scss"
import {useTranslation} from "react-i18next";

function Loader(props) {
    const {t, i18n } = useTranslation();

    return (
        <div className="LoaderBox">
            <div className="title">{t("header.Title")}</div>
            <div className='loader'>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='window'/>
                <div className='door'/>
                <div className='hotel-sign'>
                    <p>T</p>
                    <p>T</p>
                    <p>J</p>
                </div>
            </div>
        </div>
    );
}

export default Loader;