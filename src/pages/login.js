import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import user from "../img/user.png";
import pasword from "../img/padlock.png";
import {ApiName} from "../APIname";
import axios from "axios";

import "../asset/login.scss"

function Login(props) {
    const {t } = useTranslation();
    const [login, setLogin] = useState({});

    function Login() {
        axios.post(`${ApiName}/auth/login`, {login}) .then((response) => {
            console.log(response)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="loginPage">
            <div className="login-page">
                <div className="left-side">
                    <div className="title">
                        Welcome Back!
                    </div>
                    <div className="commit">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores, perspiciatis.
                    </div>
                </div>

                <div className="right-side">
                    <div className="container">
                        <div className="create">
                            {t("header.profilButton")}
                        </div>
                        <div className="text">
                            "Hemis" Talaba ID parolingizni kiriting
                        </div>
                        <div className="all-input">
                            <input type="text" placeholder="Talaba ID" name="ism"
                                   onChange={(e) => setLogin({...login,login:e.target.value})}/>
                            <img src={user} alt="user-icon"/>
                        </div>
                        <div className="all-input">
                            <input type="password" placeholder="parol" name="parol"
                                   onChange={(e) => setLogin({...login,password:e.target.value})}/>
                            <img src={pasword} alt="user-icon"/>
                        </div>
                        <a href="#">
                            <button className="signUp" onClick={Login}>Kirish</button>
                        </a>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Login;