import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import user from "../img/user.png";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {Button, Form, Input} from "antd";
import {toast} from "react-toastify";

function Natija(props) {
    const {t} = useTranslation();
    const [status, setStatus] = useState('');
    const [login, setLogin] = useState('');
    const [Student, setStudent] = useState({});
    const [text, setText] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    function Login(values) {
        setIsLoading(true);
        setLogin(values.ism);
        axios.post(`${ApiName1}/public/student/login`, {login: values.ism})
            .then((response) => {
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
                setLogin('')
                setIsLoading(false);
            }).catch((error) => {
            toast.error(error.response?.data);
            setIsLoading(false);
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
                                {t('result')}
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
                        </div>

                        <div className="right-side">
                            <div className="container">
                                <div className="create">
                                    {t('know-result')}
                                </div>
                                <div className="text">
                                    {t('enter-hemis-id')}
                                </div>

                                <Form
                                    fields={[
                                        {
                                            name: ['ism'],
                                            value: login
                                        }
                                    ]}
                                    onFinish={Login}
                                >
                                    <Form.Item
                                        name="ism"
                                        rules={
                                            [
                                                {
                                                    required: true,
                                                    message: t('required.name')
                                                }
                                            ]
                                        }

                                    >
                                        <div className="all-input">
                                            <Input
                                                type="text"
                                                placeholder={t('student-id')}
                                                name="ism"
                                            >
                                            </Input>
                                            <img src={user} alt="user-icon" className='user-icon'/>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            loading={isLoading}
                                            htmlType="submit"
                                            className="signUp"
                                        >
                                            {t('send')}
                                        </Button>
                                    </Form.Item>
                                </Form>
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