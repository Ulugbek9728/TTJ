import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import user from "../img/user.png";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";

function Natija(props) {
    const {t } = useTranslation();
    const [login, setLogin] = useState('');
    const [Student, setStudent] = useState({});



    function Login(){
        axios.post(`${ApiName1}/public/student/login`, {login:login}).then((response) => {
            console.log(response.data)
            setStudent(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Navbar/>
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
                                    Natija
                                </div>
                                <div className="text">
                                    "Hemis" Talaba ID ni kiriting
                                </div>
                                <div className="all-input">
                                    <input type="text" placeholder="Talaba ID" name="ism"
                                           onChange={(e) => setLogin(e.target.value)}/>
                                    <img src={user} alt="user-icon" className='user-icon'/>
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

export default Natija;