import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast, ToastContainer} from "react-toastify";
import {Pagination, Select} from "antd";


const {Option} = Select;
function TtjStudentListDekan(props) {

    const [sucsessText, setSucsessText] = useState('');
    const [message2, setMessage2] = useState('');
    const [message, setMessage] = useState([]);

    const [Kurs, setKurs] = useState('');
    const [GetTTJList, setGetTTJList] = useState([]);
    const [TTJID, setTTJID] = useState('');
    const [Students, setStudent] = useState([]);
    const [Studentunic, setStudentUnic] = useState({});
    const [currentItem, setCurrentItem] = useState({});
    const [StudentFile, setStudentFile] = useState([]);
    const [StudentStatus, setStudenStatus] = useState('JOINED');
    const [StudentJOINED, setStudentJOINED] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSizes, setPageSize] = useState(20);
    const [StudentunicFile, setStudentUnicFile] = useState('');



    useEffect(() => {

            getTTJ();
            if (Kurs !== '') {
                StudentList()
            }
    }, [sucsessText, Kurs, TTJID, StudentStatus]);


    function getTTJ() {
        axios.get(`${ApiName1}/private/dekan/show/dormitories`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setGetTTJList(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function StudentList() {
        axios.post(`${ApiName1}/dekan/dormitory_student`, {
            course: Kurs,
            dormitory_id: TTJID,
            status:StudentStatus
        }, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params:{page:(page-1),size:pageSizes}
        }).then((response) => {
            setStudent(response.data.content);
            setTotalPage(response.data.totalElements)

        }).catch((error) => {
            console.log(error.response)
        })
    }

    function seeStudent(e) {
        axios.post(`${ApiName1}/private/student/file/show/${e}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setStudentFile(response.data);
            console.log(response);
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function TTJSelect(value, key) {
        setTTJID(value);
    }
    function CoursSelect(value, key) {
        setKurs(value)
    }
    function StatusSelect(value,key) {
        setStudenStatus(value);
        if (value==='REMOVED'){
            setStudentJOINED(false)
        }
        else setStudentJOINED(true)
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

    console.log(Studentunic)
    return (
        <div>
            <ToastContainer/>
            <div className="w-100 d-flex">
                <div className="w-25">
                    <label htmlFor="TTJ">Yotoqxona</label>
                    <Select id='TTJ' className='my-2' style={{width: "100%"}}
                            onChange={TTJSelect}>
                        {GetTTJList && GetTTJList.map((item, index) => {
                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                        })}
                    </Select> <br/>
                    <label htmlFor="kurs">Kurs</label> <br/>
                    <Select id='kurs' className='my-2 w-100'
                            onChange={CoursSelect}>
                        <Option value='COURSE_1'>1-Kurs</Option>
                        <Option value='COURSE_2'>2-Kurs</Option>
                        <Option value='COURSE_3'>3-Kurs</Option>
                        <Option value='COURSE_4'>4-Kurs</Option>

                    </Select> <br/>
                </div>
                <div className="w-25 mx-4">
                    <label htmlFor="status">TTJ dan o'chirilgan yoki qabul qilingan talabalar</label>
                    <Select id='status' className='my-2 w-100'
                            onChange={StatusSelect}>
                        <Option value='REMOVED'>Ichki tartibni buzgan talabalar</Option>
                        <Option value='JOINED'>Qabul qilingan talabalar </Option>
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
                        <td>{item.student.name}</td>
                        <td>{item.student.faculty}</td>
                        <td>{item.student.course}</td>
                        <td>{item.student.phone}</td>
                        <td>
                            <button className="btn btn-success mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                                    onClick={(e)=>{
                                        seeStudent(item.student.id);
                                        setStudentUnic(item.student);
                                        setCurrentItem(item);
                                        setStudentUnicFile(item.fileOpenUrl)
                                    }}>
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/view.png" alt=""/>
                            </button>

                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <Pagination
                current={page}
                total={totalPage}
                pageSize={pageSizes}
                onChange={(e)=>{setPage(e)}}
                showQuickJumper
            />

            <div className="modal fade" id="myModal">
                <div className="modal-dialog" style={{marginLeft:"15%"}}>
                    <div className="modal-content " style={{width:"50vw"}}>
                        <div className="modal-header">
                            <h4 className="modal-title">Talaba to'liq ma'lumoti</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex  justify-content-between" >

                                <img src={Studentunic.imageUrl?.startsWith("https") ?
                                    Studentunic.imageUrl :
                                    ApiName1 + Studentunic.imageUrl} width='20%' height='auto' alt=""/>
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
                                        Talaba yuklagan fayllari
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
                            {
                                currentItem?.studentStatus === 'REMOVED'
                                ?
                                <>
                                    <hr/>
                                    <a href={`${ApiName1}${currentItem?.removedFileUrl}`} target='_blank'
                                       className='m-0'>TTJ dan chetlashtirish sababi</a>
                                </>: null
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TtjStudentListDekan;