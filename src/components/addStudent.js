import React, {useEffect, useState} from 'react';
import '../asset/Admin.scss'
import {Button, Form, Input, Select} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";


const {Option} = Select;
const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function AddStudent(props) {
    const {t} = useTranslation();

    const [file, setFile] = useState([{
        fileName: '',
        fileBox: null
    }]);
    const [Student, setStudent] = useState({
        name: "",
        login: "",
        imageUrl: "",
        specialty: "",
        group: "",
        gender: "",
        faculty: localStorage.getItem('faculty'),
        course: "COURSE_1",
        country: "",
        city: "",
        district: "",
        phone: "",
        attachList: []
    });
    const [studentImg, setStudentImg]=useState('')
    const [message, setMessage] = useState([]);
    const [sabab, setSabab] = useState([
        {name: 'Chin yetim yoki yetim talabalar'},
        {name: 'Boquvchisini yo‘qotgan (otasi) talabalar'},
        {name: 'Nogironlgi bo‘lgan talabalar'},
        {name: 'Otasi (boquvchisi) nogiron talabalar'},
        {
            name: `Temir daftar”, “Ayollar daftari”, “Yoshlar daftari” 
            ro‘yxatiga kiritilgan, ijtimoiy himoyaga o‘ta muhtoj oila farzandlari`
        },
        {
            name: `Oilada ikki va undan ortiq farzandlari kunduzgi 
            ta’limda shartnoma asosida o‘qiydigan oila farzandlari`
        },
        {name: 'Chet eldan kelib o‘qiydigan xorijiy talabalar'},
        {name: `Respublikaning olis hududlaridan kelgan talabalar`},
        {name: `Yozgi ta’til vaqtida “Bunyodkor yoshlar mehnat otryadi”da faol ishtirok etgan talabalar`},
        {
            name: `Universitet Yoshlar ittifoqi kengashi raisining tavsiyanomasiga
         asosan universitet yoshlar Kengashi a’zolari`
        },
        {
            name: `Iqtidorli talabalar (xalqaro, respublika, hudud va universitet miqyosida 
        o‘tkazilgan fan olimpiadalari va sport musobaqalari, ko‘rik-tanlovlar g‘oliblari, 
        ma’naviy-ma’rifiy va sport tadbirlarida faol ishtirok etgan)`
        },
        {
            name: `Talabalar turar joyida o‘tgan o‘quv yillarida namunali faoliyat yuritgan talabalar
         kengashi raisi va qavat sardorlari`
        },

    ]);
    const [message2, setMessage2] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addLanguage = () => {
        setFile([...file, {
            fileName: '',
            fileBox: ''
        }])
    };
    const handleInputFile = (e, index) => {
        file[index].fileBox = e.target.files[0]
    };
    const handleInputLanguage = (e, index) => {
        setFile(file?.map((item,idn)=>{
            if (idn === index){
                item.fileName = e;
                return item;
            }else {
                return item;
            }
        }));
    };
    function GenderSelect(value,key) {
        setStudent({...Student,
            gender:value})
    }

    function postStudent() {
        setIsLoading(true);
        const allData = new FormData();
        const ImgStudent = new FormData();
        file.map((item, index) => (<>{allData.append(item.fileName, item.fileBox)}</>));
        ImgStudent.append('img', studentImg)
        axios.post(`${ApiName1}/attach/upload`, ImgStudent)
            .then((res)=>{
                Student.imageUrl = res.data[0]?.url;
                axios.post(`${ApiName1}/attach/upload`, allData)
                    .then((response) => {
                        Student.attachList = response.data;

                        axios.post(`${ApiName1}/private/create/student`, Student,{
                            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
                        })
                            .then((response) => {
                                if (response.status === 201) {
                                    setIsLoading(false);
                                    setFile([{
                                        fileName: '',
                                        fileBox: null
                                    }]);
                                    setStudent(
                                        {
                                            name: "",
                                            login: "",
                                            imageUrl: "",
                                            specialty: "",
                                            group: "",
                                            gender: "",
                                            faculty: localStorage.getItem('faculty'),
                                            course: "COURSE_1",
                                            country: "",
                                            city: "",
                                            district: "",
                                            phone: "",
                                            attachList: []
                                        }
                                    );
                                    document.getElementById('img').value = null;                            setSucsessText("Ma'lumotlar muvafaqiyatli yuborildi")
                                    document.getElementById('file').value = null;                            setSucsessText("Ma'lumotlar muvafaqiyatli yuborildi")
                                }
                            }).catch((error) => {
                            console.log(error)
                            setIsLoading(false);
                            if (error.response.status === 500) {
                                setMessage2("Ma'lumotlar 1 marotaba yuboriladi")
                            }
                            if (error.response.status === 400) {
                                setMessage2(error.response.data)
                            }
                        })
                    })
            }).then(()=>{
                setIsLoading(false)
        })

    }

    useEffect(() => {
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

    return (
        <div className='ADDstudent'>
            <div className="box d-flex">
                <div className="left">
                    <label htmlFor="img"><h5>Talaba rasimi</h5></label>
                    <input className='form-control' type="file" id='img' accept="image/png, image/jpeg"
                    onChange={(e)=>{setStudentImg(e.target.files[0])}}/>
                    <label htmlFor="Ism"><h5>F.I.Sh</h5></label><br/>
                    <input className='form-control' value={Student.name} type="text" id='Ism'
                    onChange={(e)=>{setStudent({...Student,name:e.target.value})}}/>
                    <label htmlFor="tel"><h5>Tel:</h5></label><br/>
                    <input className='form-control'  value={Student.phone} type="text" id='tel'
                           onChange={(e)=>{setStudent({...Student,phone:e.target.value})}}/>
                    <label htmlFor="Jinsi"><h5>Jinsi</h5></label>
                    <Select className='w-100' value={Student.gender} name="" id="Jinsi"
                            onChange={GenderSelect}>
                        <Option value="Erkak">Erkak</Option>
                        <Option value="Ayol">Ayol</Option>
                    </Select>
                    <label htmlFor="Davlat"><h5>Davlat</h5></label>
                    <input className='form-control' value={Student.country} type="text" id='Davlat'
                           onChange={(e)=>{setStudent({...Student,country:e.target.value})}}/>
                    <label htmlFor="Shaxar"><h5>Shaxar yoki viloyat</h5></label>
                    <input className='form-control' value={Student.city} type="text" id='Shaxar'
                           onChange={(e)=>{setStudent({...Student,city:e.target.value})}}/>
                    <label htmlFor="Tuman"><h5>Tuman</h5></label>
                    <input className='form-control' value={Student.district} type="text" id='Tuman'
                           onChange={(e)=>{setStudent({...Student,district:e.target.value})}}/>
                    <label htmlFor="Fakultet"><h5>Fakultet</h5></label>
                    <input className='form-control' value={localStorage.getItem('faculty')}
                           type="text" id='Fakultet' disabled={true}/>
                    <label htmlFor="Yo'nalish"><h5>Yo'nalish</h5></label>
                    <input className='form-control' value={Student.specialty} type="text" id="Yo'nalish"
                           onChange={(e)=>{setStudent({...Student,specialty:e.target.value})}}/>
                    <label htmlFor="Kurs"><h5>Kurs</h5></label>
                    <input className='form-control' value='1' disabled={true} type="text" id="Kurs"/>
                    <label htmlFor="Guruh"><h5>Guruh raqami</h5></label>
                    <input className='form-control' value={Student.group} type="text" id="Guruh"
                           onChange={(e)=>{setStudent({...Student,group:e.target.value})}}/>
                    <label htmlFor="Login"><h5>Login</h5></label>
                    <input className='form-control' value={Student.login} type="text" id="Login"
                           onChange={(e)=>{setStudent({...Student,login:e.target.value})}}/>

                </div>
                <div className="right">
                    <h5>{t('give-reason-for-ttj')}</h5>
                    <span>Faqat pdf faylni yuklang !!!</span>
                    <div className="container">
                        <Form name="dynamic_form_nest_item" onFinish={onFinish}
                            style={{maxWidth: 600}} autoComplete="off">
                            {file.map((item, index) => {
                                return (
                                <div key={index}
                                      style={{display: 'flex', marginBottom: 8, position:"relative"}}
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
                                    <input type="file" className='form-control' id='file' accept="application/pdf"
                                           onChange={(e) => handleInputFile(e, index)}/>
                                </div>
                                )
                            })}
                            <Form.Item>
                                <Button type="dashed" block icon={<PlusOutlined/>} onClick={addLanguage}>
                                    Sabab qo'shish
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button loading={isLoading}
                                className="signUp btn btn-primary w-50 p-0"
                                style={{height:'50px'}}
                                onClick={postStudent}>
                            {t('send')}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddStudent;