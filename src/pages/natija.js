import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import user from "../img/user.png";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";

function Natija(props) {
    const {t} = useTranslation();
    const [status, setStatus] = useState('');
    const [login, setLogin] = useState('');
    const [Student, setStudent] = useState({});
    const [text, setText] = useState('');
    const [fileUrl, setFileUrl] = useState('');


    function Login() {
        axios.post(`${ApiName1}/public/student/login`, {login: login}).then((response) => {
            console.log(response.data)
            setStudent(response.data)
            setStatus(response.data.status);
            switch (response.data?.dormitoryStudentStatus) {
                case 'ACCEPTED': {
                    setText('Tabriklaymiz quyidagi ruxsatnomani yuklab olishingiz mumkun.');
                    setFileUrl(response.data?.response_file_url)
                    break;
                }
                case 'REMOVED': {
                    setText('Haydalgansiz');
                    setFileUrl(response.data?.response_file_url)
                    break;
                }
                case 'IS_ACCEPTED': {

                    setText('Arizangiz ko\'rib chiqilmoqda');
                    break;
                }
                case 'NOT_ACCEPTED': {
                    setText('Arizangiz qabul qilinmadi!');
                    break;
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    console.log(text);
    console.log(fileUrl);
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
                            <div className="">
                    <span className='commit'>
                        {text}
                    </span>
                                <br/>
                                {fileUrl && <a href={`${ApiName1}${fileUrl}`} target='_blank'>
                                    file
                                </a>}
                            </div>
                            {/*<div className="">*/}
                            {/*    <span className='commit'>*/}
                            {/*            Tabriklaymiz quyidagi ruxsatnomani yuklab olishingiz mumkun.*/}
                            {/*    </span>*/}
                            {/*    <br/>*/}
                            {/*    <a href={`${ApiName1}${Student.response_file_url}`} target='_blank'>*/}
                            {/*        Ruxsatnoma*/}
                            {/*    </a>*/}
                            {/*</div>*/}
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