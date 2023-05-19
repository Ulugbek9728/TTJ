import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import user from "../img/user.png";
import pasword from "../img/padlock.png";
import {ApiName} from "../APIname";
import {ApiName1} from "../APIname1";
import axios from "axios";
import "../asset/login.scss"
import {useNavigate} from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import {toast, ToastContainer} from "react-toastify";

function Login(props) {
    const {t } = useTranslation();

    const [passwordBoolin, setPasswordBoolin] = useState(true);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const [login1, setLogin] = useState({
        login:'',
        password:''
    });
    const navigate = useNavigate();


    function Login() {
        axios.post(`${ApiName1}/public/login`, login1).then((response) => {
            if (response.status === 200) {
                if (response.data.DEGREE === 'ADMIN'){
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("user_Info", response.data.NAME);
                    localStorage.setItem("id", response.data.id);
                    navigate("/Adminyoli");
                }
                if  (response.data.DEGREE === 'USTOZ'){
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("user_Info", response.data.NAME);
                    localStorage.setItem("id", response.data.id);
                    localStorage.setItem("faculty", response.data.FACULTY);
                    navigate("/Tyutoryoli");
                }
                if  (response.data.DEGREE === 'DEKAN'){
                    localStorage.setItem("token", response.data.jwt);
                    localStorage.setItem("user_Info", response.data.NAME);
                    localStorage.setItem("id", response.data.id);
                    localStorage.setItem("faculty", response.data.FACULTY);
                    navigate("/Dekanyoli");
                }
            }
            console.log(response)
        }).catch((error) => {

                axios.post(`${ApiName}auth/login`,login1).then((response)=>{
                    localStorage.setItem("token", response.data.data.token);

                    navigate("/Submit")
                }).catch((error)=>{
                    setMessage2(error.response.data.error);
                })
            })
    }
    useEffect(() => {
        notify();
        setMessage2('')
    },[message2]);
    function notify() {
        if (message !== ''){message && message.map((item) => (toast.error(item)))}
        if (message2 !== ''){toast.error(message2)}
    }
    return (
        <>
            <Navbar/>
            <ToastContainer/>

            <div className="container loginPage">
                <div className="row">
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
                                           onChange={(e) => setLogin({...login1,
                                               login:e.target.value})}/>
                                    <img src={user} alt="user-icon" className='user-icon'/>
                                </div>
                                <div className="all-input">
                                    <input type={passwordBoolin ? "password" : "text"}
                                           placeholder="parol" name="Parol"
                                           onChange={(e) => setLogin({...login1,password:e.target.value})}/>
                                    <img src={pasword} alt="user-icon" className='user-icon'/>
                                    {passwordBoolin ?
                                        <img onClick={() => setPasswordBoolin(!passwordBoolin)}
                                             src="/img/show(1).png" alt=""
                                             className="show"/>
                                        :
                                        <img onClick={() => setPasswordBoolin(!passwordBoolin)}
                                             src="/img/show.png" alt=""
                                             className="show"/>
                                    }
                                </div>
                                <button className="signUp" onClick={Login}>Kirish</button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
            <Footer/>

        </>
    );
}

export default Login;