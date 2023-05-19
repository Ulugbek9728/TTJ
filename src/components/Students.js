import React, {useEffect, useState} from 'react';
import {Modal, Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"
import {useNavigate} from "react-router";


function Student(props) {
    const navigate = useNavigate();

    const [sucsessText, setSucsessText] = useState('');
    const [Dekan, setDekan] = useState([]);
    const [Students, setStudent] = useState([]);
    const [Studentunic, setStudentUnic] = useState({});
    const [FakultyName, setFakultyName] = useState('');
    const [Kurs, setKurs] = useState('');

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');


    useEffect(() => {
        DekanInfo();
        if (FakultyName !== '') {
            if(Kurs !==''){
                FakultyInfo()
            }
        }
    }, [sucsessText, Kurs]);

    function FakultyInfo() {
        axios.post(`${ApiName1}/private/student/list/${FakultyName} fakulteti/${Kurs}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
            setStudent(response.data);

        }).catch((error) => {
            console.log(error.response)
        })
    }

    function seeStudent(e) {
        axios.post(`${ApiName1}/private/student/file/show/${e}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function DekanInfo() {
        axios.post(`${ApiName1}/adm/faculty/faculty_list`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setDekan(response.data);

        }).catch((error) => {
            if (error.response.status === 502) {
                setMessage2('Server bilan ulanishda xatolik')
            }
            if (error.response.status === 401) {
                navigate("/")
            }
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
console.log(Studentunic)
    return (
        <div>
            <ToastContainer/>
            <select className='form-control my-2' style={{width: "30%"}}
                    onChange={(e) => {
                        setFakultyName(e.target.value);

                    }}>
                <option>Fakultet</option>
                {Dekan && Dekan.map((item, index) => {
                    return <option key={index} value={item.name}>{item.name}</option>
                })}
            </select>
            <select  className='form-control my-2' style={{width: "30%"}}
                    onChange={(e) => {
                        setKurs(e.target.value);}}>
                <option>Kurs</option>
                <option value='1-kurs'>1-Kurs</option>
                <option value='2-kurs'>2-Kurs</option>
                <option value='3-kurs'>3-Kurs</option>
                <option value='4-kurs'>4-Kurs</option>

            </select>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>F.I.Sh</th>
                    <th>Fakultet</th>
                    <th>Kurs</th>
                    <th>Tel</th>
                </tr>
                </thead>
                <tbody>
                {Students && Students.map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.faculty}</td>
                        <td>{item.course}</td>
                        <td>{item.phone}</td>
                        <td>
                            <button className="btn btn-outline-success mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                            onClick={(e)=>{seeStudent(item.id); setStudentUnic(item)}}>
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/show.png" alt=""/>
                            </button>
                            <button className="btn btn-danger mx-1">
                                <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                     src="/img/delete.png"
                                     alt=""/>
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <div className="modal" id="myModal">
                <div className="modal-content mx-auto" style={{width:"70vw"}}>

                    <div className="modal-header">
                        <h4 className="modal-title">Talaba to'liq ma'lumoti</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                    </div>

                    <div className="modal-body d-flex">
                        <div className="d-flex" style={{width:"65%"}}>
                            <img src={Studentunic.imageUrl} width={150} height={180} alt=""/>
                            <div className="mx-2">
                                <p className='m-0'>F.I.SH</p>
                                <b className="">{Studentunic.name}</b>
                                <hr/>
                                <p className='m-0'>Jinsi</p>
                                <b className="">
                                    {Studentunic.gender}
                                </b>
                                <hr/>
                                <p className='m-0'>Yashash manzili</p>
                                <b className="">
                                    {Studentunic.country} / {Studentunic.city} / {Studentunic.district}
                                </b>
                                <hr/>
                            </div>

                        </div>
                        <div className="d-flex" style={{width: "35%"}}>

                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Student;