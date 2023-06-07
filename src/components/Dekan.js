import React, {useEffect, useRef, useState} from 'react';
import {Modal, Input, Select, Form, Button,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";


const {Option} = Select;

function Dekan(props) {
    const [form] = Form.useForm();
    const formRef = useRef();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [Getfakultet, setGetFakultet] = useState([]);

    const [creatDecan, setCreatDecan] = useState({});
    const [Dekan, setDekan] = useState([]);
    const [dekanId, setDekanId] = useState('');
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = (values) => {
        console.log(values)
        edit ?
            axios.post(`${ApiName1}/adm/dekan/update/${creatDecan.id}`,
                values, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }).then((response) => {
                if (response.status === 200) {
                    setIsModalVisible(false);
                    setedit(false);
                    setCreatDecan('');
                    setDekan('');
                    setSucsessText("Dekan ma'lumotlari tahrirlandi")
                    form.resetFields();
                }
            }).catch((error) => {
                console.log(error.response);
                if (error.response.status === 400) {
                    setMessage(error.response.data.errors)
                }
                if (error.response.status === 406) {
                    setMessage2(error.response.data)
                }
                if (error.response.status === 502) {
                    setMessage2('Server bilan ulanishda xatolik')
                }
            })
            :
            axios.post(`${ApiName1}/adm/dekan/create`, values, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                if (response.status === 201) {
                    setIsModalVisible(false);
                    setCreatDecan('');
                    setDekan('');
                    setSucsessText("Dekan ma'lumotlari qo'shildi");
                    form.resetFields();
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    if (error.response.data.errors) {
                        setMessage(error.response.data.errors)
                    } else {
                        setMessage2(error.response.data);
                    }
                }
                if (error.response.status === 406) {
                    setMessage2(error.response.data)
                }
                if (error.response.status === 502) {
                    setMessage2('Server bilan ulanishda xatolik')
                }
            });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setCreatDecan('');
        setedit(false);
        form.resetFields();
    };

    useEffect(() => {
        DekanInfo();
        GetFakultet()
    }, [sucsessText]);

    function DekanInfo() {
        axios.post(`${ApiName1}/adm/dekan/dekan_list`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setDekan(response.data);
            console.log(response.data);
        }).catch((error) => {
            if (error.response.status <= 500) {
                setMessage2('Server bilan ulanishda xatolik')
            }
            if (error.response.status === 401) {
                navigate("/")
            }
            console.log(error.response)
        })
    }

    function GetFakultet() {
        axios.post(`${ApiName1}/adm/faculty/faculty_list`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetFakultet(response.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function Delet() {
        axios.delete(`${ApiName1}/adm/dekan/delete/${dekanId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200) {
                setSucsessText("Ma'lumotlar o'chirildi");
                setDekan('')
            }
        }).catch((error) => {
            console.log(error.response)
            if (error.response.status === 502) {
                setMessage2('Server bilan ulanishda xatolik')
            }
        });
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
        <div>
            <ToastContainer/>
            <div className="yuklash">
                <button onClick={showModal} className='btn btn-success '>
                    Dekan qo'shish
                </button>
            </div>
            <Modal className='ticherModal' title={edit ? "Tahrirlash" : "Dekan qo'shish"}
                   open={isModalVisible}
                   footer={null}
                   onCancel={handleCancel}
            >
                <Form
                    form={form}
                    onFinish={handleOk}
                    layout="vertical"
                    fields={[
                        {
                            name: "surname",
                            value: creatDecan?.surname
                        },
                        {
                            name: 'name',
                            value: creatDecan?.name
                        },
                        {
                            name: 'patronymic',
                            value: creatDecan?.patronymic
                        },
                        {
                            name: 'facultyId',
                            value: creatDecan?.facultyId
                        },
                        {
                            name: 'login',
                            value: creatDecan?.login
                        },
                        {
                            name: 'password',
                            value: creatDecan?.password
                        }
                    ]}
                >
                    <Form.Item
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: t('required.surname')
                            }
                        ]}
                        label="Familya"
                    >
                        <Input
                            onChange={(e) => {
                                setCreatDecan({
                                    ...creatDecan,
                                    surname: e.target.value,
                                })
                            }}
                            id='Familya'
                            name='surname'
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: t('required.field-name')
                            }
                        ]}
                        label="Ism"
                    >
                        <Input id='Ism' name="name"
                               onChange={(e) => {
                                   setCreatDecan({
                                       ...creatDecan,
                                       name: e.target.value,
                                   })
                               }}
                               value={creatDecan.name} allowClear/>
                    </Form.Item>

                    <Form.Item
                        name="patronymic"
                        rules={[
                            {
                                required: true,
                                message: t('required.patronymic')
                            }
                        ]}
                        label="Sharif"
                    >
                        <Input type="text" id='Sharif' name="patronymic" allowClear
                               onChange={(e) => {
                                   setCreatDecan({
                                       ...creatDecan,
                                       patronymic: e.target.value,
                                   })
                               }}/>
                    </Form.Item>

                    <Form.Item
                        name="facultyId"
                        rules={[
                            {
                                required: true,
                                message: t('required.faculty')
                            }
                        ]}
                        label="Fakultet"
                    >
                        <Select
                            name={"facultyId"}
                            onChange={(e => {
                                console.log(e)
                                setCreatDecan({
                                    ...creatDecan,
                                    facultyId: e,
                                })
                            })}
                            placeholder='Facultet'
                            options={Getfakultet.map((item, index) => (
                                {value: item.id, label: item.name}
                            ))}
                        />

                    </Form.Item>

                    <Form.Item
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: t('required.login'),
                                max: 9
                            }
                        ]}
                        label="Login"
                    >
                        <Input id='Login' allowClear
                               maxlength="9"
                               onChange={(e) => {
                                   setCreatDecan({
                                       ...creatDecan,
                                       login: e.target.value.toUpperCase(),
                                   })
                               }}
                               name={"login"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('required.password'),
                                min:7
                            }
                        ]}
                        label="Parol"
                    >

                        <Input id='Parol'
                               name="password"
                               allowClear onChange={(e) => {
                            setCreatDecan({
                                ...creatDecan,
                                password: e.target.value,
                            })
                        }}/>
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <Form.Item>
                            <Button
                                className="mx-2 btn btn-danger"
                                onClick={handleCancel}
                            >
                                Bekor qilish
                            </Button>

                            <Button
                                type="primary"
                                className="btn btn-info text-white"
                                htmlType="submit"
                            >
                                Qo'shish
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Familya</th>
                    <th>Ism</th>
                    <th>Sharif</th>
                    <th>Fakultet</th>
                    <th>Login</th>
                    <th>Parol</th>
                </tr>
                </thead>
                <tbody>
                {Dekan && Dekan.map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.surname}</td>
                        <td>{item.name}</td>
                        <td>{item.patronymic}</td>
                        <td>{item.faculty.name}</td>
                        <td>{item.login}</td>
                        <td>{item.password}</td>
                        <td>
                            <button onClick={() => {
                                showModal();
                                setCreatDecan(item);
                                setCreatDecan({...item, facultyId: item.faculty.id});
                                setedit(true)
                            }}
                                    className="btn btn-warning mx-1">
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/editing.png" alt=""/>
                            </button>
                            <button onClick={() => {
                                setDekanId(item.id)
                            }} className="btn btn-danger mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img style={{width: "20px", height: "20px"}} className='iconEdit' src="/img/delete.png"
                                     alt=""/>
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Tasdiqlash oynasi </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <b>Dekan</b> ma'lumotlarini o'chirmoqchimisiz
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={Delet}>
                                <img style={{width: "20px", height: "20px"}} src="/img/delete.png" alt=""/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dekan;