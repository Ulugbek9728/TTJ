import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast, ToastContainer} from "react-toastify";

function Faculty(props) {

    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [fakultet, setFakultet] = useState('');
    const [fakultetId, setFakultetId] = useState('');
    const [Getfakultet, setGetFakultet] = useState([]);

    function creatFakulty() {
        edit ?
            axios.post(`${ApiName1}/adm/faculty/update/${fakultetId}`, {name:fakultet},{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                setSucsessText("Fakultet ma'lumotlari yangilandi");
                setedit(false);
                setFakultet('');
                setFakultetId('')
            }).catch((error) => {
                console.log(error.response)
            })
            :
        axios.post(`${ApiName1}/adm/faculty/create`, {name:fakultet},{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response)
                setSucsessText("Fakultet ma'lumotlari qo'shildi")
            setFakultet('')
        }).catch((error) => {
           console.log(error.response)
        });
    }

    useEffect(() => {
        GetFakultet();
        notify()
    },[sucsessText]);

    function GetFakultet() {
        axios.post(`${ApiName1}/adm/faculty/faculty_list`, '',{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetFakultet(response.data);
            console.log(response.data);

        }).catch((error) => {
            console.log(error.response)
        })
    }
    function Delet() {
        console.log(fakultetId
        )
        axios.delete(`${ApiName1}/adm/faculty/delete/${fakultetId}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setFakultetId('');
                setSucsessText("Ma'lumotlar o'chirildi");
            }
        }).catch((error) => {
            console.log(error.response)
        });
    }

    function notify() {
        if (sucsessText != '') {
            toast.success(sucsessText)
        }
    }

    return (
        <div>
            <ToastContainer/>
            <label htmlFor='fakultet'>Fakultet yaratish</label>
            <input type="text" value={fakultet} id="fakultet" className='form-control w-25 mb-2'
            onChange={(e)=>{setFakultet(e.target.value)}}/>
            <button className='btn btn-success' onClick={creatFakulty}>yaratish</button>
            <hr/>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Fakultet</th>
                    <th>Edit</th>
                    <th>Delet</th>
                </tr>
                </thead>
                <tbody>
                {Getfakultet && Getfakultet.map((item, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className="btn btn-warning mx-1"
                                    onClick={()=>{setFakultetId(item.id);setFakultet(item.name);setedit(true)}}>
                                <img style={{width:"20px", height:"20px"}}
                                     className='iconEdit' src="/img/editing.png" alt=""/>
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-danger mx-1"
                                    onClick={() => {setFakultetId(item.id)}}
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img style={{width:"20px", height:"20px"}} className='iconEdit' src="/img/delete.png" alt=""/>
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
                            <b>Fakultet</b> ni o'chirmoqchimisiz
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

export default Faculty;