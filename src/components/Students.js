import React, {useEffect, useState} from 'react';
import {Modal,Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"




function Student(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');


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
            <div>
                123
            </div>

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

export default Student;