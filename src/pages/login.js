import React from 'react';
import {useTranslation} from "react-i18next";
import "../asset/login.scss"

function Login(props) {
    const {t } = useTranslation();

    return (
        <div className="loginPage">
            <div className="title">
                {t("header.profilButton")}
            </div>
        </div>
    );
}

export default Login;