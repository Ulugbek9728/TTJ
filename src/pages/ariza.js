import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import Navbar from "../components/Navbar";

import Footer from "../components/footer";
import axios from "axios";
import {ApiName} from "../APIname";
import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from 'antd';
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";

const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function Ariza(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [Student, setStudent] = useState({
        name: "",
        login: "",
        imageUrl: "",
        specialty: "",
        group: "",
        gender: "",
        faculty: "",
        course: "",
        country: "",
        city: "",
        district: "",
        phone: "",
        attachList: []
    });
    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [sabab, setSabab] = useState([{}]);

    const lang = localStorage.getItem('i18nextLng');
    const addLanguage = () => {
        setFile([...file, {
            fileName: '',
            fileBox: ''
        }])
    };
    useEffect(() => {
        setSabab([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map((item) => (
                {
                    name: t(`reasons.${item}`)
                }))
        )
    }, [lang])
    const handleInputFile = (e, index) => {
        file[index].fileBox = e.target.files[0]
    };

    const handleInputLanguage = (e, index) => {
        setFile(file?.map((item, idn) => {
            if (idn === index) {
                item.fileName = e;
                return item;
            } else {
                return item;
            }
        }));
    };

    useEffect(() => {
        getStudent();
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('')
    }, [message, sucsessText, message2]);

    function notify() {
        if (message !== '') {
            message && message.map((item) => (toast.error(item)))
        }
        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
        if (message2 !== '') {
            toast.error(message2)
        }
    }

    function getStudent() {
        axios.get(`${ApiName}account/me`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setStudent({
                ...Student,
                name: response.data.data.full_name,
                login: response.data.data.student_id_number,
                imageUrl: response.data.data.image,
                specialty: response.data.data.specialty.name,
                group: response.data.data.group.name,
                phone: response.data.data.phone,
                gender: response.data.data.gender.name,
                faculty: response.data.data.faculty.name,
                course: response.data.data.level.name,
                country: response.data.data.country.name,
                city: response.data.data.province.name,
                district: response.data.data.district.name,
            })
        }).catch((error) => {
            navigate("/login");
            console.log(error);
        })

    }

    function postStudent() {
        const allData = new FormData();
        setIsLoading(true);
        file.map((item, index) => (<>{allData.append(item.fileName, item.fileBox)}</>));

        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                Student.attachList = response.data

                axios.post(`${ApiName1}/public/student/join/data`, Student)
                    .then((response) => {
                        if (response.status === 201) {
                            setFile([{
                                fileName: '',
                                fileBox: null
                            }])

                            document.getElementById('FILE').value = null;
                            setSucsessText("Ma'lumotlar muvafaqiyatli yuborildi")
                            setIsLoading(false);
                        }
                    }).catch((error) => {
                    setIsLoading(false);
                    if (error.response.status === 400) {
                        setMessage2(error.response.data)
                    }
                })

            }).catch((error) => {
            setIsLoading(false);
        })
    }

    return (
        <>
            <ToastContainer/>
            <Navbar/>

            <div className='container ArizaPage'>
                <div className="row">
                    <div className="title">
                        {t("carusel.Ariza yuborish")}
                    </div>
                    <div className="login-page">
                        <div className="left-side">
                            <div className="imgBox">
                                <img src={Student.imageUrl} alt=""/>
                                <p className="fullName">{Student.name}</p>
                            </div>

                            <br/>
                            <p>LOGIN:<span>{Student.login}</span></p>
                            <p>FAKULTET: <span>{Student.faculty}</span></p>
                            <p>YO'NALISH: <span>{Student.specialty}</span></p>
                            <p>GURUH: <span>{Student.group}</span></p>
                            <p>KURS: <span>{Student.course}</span></p>
                            <p>MANZIL:
                                <span>{Student.country} {Student.city} {Student.district}</span>
                            </p>
                            <p>TEL: <span>{Student.phone}</span></p>

                        </div>

                        <div className="right-side overflow-auto">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <span>Faqat pdf faylni yuklang !!!</span>
                            <div className="container">
                                <Form name="dynamic_form_nest_item" onFinish={onFinish}
                                      style={{maxWidth: 600}} autoComplete="off">
                                    {file && file.map((item, index) => (
                                        <div key={index} style={{display: 'flex', marginBottom: 8}}
                                             align="baseline">
                                            <div className="dropdown">
                                                <button className=" selectBtn dropdown-toggle" type="button"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    {item.fileName}
                                                </button>
                                                <div className="dropdown-menu"
                                                     aria-labelledby="dropdownMenuButton">

                                                    {sabab.map((item) => {
                                                        return <div key={item.name} className="test"
                                                                    onClick={(e) => {
                                                                        handleInputLanguage(item.name, index)
                                                                    }}>
                                                            {item.name}
                                                        </div>
                                                    })}

                                                </div>
                                            </div>
                                            <input type="file" className='form-control' id='FILE'
                                                   accept="application/pdf"
                                                   onChange={(e) => handleInputFile(e, index)}/>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" block icon={<PlusOutlined/>}
                                                onClick={addLanguage}
                                        >
                                            Add field
                                        </Button>
                                    </Form.Item>


                                </Form>

                            </div>
                            <div className="d-flex justify-content-center">
                                <Button loading={isLoading} className="signUp"
                                        onClick={postStudent}>
                                    {t('send')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>

        </>
    );
}

export default Ariza;