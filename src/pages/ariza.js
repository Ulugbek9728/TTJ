import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import Navbar from "../components/Navbar";

import Footer from "../components/footer";
import axios from "axios";
import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Select, Modal, Space} from 'antd';
import {ApiName1} from "../APIname1";
import {ApiName} from "../APIname";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";

import {CaretDownOutlined} from '@ant-design/icons';

const onFinish = (values: any) => {};


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
        birthDate:'',
        district: "",
        phone: "",
        attachList: []});
    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [sabab, setSabab] = useState([{}]);
    const [errorMessage, setErrorMessage] = useState('');
    const [Index, setIndex] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showExpDateModal, setShowExpDateModal] = useState(false);

    const lang = localStorage.getItem('i18nextLng');
    const addLanguage = () => {
        setFile([...file, {
            fileName: '',
            fileBox: ''
        }])
    };

    const handleChange = (v) => {
        setStudent({...Student,
            course:v
        })
    };

    useEffect(() => {
        setSabab([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            .map((item) => (
                {
                    name: t(`reasons.${item}`),
                    key: t(`reasons.${item}`, {lng: 'uz'}),
                }))
        )
    }, [lang]);
    const handleInputFile = (e, index) => {
        if (e.target.files[0]?.type === 'application/pdf') {
            file[index].fileBox = e.target.files[0]
            setFile(file);
            setErrorMessage('');
        } else {
            setErrorMessage('Faqat PDF file yuklash kerak!!');
        }

    };

    const handleInputLanguage = (e, index) => {
        setFile(file?.map((item, idn) => {
            if (idn === Index) {
                item.fileName = e;
                return item;
            } else {
                return item;
            }
        }));
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);

    };
    const handleCancel = () => {
        setIsModalVisible(false);
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
                headers: {'Authorization':'Bearer '+ localStorage.getItem("token")}
            }).then((response) => {
            console.log(response.data.data)
            setStudent({
                ...Student,
                name: response.data.data.full_name,
                login: response.data.data.student_id_number,
                imageUrl: response.data.data.image,
                specialty: response.data.data.specialty.name,
                group: response.data.data.group.name,
                phone: response.data.data.phone,
                birthDate: response.data.data?.birth_date,
                gender: response.data.data.gender.name,
                faculty: response.data.data.faculty.name,
                country: response.data.data.country.name,
                city: response.data.data.province.name,
                district: response.data.data.district.name,
            })
        }).catch((error) => {
            // navigate("/login");
            console.log(error);
        })

    }

    function postStudent() {
        if (file[0]?.fileName === '' || file[0]?.fileBox === null) {
            setErrorMessage(t('required.reason'))
        } else {

            const allData = new FormData();
            setIsLoading(true);
            setErrorMessage('')
            file.map((item, index) => (<>{allData.append(sabab[item.fileName].key, item.fileBox)}</>));
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
                                setSucsessText(t('data-send-success'))
                                setIsLoading(false);
                            }
                        }).catch((error) => {
                        console.log(error.response.status)
                        setIsLoading(false);
                        if (error.response.status === 400) {
                            setMessage2(error.response.data === 'Bunday talaba mavjud ' ? t('application-submitted-already') : '')
                            setMessage(error.response.data.errors)
                        }

                    })

                }).catch((error) => {
                setIsLoading(false);
            })

        }
    }

    const expDate = () => {
        setShowExpDateModal(true);
    }
    return (
        <>
            <Navbar/>

            <div className='container ArizaPage'>
                <Modal title={"Sababni Tanlang"} open={isModalVisible}
                       onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        {sabab.map((item, index) => {
                            return <div key={item.key} className="test"
                                        onClick={(e) => {
                                            handleInputLanguage(index)
                                            setIsModalVisible(false)
                                        }}>
                                {item.name}
                                <hr/>
                            </div>
                        })}
                    </div>
                </Modal>
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
                            <p>{t('login')}:<span>{Student.login}</span></p>
                            <p>{t('faculty')}: <span>{Student.faculty}</span></p>
                            <p>{t('direction')}: <span>{Student.specialty}</span></p>
                            <p>{t('group')}: <span>{Student.group}</span></p>

                            <p>{t('course')}: </p>
                            <Space wrap className='form-control'>
                                <Select
                                    defaultValue="kurs"
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: '1-kurs',
                                            label: '1',
                                        },
                                        {
                                            value: '2-kurs',
                                            label: '2',
                                        },
                                        {
                                            value: '3-kurs',
                                            label: '3',
                                        },
                                        {
                                            value: '4-kurs',
                                            label: '4',
                                        },
                                    ]}
                                />

                            </Space>

                            <p>{t('address')}:
                                <span>{Student.country} {Student.city} {Student.district}</span>
                            </p>
                            <p>{t('phone')}: <span>{Student.phone}</span></p>

                        </div>

                        <div className="right-side overflow-auto">
                            <h5>{t('give-reason-for-ttj')}</h5>
                            <span>{t('only-pdf')}</span>
                            <div className="container p-0">
                                <Form name="dynamic_form_nest_item" onFinish={onFinish}
                                      autoComplete="off">
                                    {file && file.map((item, index) => (
                                        <div key={index} style={{display: 'flex', marginBottom: 8}}
                                             align="baseline">
                                            <button className='selectBtn btn' type="button"
                                                    onClick={() => {showModal();setIndex(index)}}>
                                                {sabab[item.fileName]?.name}
                                                <CaretDownOutlined/>
                                            </button>
                                            <input type="file"
                                                   className='form-control' id='FILE' accept="application/pdf"
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

                                    {errorMessage && <p className="text-bg-danger">{errorMessage}</p>}
                                </Form>
                            </div>
                            <div className="d-flex justify-content-center" >
                                <Button loading={isLoading}
                                        className="signUp"
                                        onClick={
                                            postStudent
                                            // expDate
                                        }>
                                    {t('send')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal title={"Ariza topshirish vaqti tugadi!"}
                       open={showExpDateModal}
                       onOk={() => {
                           setShowExpDateModal(false)
                       }}
                       onCancel={() => {
                           setShowExpDateModal(false)
                       }}
                >
                    <div className={"text-bg-danger"}>
                        Ariza topshirish vaqti tugagan!!
                    </div>
                </Modal>
            </div>
            <Footer/>

        </>
    );
}

export default Ariza;