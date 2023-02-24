import React from 'react';
import {useTranslation} from "react-i18next";

function Footer(props) {
    const {t } = useTranslation();

    return (
        <div className="footerBox">
            <div className="left">
                <div className="titleB">
                    {t("Bo'limName")}.
                </div>
                <div className="aloqa">
                    <div className="title">
                        {t("Aloqa")}:
                    </div>
                </div>
            </div>
            <iframe
                className="carta"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.0949251645184!2d69.21563281312024!3
                d41.350290420383175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c14
                e0131115%3A0xd3705784408bcd07!2s4%20Talabalar%20Street%2C%20Tashkent%2C%20Uzbekistan!5e0
                !3m2!1sen!2s!4v1677185077470!5m2!1sen!2s"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={"carta"}
            />

        </div>
    );
}

export default Footer;