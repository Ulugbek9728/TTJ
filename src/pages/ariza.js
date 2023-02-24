import React from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"

function Ariza(props) {
    const {t } = useTranslation();
    return (
        <div className='ArizaPage'>
            <div className="title">
                {t("carusel.Ariza yuborish")}
            </div>
        </div>
    );
}

export default Ariza;