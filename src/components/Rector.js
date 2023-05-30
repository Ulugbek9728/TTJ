import React, {useEffect, useState} from 'react';
import {Modal,Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"
import {useNavigate} from "react-router";

function Rector(props) {
    const navigate = useNavigate();


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');

    const [creatDecan, setCreatDecan] = useState({});
    const [dekanId, setDekanId] = useState('');

    const [Dekan, setDekan] = useState([]);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        edit ?
            axios.post(`${ApiName1}/adm/rector/update/${creatDecan.ID}`, creatDecan,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                if (response.status === 200){
                    setIsModalVisible(false);
                    setedit(false);
                    setCreatDecan('');
                    setDekan('');
                    setSucsessText("Rektor ma'lumotlari tahrirlandi")
                }
            }).catch((error) => {
                console.log(error.response);
                if (error.response.status === 400){
                    setMessage(error.response.data.errors)
                }
                if (error.response.status === 406){
                    setMessage2(error.response.data)
                }
                if (error.response.status === 502){
                    setMessage2('Server bilan ulanishda xatolik')
                }
            })
            :
            axios.post(`${ApiName1}/adm/rector/create`, creatDecan,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                if (response.status === 201){
                    setIsModalVisible(false);
                    setCreatDecan('');
                    setDekan('');
                    setSucsessText("Rektor ma'lumotlari qo'shildi")
                }
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 400){
                    setMessage(error.response.data.errors)
                }
                if (error.response.status === 406){
                    setMessage2(error.response.data)
                }
                if (error.response.status === 502){
                    setMessage2('Server bilan ulanishda xatolik')
                }
            });
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setCreatDecan('');
        setedit(false);
    };
    function DekanInfo() {
        axios.get(`${ApiName1}/adm/rector`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setDekan(response.data);
        }).catch((error) => {
            if (error.response.status <= 500){
                setMessage2('Server bilan ulanishda xatolik')
            }
            if (error.response.status === 401){
                navigate("/")
            }
            console.log(error.response)
        })
    }

    function Delet() {
        axios.delete(`${ApiName1}/adm/rector/${dekanId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200){
                setSucsessText("Ma'lumotlar o'chirildi");
                setDekan('')
            }
        }).catch((error) => {
            console.log(error.response)
            if (error.response.status === 502){
                setMessage2('Server bilan ulanishda xatolik')
            }
        });
    }

    useEffect(() => {
        DekanInfo();
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('')
    },[message, sucsessText, message2]);

    function notify() {
        if (message != ''){message && message.map((item) => (toast.error(item)))}
        if (sucsessText != ''){toast.success(sucsessText)}
        if (message2 != ''){toast.error(message2)}
    }

    return (
        <div>
            <ToastContainer/>
            <div className="yuklash">
                <button onClick={showModal} className='btn btn-success '>
                    Rektor qo'shish
                </button>
            </div>
            <Modal className='ticherModal' title={edit ? "Tahrirlash" : "Rektor qo'shish"}
                   open={isModalVisible}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <label htmlFor='Familya'>Familya</label>
                    <Input id='Familya' value={creatDecan.SURNAME} allowClear onChange={(e)=>{
                        setCreatDecan({...creatDecan, SURNAME: e.target.value,})}}/>
                    <label htmlFor='Ism'>Ism</label>
                    <Input id='Ism' value={creatDecan.NAME} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               NAME: e.target.value,})}}/>
                    <label htmlFor='Sharif'>Sharif</label>
                    <Input id='Sharif' value={creatDecan.PATRONYMIC} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               PATRONYMIC: e.target.value,})}}/>
                    <label htmlFor='Sharif'>Tel:</label>
                    <Input id='Sharif' value={creatDecan.PHONE} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               PHONE: e.target.value,})}}/>
                    <label htmlFor="Login">Login</label>
                    <Input id='Login' value={creatDecan.LOGIN} allowClear maxLength="9"
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               LOGIN: e.target.value.toUpperCase(),})}}/>
                    <label htmlFor="Parol">Parol</label>
                    <Input id='Parol' value={creatDecan.PASSWORD} allowClear  onChange={(e)=>{
                        setCreatDecan({
                            ...creatDecan, PASSWORD: e.target.value,
                        })
                    }}/>
                </div>
            </Modal>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Familya</th>
                    <th>Ism</th>
                    <th>Sharif</th>
                    <th>Telefon</th>
                    <th>Login</th>
                    <th>Parol</th>
                </tr>
                </thead>
                <tbody>
                {Dekan && Dekan.map((item, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.SURNAME}</td>
                        <td>{item.NAME}</td>
                        <td>{item.PATRONYMIC}</td>
                        <td>{item.PHONE}</td>
                        <td>{item.LOGIN}</td>
                        <td>{item.PASSWORD}</td>
                        <td>
                            <button onClick={()=>{
                                showModal();
                                setCreatDecan(item);
                                setedit(true)
                            }} className="btn btn-warning mx-1">
                                <img style={{width:"20px", height:"20px"}}
                                     className='iconEdit' src="/img/editing.png" alt=""/>
                            </button>
                            <button className="btn btn-danger mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                                    onClick={()=>{setDekanId(item.ID)}}>
                                <img style={{width:"20px", height:"20px"}}
                                     className='iconEdit' src="/img/delete.png" alt=""/>
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
                            <b>Rector</b> ma'lumotlarini o'chirmoqchimisiz
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={Delet}>
                                <img style={{width:"20px", height:"20px"}} src="/img/delete.png" alt=""/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rector;