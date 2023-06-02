import React, { useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import user from "../img/user.png";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";

function Natija(props) {
    const {t } = useTranslation();
    const [status, setStatus] = useState(true);
    const [login, setLogin] = useState('');
    const [Student, setStudent] = useState({});



    function Login(){
        axios.post(`${ApiName1}/public/student/login`, {login:login}).then((response) => {
            console.log(response.data)
            setStudent(response.data)
            if (response.data.status === 'NOT_ACCEPTED'){
                setStatus(true)
            }
            else {
                setStatus(false)
            }
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
                                Natija
                            </div>
                            {status ?
                                <div className="commit">
                                    Sizning Arizangiz qabul qilinmadi,
                                    to'liq ma'lumot uchun dekanatingizga uchrashing
                                </div>
                            :
                                <div className="">
                                    <span className='commit'>
                                        Tabriklaymiz quyidagi ruxsatnomani yuklab olishingiz mumkun.
                                    </span>
                                    <br/>
                                    <a href={`${ApiName1}${Student.response_file_url}`} target='_blank'>
                                        Ruxsatnoma
                                    </a>
                                </div>
                            }
                        </div>


                        <div className="right-side">
                            <div className="container">
                                <div className="create">
                                    Natijani bilish
                                </div>
                                <div className="text">
                                    "Hemis" Talaba ID ni kiriting
                                </div>
                                <div className="all-input">
                                    <input type="text" placeholder="Talaba ID" name="ism"
                                           onChange={(e) => setLogin(e.target.value)}/>
                                    <img src={user} alt="user-icon" className='user-icon'/>
                                </div>
                                <button className="signUp" onClick={Login}>Yuborish</button>
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