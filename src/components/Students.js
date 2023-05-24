import React, {useEffect, useState} from 'react';
import {Modal, Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"
import {useNavigate} from "react-router";

const {Option} = Select;
const { TextArea } = Input;


function Student(props) {
    const navigate = useNavigate();

    const [sucsessText, setSucsessText] = useState('');
    const [Status, setstatus] = useState('');
    const [StatusBulin, setStatusBulin] = useState(true);
    const [Dekan, setDekan] = useState([]);
    const [Students, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState('');
    const [TTJID, setTTJID] = useState('');
    const [StudentFile, setStudentFile] = useState([]);
    const [GetTTJList,  setGetTTJList] = useState([]);
    const [Studentunic, setStudentUnic] = useState({});
    const [FakultyName, setFakultyName] = useState('');
    const [FakultyID, setFakultyID] = useState('');
    const [Kurs, setKurs] = useState('');
    const [Messeg, setMesseg] = useState('');

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');

    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
    };

    useEffect(() => {
        Fakulty();
        if (FakultyName !== '') {
            if(Kurs !==''){
                if(Status!== ''){
                    StudentList()
                }

            }
        }

        getTTJ()
    }, [sucsessText, Kurs, FakultyID,Status]);

    function StudentList() {
        axios.post(`${ApiName1}/private/student/list/${FakultyName} fakulteti/${Kurs}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params:{status:Status}
        }).then((response) => {
            console.log(response.data);
            setStudent(response.data);

        }).catch((error) => {
            console.log(error.response)
        })
    }

    function changeStatus() {

        axios.put(`${ApiName1}/private/student/cancel/${StudentID}`,{message:Messeg}, {
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            }).then((res)=>{
                console.log(res)
            setSucsessText('Talaba arizasi bekor qilindi')
        }).catch((error)=>{
            console.log(error)
        })
    }

    function getTTJ() {
        axios.get(`${ApiName1}/private/admin/dormitory/show/faculty_id/${FakultyID}`,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res)=>{
            setGetTTJList(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    function postStudentTTJ() {
        const allData = new FormData();
        allData.append(`file`,file.fileBox)
        console.log(TTJID)
        console.log(StudentID)
        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                console.log(response);
                axios.post(
                    `${ApiName1}/private/admin/dormitory_join_student/${TTJID}/${StudentID}/${response.data[0]?.id}`,
                    '',{
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                    .then((response) => {
                        console.log(response)
                        if (response.status === 200){
                            file.fileBox=null
                            setSucsessText("Talaba muvofaqiyatli qo'shildi")
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    function seeStudent(e) {
        axios.post(`${ApiName1}/private/student/file/show/${e}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setStudentFile(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function Fakulty() {
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

    function deleteStudent(e) {
        console.log(e)
        axios.delete(`${ApiName1}/private/student/delete/${e}`,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res)=>{
            console.log(res)
            setSucsessText("Talaba arizasi o'chirildi")
        }).catch((error)=>{
            console.log(error)
        })
    }

    function FacultySelect(value,key) {
        setFakultyName(value);
        setFakultyID(key.key)
    }
    function CoursSelect(value,key) {
        setKurs(value)
    }

    function StatusSelect(value,key) {
        setstatus(value)
        if (value==='NOT_ACCEPTED'){
            setStatusBulin(true)
        }
        else {
            setStatusBulin(false)
        }
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
        <div>
            <ToastContainer/>
            <div className='d-flex'>
                <div className="w-25">
                    <label htmlFor="fakultet">Fakultet</label> <br/>
                    <Select className='my-2 w-100' id='fakultet'
                            onChange={FacultySelect}>
                        {Dekan && Dekan.map((item, index) => {
                            return <Option key={item.id} value={item.name}>{item.name}</Option>
                        })}
                    </Select>
                    <br/>
                    <label htmlFor="kurs">Kurs</label> <br/>
                    <Select id='kurs' className='my-2 w-100'
                            onChange={CoursSelect}>
                        <Option value='1-kurs'>1-Kurs</Option>
                        <Option value='2-kurs'>2-Kurs</Option>
                        <Option value='3-kurs'>3-Kurs</Option>
                        <Option value='4-kurs'>4-Kurs</Option>

                    </Select>
                    <label htmlFor="status">Status</label>
                    <Select id='status' className='my-2 w-100'
                            onChange={StatusSelect}>
                        <Option value='IS_ACCEPTED'>Kelib tushgan arizalar</Option>
                        <Option value='NOT_ACCEPTED'>Arizasi bekor qilingan talabalar </Option>

                    </Select>
                </div>
            </div>
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
                            <button className="btn btn-success mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                            onClick={(e)=>{seeStudent(item.id); setStudentUnic(item)}}>
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/view.png" alt=""/>
                            </button>
                            <button className="btn btn-warning mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal1"
                            onClick={(e)=>{setStudentID(item.id)}}>
                                <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                     src="/img/editing.png" alt=""/>
                            </button>
                            {StatusBulin ?
                                <button className="btn btn-danger mx-1"
                                        onClick={()=>{deleteStudent(item.id)}}
                                >
                                    <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                         src="/img/delete.png"
                                         alt=""/>
                                </button>
                                :
                                <button className="btn btn-danger mx-1"
                                        data-bs-toggle="modal" data-bs-target="#myModal2"
                                        onClick={(e)=>{setStudentID(item.id)}}>
                                    <img style={{width: "15px", height: "15px"}} className='iconEdit'
                                         src="/img/close.png"
                                         alt=""/>
                                </button>
                            }

                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <div className="modal" id="myModal">
                <div className="modal-dialog" style={{marginLeft:"15%"}}>
                    <div className="modal-content " style={{width:"50vw"}}>
                        <div className="modal-header">
                            <h4 className="modal-title">Talaba to'liq ma'lumoti</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex  justify-content-between" >

                                <img src={Studentunic.imageUrl} width='20%' height='auto' alt=""/>
                                <div className='w-75'>
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
                            <div className="mt-4 d-flex">
                                <div className="w-50 p-2">
                                    <p className='m-0'>Tel raqami</p>
                                    <b className="">
                                        {Studentunic.phone}
                                    </b>
                                    <hr/>
                                    <p className='m-0'>Fakulteti</p>
                                    <b className="">
                                        {Studentunic.faculty}
                                    </b>
                                    <hr/>
                                    <p className='m-0'>Kurs</p>
                                    <b className="">
                                        {Studentunic.course}
                                    </b>
                                    <hr/>
                                    <p className='m-0'>Yo'nalish</p>
                                    <b className="">
                                        {Studentunic.specialty}
                                    </b>
                                    <hr/>
                                </div>
                                <div className="w-50 p-2">
                                    <h4 className='text-center' style={{marginTop:'13px'}}>
                                        Yuklangan fayllar
                                    </h4>
                                    <hr/>
                                    {StudentFile && StudentFile.map((item, index)=>{
                                        return <div key={index}>
                                            <a href={`${ApiName1}${item.attachUrl}`} target='_blank' className='m-0'>{item.name}</a>
                                            <hr/>
                                        </div>
                                    })}


                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal" id="myModal1">
                <div className="modal-dialog" style={{marginLeft:"15%"}}>
                    <div className="modal-content " style={{width:"50vw"}}>
                        <div className="modal-header">
                            <h4>Talabani Universitet yotoqxonasiga joylashtirish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="TTJ">Yotoqxonani belgilang</label>
                            <select id='TTJ' className='my-2 form-control' style={{width: "100%"}}
                            onChange={(e)=>{setTTJID(e.target.value)}}>
                                <option value="">TTJ ni tanlang</option>
                                {GetTTJList && GetTTJList.map((item, index) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            <label htmlFor="File">PDF faylni yuklang</label> <br/>
                            <input type="file" id='File' accept="application/pdf"
                                   onChange={(e) => handleInputFile(e)}/>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={postStudentTTJ}>yuborish</button>
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal" id="myModal2">
                <div className="modal-dialog" style={{marginLeft:"15%"}}>
                    <div className="modal-content " style={{width:"50vw"}}>
                        <div className="modal-header">
                            <h4>Talabani Universitet yotoqxonasiga joylashtirish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="Message">Bekor qilish sababini yozing</label>
                            <TextArea rows="5" name="text"
                                      onChange={(e)=>{setMesseg(e.target.value)}}/>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={changeStatus}>yuborish</button>
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Student;