import React, {useEffect, useState} from 'react';
import '../asset/Admin.scss'
import {Button, Form, Input, Select} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";


const {Option} = Select;
const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function AddStudent(props) {
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
        faculty: "",
        course: "",
        country: "",
        city: "",
        district: "",
        phone: "",
        attachList: []
    });
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
        file[index].fileName = e;
        console.log(e)
        console.log(index)
        console.log(file)
    };

    function postStudent() {
        const allData = new FormData();

        file.map((item, index) => (<>{allData.append(item.fileName, item.fileBox)}</>));

        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                Student.attachList = response.data

                axios.post(`${ApiName1}/public/student/join/data`, Student)
                    .then((response) => {


                        if (response.status === 201) {
                            console.log(response)
                            setSucsessText("Ma'lumotlar muvafaqiyatli yuborildi")
                        }
                    }).catch((error) => {
                    console.log(error)
                    if (error.response.status === 500) {
                        setMessage2("Ma'lumotlar 1 marotaba yuboriladi")
                    }
                })

            }).catch((error) => {

        })
    }

    useEffect(() => {
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('')
    }, [message, sucsessText, message2]);

    function notify() {
        if (message != '') {
            message && message.map((item) => (toast.error(item)))
        }
        if (sucsessText != '') {
            toast.success(sucsessText)
        }
        if (message2 != '') {
            toast.error(message2)
        }
    }

    return (
        <div className='ADDstudent'>
            <div className="box d-flex">
                <div className="left">
                    <label htmlFor="img"><h5>Talaba rasimi</h5></label>
                    <input className='form-control' type="file" id='img' accept="image/png, image/jpeg"/>
                    <label htmlFor="Ism"><h5>F.I.Sh</h5></label><br/>
                    <input className='form-control' type="text" id='Ism'/>
                    <label htmlFor="tel"><h5>Tel:</h5></label><br/>
                    <input className='form-control' type="text" id='tel'/>
                    <label htmlFor="Jinsi"><h5>Jinsi</h5></label>
                    <Select className='w-100' name="" id="Jinsi">
                        <Option value="">Erkak</Option>
                        <Option value="">Ayol</Option>
                    </Select>
                    <label htmlFor="Davlat"><h5>Davlat</h5></label>
                    <input className='form-control' type="text" id='Davlat'/>
                    <label htmlFor="Shaxar"><h5>Shaxar yoki viloyat</h5></label>
                    <input className='form-control' type="text" id='Shaxar'/>
                    <label htmlFor="Tuman"><h5>Tuman</h5></label>
                    <input className='form-control' type="text" id='Tuman'/>
                    <label htmlFor="Fakultet"><h5>Fakultet</h5></label>
                    <input className='form-control' value={localStorage.getItem('faculty')}
                           type="text" id='Fakultet' disabled={true}/>
                    <label htmlFor="Yo'nalish"><h5>Yo'nalish</h5></label>
                    <input className='form-control' type="text" id="Yo'nalish"/>
                    <label htmlFor="Kurs"><h5>Kurs</h5></label>
                    <input className='form-control' value='1' disabled={true} type="text" id="Kurs"/>

                </div>
                <div className="right">
                    <h5>TTJ da turish uchun sabab ko'rsating</h5>
                    <span>faqat pdf faylni yuklang !!!</span>
                    <div className="container">
                        <Form
                            name="dynamic_form_nest_item"
                            onFinish={onFinish}
                            style={{maxWidth: 600}}
                            autoComplete="off">
                            {file.map((item, index) =>
                                (<div key={index}
                                      style={{display: 'flex', marginBottom: 8, position:"relative"}}
                                      align="baseline">
                                    <div className="dropdown">
                                        <button className=" selectBtn dropdown-toggle" type="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sababni tanlang
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
                                    <Input type="file" accept="application/pdf"
                                           onChange={(e) => handleInputFile(e, index)}/>
                                </div>))}
                            <Form.Item>
                                <Button type="dashed" block icon={<PlusOutlined/>} onClick={addLanguage}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button className="signUp" onClick={postStudent}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddStudent;