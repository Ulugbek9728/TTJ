import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import "../asset/arizaPage.scss"
import Navbar from "../components/Navbar";

import Footer from "../components/footer";
import axios from "axios";
import {ApiName} from "../APIname";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function Ariza(props) {
    const {t } = useTranslation();
    const [Student, setStudent] = useState({
        full_name: "",
        login: "",
        image: "",
        specialty: "",
        group: "",
        faculty: "",
        level:"",
        country:"",
        province:"",
        district:"",
    });

    useEffect(() => {
        getStudent()
    },[]);

    function getStudent() {
        axios.get(`${ApiName}account/me`,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response)=>{
            setStudent({...Student,
                full_name:response.data.data.full_name,
                login:response.data.data.student_id_number,
                image:response.data.data.image,
                specialty:response.data.data.specialty.name,
                group:response.data.data.group.name,
                faculty:response.data.data.faculty.name,
                level:response.data.data.level.name,
                country:response.data.data.country.name,
                province:response.data.data.province.name,
                district:response.data.data.district.name,
            })
            console.log(response.data.data)

        }).catch((error)=>{
            console.log(error);
        })

    }

    return (
        <>
            <Navbar/>

            <div className='container ArizaPage'>
                <div className="row">
                    <div className="title">
                        {t("carusel.Ariza yuborish")}

                    </div>
                    <div className="login-page">
                        <div className="left-side">
                            <div className="imgBox">
                                <img src={Student.image} alt=""/>
                                <p className="fullName">{Student.full_name}</p>
                            </div>

                            <br/>
                            <p>LOGIN:<span>{Student.login}</span></p>
                            <p>FAKULTET: <span>{Student.faculty}</span></p>
                            <p>YO'NALISH: <span>{Student.specialty}</span></p>
                            <p>GURUH: <span>{Student.group}</span></p>
                            <p>KURS: <span>{Student.level}</span></p>
                            <p>MANZIL:
                                <span>{Student.country} {Student.province} {Student.district}</span>
                            </p>
                        </div>

                        <div className="right-side overflow-auto">
                            <div className="container">
                                <Form
                                    name="dynamic_form_nest_item"
                                    onFinish={onFinish}
                                    style={{ maxWidth: 600 }}
                                    autoComplete="off">
                                    <Form.List name="users">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'first']}
                                                            rules={[{ required: true,
                                                                message: 'Missing first name' }]}
                                                        >
                                                            <Input placeholder="Sababni ko'rsating" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'last']}
                                                            rules={[{ required: true, message: 'Missing last name' }]}
                                                        >
                                                            <Input type="file" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed"
                                                            onClick={() => add()}
                                                            block icon={<PlusOutlined />}>
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                    <Form.Item>
                                        <Button type="primary" className="signUp" htmlType="submit">
                                            Submit
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

export default Ariza;