import React from 'react';
import "../asset/Yangilik.scss"
import {useTranslation} from "react-i18next";

function Yangiliklar(props) {
    const {t } = useTranslation();
    return (
        <div className='yangiligPage'>
            <div className="title">
                {t("carusel.Yangiliklar")}
            </div>
        </div>
    );
}

export default Yangiliklar;