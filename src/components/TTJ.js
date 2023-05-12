import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast, ToastContainer} from "react-toastify";
import {Input} from "antd";

function Ttj(props)  {

    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [TTJ, setTTJ] = useState({});
    const [TTJId, setTTJId] = useState('');
    const [GetTTJ, setGetTTJ] = useState([]);
    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
    };

    function creatTTJ() {
        const allData = new FormData();
        allData.append(`file`,file.fileBox);
        if (edit === true){

            if (file.fileBox===undefined || null){
                axios.put(`${ApiName1}/private/admin/dormitory/${TTJ.id}`, TTJ,{
                    headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                    .then((response) => {
                        console.log(response)
                        if (response.status === 200){
                            setFile(null);
                            setTTJ('');
                            setGetTTJ([]);
                            setSucsessText("TTJ muvofaqiyatli o'zgartirildi")
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                axios.post(`${ApiName1}/attach/upload`, allData)
                    .then((response) => {
                        TTJ.photoId=response.data[0].id;
                        axios.put(`${ApiName1}/private/admin/dormitory/${TTJ.id}`, TTJ,
                            {
                                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                            .then((response) => {
                                console.log(response)
                                if (response.status === 200){
                                    file.fileBox=null;
                                    setTTJ('');
                                    file.fileBox=null
                                    setGetTTJ('');
                                    setSucsessText("TTJ muvofaqiyatli o'zgartirildi")
                                }
                            }).catch((error) => {
                            console.log(error)
                        })
                    }).catch((error) => {
                    console.log(error)
                })
            }
        }
        else {
            axios.post(`${ApiName1}/attach/upload`, allData)
                .then((response) => {
                    TTJ.photoId=response.data[0].id;

                    axios.post(`${ApiName1}/private/admin/dormitory`, TTJ, {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                        .then((response) => {
                            if (response.status === 201){
                                file.fileBox=null;
                                setTTJ('');
                                setGetTTJ('');
                                setSucsessText("TTJ muvofaqiyatli qo'shildi")
                            }
                            console.log(response)
                        }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        GetFakultet();
        notify()
    },[sucsessText]);

    function GetFakultet() {
        axios.get(`${ApiName1}/private/admin/dormitory`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetTTJ(response.data);
            console.log(response.data);

        }).catch((error) => {
            console.log(error.response)
        })
    }

    function Delet() {
        axios.delete(`${ApiName1}/private/admin/dormitory/delete/${TTJId}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setTTJId('');
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
console.log(TTJ)
    return (
        <div>
            <ToastContainer/>
            <label htmlFor='Title'>Rasm</label>
            <input type="file" className='form-control w-25 mb-2'  onChange={(e) => handleInputFile(e)}/>
            <label htmlFor='ttj'>TTJ nomini kiriting</label>
            <input type="text" value={TTJ.name || ''} className='form-control w-25 mb-2'
                   onChange={(e)=>{setTTJ({...TTJ,name:e.target.value})}}/>
            <label htmlFor='cvota'>TTJ umumiy kvotani kiriting</label>
            <input type="text" value={TTJ.count || ''} className='form-control w-25 mb-2'
                   onChange={(e)=>{setTTJ({...TTJ,count:e.target.value})}}/>

            <button className='btn btn-success' onClick={creatTTJ}>yaratish</button>
            <hr/>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>img</th>
                    <th>TTJ name</th>
                    <th>Fakultet kvotalari</th>
                    <th>Qolgan joylar</th>
                    <th>Edit</th>
                    <th>Delet</th>
                </tr>
                </thead>
                <tbody>
                {GetTTJ && GetTTJ.map((item, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td><img src={`${ApiName1}${item.photoUrl}`} style={{width:"100px", height:"100px"}} alt=""/></td>
                        <td>
                            <b>Yotoqxona nomi: </b>{item.name} <br/>
                            <b>Umumiy joylar: </b>{item.actualCount} <br/>
                            <b>Qolgan joylar: </b>{item.leftCount}
                        </td>
                        <td>{item.faculty.map((item, index)=>{
                            return <p key={index}>
                                <b>{item.name}</b> <br/>
                                <b>Umumiy joylar: </b>{item.actualCount} <br/>
                                <b>Qolgan joylar: </b>{item.leftCount}
                            </p>
                        })}</td>
                        <td>{item.leftCount}</td>
                        <td>
                            <button className="btn btn-warning mx-1"
                                    onClick={()=>{setTTJId(item.id);
                                    setTTJ({...TTJ,
                                        name: item.name,
                                        count: item.actualCount,
                                        id: item.id,
                                        photoId: item.photoId,
                                    });setedit(true)}}>
                                <img style={{width:"20px", height:"20px"}}
                                     className='iconEdit' src="/img/editing.png" alt=""/>
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-danger mx-1"
                                    onClick={() => {setTTJId(item.id)}}
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>

                        <div className="modal-body">
                            <b>TTJ</b> ni o'chirmoqchimisiz
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

export default Ttj;