import React from 'react';
import "../asset/aboutAs.scss"
import {useTranslation} from "react-i18next";


function BizHaqimizda(props) {
    const {t } = useTranslation();
    return (
        <div className="bizHaqimizdaPage">
            <div className="title">
                {t("carusel.Biz_Haqimizda")}
            </div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aperiam atque consectetur consequatur
            consequuntur culpa cumque delectus dignissimos dolores eius error est facere fuga impedit ipsum itaque iusto
            magnam molestiae neque nihil nostrum odit, pariatur possimus quis quod quos ratione rem repellat, rerum
            sequi sunt voluptate voluptates! Aspernatur assumenda dignissimos dolor dolorum, enim esse harum ipsam
            laboriosam, laudantium magni molestias nisi non provident quidem reiciendis sunt ullam. Assumenda at
            blanditiis consectetur delectus deleniti dolorum eligendi exercitationem facere facilis fugit hic, in ipsa
            iste itaque maxime minus numquam odit provident quia repellat saepe sit sunt tenetur ut vero vitae
            voluptatibus?
        </div>
    );
}

export default BizHaqimizda;