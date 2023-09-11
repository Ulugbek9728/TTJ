import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {Button, Input, Pagination, Select} from "antd";
import {exportToCSVAriza} from "../utils/ExcelCreator";
import {useTranslation} from "react-i18next";

const {Option} = Select;
const {TextArea} = Input;

function StudentListDekan(props) {
    const {t} = useTranslation();

    const [sucsessText, setSucsessText] = useState('');
    const [Status, setstatus] = useState('');
    const [StatusBulin, setStatusBulin] = useState(true);
    const [Students, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState('');
    const [TTJID, setTTJID] = useState('');
    const [StudentFile, setStudentFile] = useState([]);
    const [GetTTJList, setGetTTJList] = useState([]);
    const [Studentunic, setStudentUnic] = useState({});
    const [FakultyName, setFakultyName] = useState('');
    const [Kurs, setKurs] = useState('');
    const [Messeg, setMesseg] = useState('');

    const [page, setPage] = useState(1);
    const [pageSizes, setPageSize] = useState(20);
    const [totalPage, setTotalPage] = useState(0);
    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');

    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
    };

    useEffect(() => {
        setFakultyName(localStorage.getItem("faculty"));
        getTTJ();
        if (Kurs !== '') {
            if (Status !== '') {
                StudentList()
            }

        }
    }, [sucsessText, Kurs, Status, page,pageSizes]);


    function StudentList() {
        axios.post(`${ApiName1}/private/student/list/${FakultyName}/${Kurs}`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params: {status: Status, page: (page - 1), size: pageSizes}
        }).then((response) => {
            setStudent(response.data.content);
            setTotalPage(response.data.totalElements)

        }).catch((error) => {
            console.log(error.response)
        })
    }

    function changeStatus() {

        axios.put(`${ApiName1}/private/student/cancel/${StudentID}`, {message: Messeg}, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        }).then((res) => {
            setSucsessText('Talaba arizasi bekor qilindi')
        }).catch((error) => {
            console.log(error)
        })
    }

    function getTTJ() {
        axios.get(`${ApiName1}/private/dekan/show/dormitories`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setGetTTJList(res.data)
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function postStudentTTJ() {
        const allData = new FormData();
        allData.append(`file`, file.fileBox)
        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                axios.post(
                    `${ApiName1}/private/admin/dormitory_join_student/${TTJID}/${StudentID}/${response.data[0]?.id}`,
                    '', {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            file.fileBox = null
                            setSucsessText("Talaba muvofaqiyatli qo'shildi")
                        }
                    }).catch((error) => {
                    console.log(error.response.data)
                    setMessage2(error.response.data)
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
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function deleteStudent(e) {
        console.log(e)
        axios.delete(`${ApiName1}/private/student/delete/${e}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res)
            setSucsessText("Talaba arizasi o'chirildi")
        }).catch((error) => {
            console.log(error)
        })
    }

    function CoursSelect(value, key) {
        setKurs(value)
    }

    function StatusSelect(value, key) {
        setstatus(value)
        if (value === 'NOT_ACCEPTED') {
            setStatusBulin(true)
        } else {
            setStatusBulin(false)
        }
    }

    useEffect(() => {
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('');
        setMesseg('')
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

    const exportExcel = () => {
        axios.get(`${ApiName1}/private/student`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params: {
                course: Kurs,
                faculty_id: localStorage.getItem('faculty_ID'),
                status: Status
            }
        }).then((response) => {
            exportToCSVAriza([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    .map((item) => (
                        {
                            name: t(`reasons.${item}`),
                            key: t(`reasons.${item}`, {lng: 'uz'}),
                        }))
                , response.data, 'students');
        })
    }
    const pageShow =(curent, pageSize)=>{
        setPageSize(pageSize)
    }

    return (
        <div>
            <div className='d-flex'>
                <div className="w-25">
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
            <Button
                className="btn btn-success p-1"
                onClick={exportExcel}>
                Ma'lumotlarini yuklab olish
            </Button>
            <br/>
            <br/>
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
                        <td className='d-flex'>
                            <button className="btn btn-success mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                                    onClick={(e) => {
                                        seeStudent(item.id);
                                        setStudentUnic(item)
                                    }}>
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/view.png" alt=""/>
                            </button>
                            {!StatusBulin &&
                                <div>
                                    <button className="btn btn-warning mx-1"
                                            data-bs-toggle="modal" data-bs-target="#myModal1"
                                            onClick={(e) => {
                                                setStudentID(item.id)
                                            }}>
                                        <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                             src="/img/editing.png" alt=""/>
                                    </button>
                                    <button className="btn btn-danger mx-1"
                                            data-bs-toggle="modal" data-bs-target="#myModal2"
                                            onClick={(e) => {
                                                setStudentID(item.id)
                                            }}>
                                        <img style={{width: "15px", height: "15px"}} className='iconEdit'
                                             src="/img/close.png"
                                             alt=""/>
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                })}
                </tbody>
            </table>

            <Pagination
                current={page}
                total={totalPage}
                pageSize={pageSizes}
                onChange={(e) => {
                    setPage(e)
                }}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={pageShow}
            />

            <div className="modal fade" id="myModal">
                <div className="modal-dialog" style={{marginLeft: "15%"}}>
                    <div className="modal-content " style={{width: "50vw"}}>
                        <div className="modal-header">
                            <h4 className="modal-title">Talaba to'liq ma'lumoti</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex  justify-content-between">

                                <img src={Studentunic.imageUrl?.startsWith("https") ?
                                    Studentunic.imageUrl :
                                    ApiName1 + Studentunic.imageUrl} width='20%' height='auto' alt=""/>
                                <div className='w-75'>
                                    <p className='m-0'>F.I.SH</p>
                                    <b className="">{Studentunic.name}</b>
                                    <hr/>
                                    <p className='m-0'>Login</p>
                                    <b className="">
                                        {Studentunic?.login}
                                    </b>
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
                                    <h4 className='text-center' style={{marginTop: '13px'}}>
                                        Yuklangan fayllar
                                    </h4>
                                    <hr/>
                                    {StudentFile && StudentFile.map((item, index) => {
                                        return <div key={index}>
                                            <a href={`${ApiName1}${item.attachUrl}`} target='_blank'
                                               className='m-0'>{item.name}</a>
                                            <hr/>
                                        </div>
                                    })}


                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal" id="myModal1">
                <div className="modal-dialog" style={{marginLeft: "15%"}}>
                    <div className="modal-content " style={{width: "50vw"}}>
                        <div className="modal-header">
                            <h4>Talabani Universitet yotoqxonasiga joylashtirish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="TTJ">Yotoqxonani belgilang</label>
                            <select id='TTJ' className='my-2 form-control' style={{width: "100%"}}
                                    onChange={(e) => {
                                        setTTJID(e.target.value)
                                    }}>
                                <option value="">TTJ ni tanlang</option>
                                {GetTTJList && GetTTJList.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            <label htmlFor="File">PDF faylni yuklang</label> <br/>
                            <input type="file" id='File' accept="application/pdf"
                                   onChange={(e) => handleInputFile(e)}/>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={postStudentTTJ}>yuborish</button>
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal" id="myModal2">
                <div className="modal-dialog" style={{marginLeft: "15%"}}>
                    <div className="modal-content " style={{width: "50vw"}}>
                        <div className="modal-header">
                            <h4>Talabani Universitet yotoqxonasiga qabulni bekor qilish</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="Message">Bekor qilish sababini yozing</label>
                            <TextArea rows="5" name="text" value={Messeg}
                                      onChange={(e) => {
                                          setMesseg(e.target.value)
                                      }}/>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success' onClick={changeStatus}>Yuborish</button>
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StudentListDekan;