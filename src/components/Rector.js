import React, {useEffect, useState} from 'react';
import {Modal,Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"




function Rector(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');

    const [creatDecan, setCreatDecan] = useState({});
    const [Dekan, setDekan] = useState([]);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        edit ?
            axios.post(`${ApiName1}/adm/dekan/update/${creatDecan.id}`, creatDecan,{
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
            axios.post(`${ApiName1}/adm/dekan/create`, creatDecan,{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                if (response.status === 201){
                    setIsModalVisible(false);
                    setCreatDecan('');
                    setDekan('');
                    setSucsessText("Rektor ma'lumotlari qo'shildi")
                }
            }).catch((error) => {
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

    useEffect(() => {
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
                    <Input id='Familya' value={creatDecan.surname} allowClear onChange={(e)=>{
                        setCreatDecan({...creatDecan, surname: e.target.value,})}}/>
                    <label htmlFor='Ism'>Ism</label>
                    <Input id='Ism' value={creatDecan.name} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan, name: e.target.value,})}}/>

                    <label htmlFor='Sharif'>Sharif</label>
                    <Input id='Sharif' value={creatDecan.patronymic} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               patronymic: e.target.value,})}}/>
                    <label htmlFor='Fakultet'>Fakultet</label>
                    <Input id='Fakultet' value={creatDecan.faculty} allowClear
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               faculty: e.target.value,})}}/>
                    <label htmlFor="Login">Login</label>
                    <Input id='Login' value={creatDecan.login} allowClear maxLength="9"
                           onChange={(e)=>{setCreatDecan({...creatDecan,
                               login: e.target.value.toUpperCase(),})}}/>
                    <label htmlFor="Parol">Parol</label>
                    <Input id='Parol' value={creatDecan.password} allowClear  onChange={(e)=>{
                        setCreatDecan({
                            ...creatDecan,
                            password: e.target.value,
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
                    <th>Fakultet</th>
                    <th>Login</th>
                    <th>Parol</th>
                </tr>
                </thead>
                <tbody>
                {/*{Dekan && Dekan.map((item, index)=>{*/}
                {/*    return <tr key={index}>*/}
                {/*        <td>{index+1}</td>*/}
                {/*        <td>{item.surname}</td>*/}
                {/*        <td>{item.name}</td>*/}
                {/*        <td>{item.patronymic}</td>*/}
                {/*        <td>{item.faculty}</td>*/}
                {/*        <td>{item.login}</td>*/}
                {/*        <td>{item.password}</td>*/}
                {/*        <td>*/}
                {/*            <button onClick={()=>{*/}
                {/*                showModal();*/}
                {/*                setCreatDecan(item);*/}
                {/*                setedit(true)*/}
                {/*            }} className="btn btn-warning mx-1">*/}
                {/*                <img className='iconEdit' src="/img/editing.png" alt=""/>*/}
                {/*            </button>*/}
                {/*            <button onClick={()=>{setDekanId(item.id)}} className="btn btn-danger mx-1"*/}
                {/*                    data-bs-toggle="modal" data-bs-target="#myModal">*/}
                {/*                <img className='iconEdit' src="/img/delete.png" alt=""/>*/}
                {/*            </button>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*})}*/}


                </tbody>
            </table>
        </div>
    );
}

export default Rector;