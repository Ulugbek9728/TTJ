import React, {useEffect, useState} from 'react';
import {Alert, Button, Modal, Pagination, Select, Space, Spin} from "antd";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {exportToCSVStudentDormitory} from "../utils/ExcelCreator";
import {useTranslation} from "react-i18next";


const {Option} = Select;

function TtjStudents(props) {

    const {t} = useTranslation();

    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [message2, setMessage2] = useState('');
    const [message, setMessage] = useState([]);

    const [FakultyName, setFakultyName] = useState('');
    const [Kurs, setKurs] = useState(null);
    const [Faculty, setFaculty] = useState([]);
    const [FakultyID, setFakultyID] = useState('');
    const [GetTTJList, setGetTTJList] = useState([]);
    const [TTJID, setTTJID] = useState(null);
    const [TTJID2, setTTJID2] = useState('');
    const [Students, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState('');
    const [Studentunic, setStudentUnic] = useState({});
    const [StudentunicFile, setStudentUnicFile] = useState('');
    const [StudentunicFile2, setStudentUnicFile2] = useState('');
    const [StudentFile, setStudentFile] = useState([]);
    const [StudentStatus, setStudenStatus] = useState('JOINED');
    const [StudentJOINED, setStudentJOINED] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSizes, setPageSize] = useState(20);
    const [loading, setLoading] = useState(false);
    const [sabab, setSabab] = useState([
        {name: 'Iqtidorli talabalar (xalqaro, respublika, hudud va universitet miqyosida %0D%0A        o‘tkazilgan fan olimpiadalari va sport musobaqalari, ko‘rik-tanlovlar g‘oliblari, %0D%0A        ma’naviy-ma’rifiy va sport tadbirlarida faol ishtirok etgan)'},
        {name: "Chin yetim yoki yetim talabalar"},
        {name: "Temir daftar”, “Ayollar daftari”, “Yoshlar daftari” %0D%0A            ro‘yxatiga kiritilgan, ijtimoiy himoyaga o‘ta muhtoj oila farzandlari"},
        {name: "Talabalar turar joyida o‘tgan o‘quv yillarida namunali faoliyat yuritgan talabalar%0A         kengashi raisi va qavat sardorlari"},
        {name: "Nogironlgi bo‘lgan talabalar"},
        {name: "Otasi (boquvchisi) nogiron talabalar"},
        {name: "Oilada ikki va undan ortiq farzandlari kunduzgi %0D%0A            ta’limda shartnoma asosida o‘qiydigan oila farzandlari"},
        {name: "Chet eldan kelib o‘qiydigan xorijiy talabalar"},
        {name: "Respublikaning olis hududlaridan kelgan talabalar"},
        {name: "Yozgi ta’til vaqtida “Bunyodkor yoshlar mehnat otryadi”da faol ishtirok etgan talabalar"},
        {name: "Universitet Yoshlar ittifoqi kengashi raisining tavsiyanomasiga%0D%0A         asosan universitet yoshlar Kengashi a’zolari"},
        {name: "Boquvchisini yo‘qotgan (otasi) talabalar"},
    ]);
    const [sababChange, setSababChange] = useState(null);
    const [cityFull, setCityFull] = useState([
        {
            "code": "1703",
            "name": "Andijon viloyati",
            "_parent": "1703"
        },
        {
            "code": "1706",
            "name": "Buxoro viloyati",
            "_parent": "1706"
        },
        {
            "code": "1708",
            "name": "Jizzax viloyati",
            "_parent": "1708"
        },
        {
            "code": "1710",
            "name": "Qashqadaryo viloyati",
            "_parent": "1710"
        },
        {
            "code": "1712",
            "name": "Navoiy viloyati",
            "_parent": "1712"
        },
        {
            "code": "1714",
            "name": "Namangan viloyati",
            "_parent": "1714"
        },
        {
            "code": "1718",
            "name": "Samarqand viloyati",
            "_parent": "1718"
        },
        {
            "code": "1722",
            "name": "Surxondaryo viloyati",
            "_parent": "1722"
        },
        {
            "code": "1724",
            "name": "Sirdaryo viloyati",
            "_parent": "1724"
        },
        {
            "code": "1727",
            "name": "Toshkent viloyati",
            "_parent": "1727"
        },
        {
            "code": "1730",
            "name": "Farg‘ona viloyati",
            "_parent": "1730"
        },
        {
            "code": "1733",
            "name": "Xorazm viloyati",
            "_parent": "1733"
        },
        {
            "code": "1735",
            "name": "Qoraqalpog‘iston Resp.",
            "_parent": "1735"
        },
        {
            "code": "1726",
            "name": "Toshkent shahri",
            "_parent": "1726"
        }
    ]);
    const [city, setCity] = useState(null);


    const [RectorBulin, setRectorBulin] = useState(true);
    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const lang = localStorage.getItem('i18nextLng');

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setLoading(true);
        const allData = new FormData();
        allData.append(`file`, file.fileBox);
        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                axios.put(`${ApiName1}/admin/dormitory_student/change_status/${StudentID}/${
                    StudentJOINED ? 'REMOVED' : 'JOINED'}/${response.data[0].id}`, '', {
                    headers: {"Authorization": "Bearer " + localStorage.getItem("token")}

                }).then((res) => {
                    setLoading(false);
                    setIsModalVisible(false);
                    document.getElementById('File').value = '';
                    setSucsessText("Talaba qora ro'yxatga tushdi");
                    setStudentID('')
                }).catch((error) => {
                    console.log(error)
                    setLoading(false);
                    setMessage2(error.response.data)
                })
            }).catch((error) => {
            console.log(error)
        })

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (localStorage.getItem("degree") !== 'RECTOR') {
            setRectorBulin(false)
        } else {
            setRectorBulin(true)
        }
        Fakulty();
        StudentList()
        if (FakultyName !== '') {
            getTTJ();
        }
    }, [sucsessText, Kurs, FakultyID, TTJID, TTJID2, StudentStatus, page, pageSizes, sababChange, city]);

    function Fakulty() {
        axios.post(`${ApiName1}/adm/faculty/faculty_list`, '', {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setFaculty(response.data);

        }).catch((error) => {
            if (error.response.status === 502) {
                setMessage2('Server bilan ulanishda xatolik')
            }
            if (error.response.status === 401) {
                navigate("/")
            }
        })
    }

    function getTTJ() {
        axios.get(`${ApiName1}/private/admin/dormitory/show/faculty_id/${FakultyID}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setGetTTJList(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function StudentList() {
        axios.post(`${ApiName1}/admin/dormitory_student`, {
            course: Kurs,
            dormitory_id: TTJID,
            reason: sababChange,
            city: city,
            faculty_id: FakultyID,
            status: StudentStatus
        }, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params: {page: (page - 1), size: pageSizes}
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
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function deleteStudent() {
        axios.delete(`${ApiName1}/private/dormitory_student/${StudentID}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res)
            setSucsessText("Talaba TTJ dan o'chirildi")
        }).catch((error) => {
            console.log(error)
        })
    }

    function FacultySelect(value, key) {
        setFakultyName(value);
        setFakultyID(key.key)
    }

    function TTJSelect(value, key) {
        setTTJID(value);
    }

    function CoursSelect(value, key) {
        setKurs(value)
    }

    function StatusSelect(value, key) {
        setStudenStatus(value);
        if (value === 'REMOVED') {
            setStudentJOINED(false)
        } else setStudentJOINED(true)
    }

    useEffect(() => {
        notify();
        setMessage('');
        setMessage2('');
        setSucsessText('');
        // setStudentID('')
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

    function postStudentTTJ() {
        setLoading(true)
        const allData = new FormData();
        allData.append(`file`, file.fileBox)
        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                axios.put(`${ApiName1}/admin/transfer/${StudentID}`,
                    {
                        dormitoryId: TTJID2,
                        fileId: response.data[0]?.id
                    }, {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                    })
                    .then((response) => {
                        setLoading(false)
                        if (response.status === 200) {
                            file.fileBox = null
                            setSucsessText("Talaba muvofaqiyatli o'zgardi");
                            document.getElementById('File').value = ''
                            setTTJID2('')
                        }
                    }).catch((error) => {
                    setLoading(false)
                    console.log(error.response.data)
                    if (error.response.data.status === 400) {
                        setMessage(error.response.data.errors)
                    }
                    setMessage2(error.response.data)
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    const exportExcel = () => {

        axios.post(`${ApiName1}/admin/dormitory_student/all`, {
            course: Kurs?.length > 0 ? Kurs : null,
            reason: sababChange,
            city: city,
            dormitory_id: TTJID,
            faculty_id: FakultyID,
            status: StudentStatus
        }, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
            exportToCSVStudentDormitory([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                    {
                        name: t(`reasons.${item}`),
                        key: t(`reasons.${item}`, {lng: 'uz'}),
                    }))
                , response.data, 'students')
        })

    };

    const pageShow = (curent, pageSize) => {
        setPageSize(pageSize)
    }

    return (
        <div>
            <div className="w-100 d-flex">
                <div className="w-25">
                    <label htmlFor="fakultet">Fakultet</label> <br/>
                    <Select className='my-2 w-100' id='fakultet'
                            onChange={FacultySelect}>
                        {Faculty && Faculty.map((item, index) => {
                            return <Option key={item.id} value={item.name}>{item.name}</Option>
                        })}
                    </Select>
                    <br/>
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
                    </Select>
                    <br/>
                </div>
                <div className="w-25 mx-4">
                    <label htmlFor="status">TTJ dan o'chirilgan yoki qabul qilingan talabalar</label>
                    <Select id='status' className='my-2 w-100'
                            onChange={StatusSelect}>
                        <Option value='REMOVED'>Ichki tartibni buzgan talabalar</Option>
                        <Option value='JOINED'>Qabul qilingan talabalar </Option>
                    </Select>

                    <label htmlFor="sabab">Sabab turi</label>
                    <Select
                        showSearch className="w-100 my-2" id='sabab'
                        onChange={(e) => {
                            setSababChange(e)
                        }}
                        placeholder="Sabablar"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label?.toLowerCase() ?? '').startsWith(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={sabab && sabab.map((item, index) => (
                            {value: item.name, label: item?.name}))}
                    />
                    <label htmlFor="sabab">Viloyat kesimi</label>
                    <Select
                        showSearch className="w-100 my-2" id='sabab'
                        onChange={(e) => {
                            setCity(e)
                        }}
                        placeholder="Viloyat"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label?.toLowerCase() ?? '').startsWith(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={cityFull && cityFull.map((item, index) => (
                            {value: item.name, label: item?.name}))}
                    />
                </div>
            </div>

            <Button className="btn btn-success p-1" onClick={exportExcel}>
                Ma'lumotlarini yuklab olish
            </Button>
            <br/>
            <br/>
            <Modal className='ticherModal' title={"Talabani qora ro'yxatga qo'shish"} open={isModalVisible}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <label htmlFor='Title'>File (pdf)</label><br/>
                    <input type="file" id='File' accept='application/pdf' onChange={(e) => handleInputFile(e)}/>
                </div>
                {loading ?
                    <Space direction="vertical" style={{width: '100%',}}>
                        <Spin tip="Loading...">
                            <Alert message="Ma'lumot yuklanmoqda" description="Iltimos kutib turing"
                                   type="info"/>
                        </Spin>
                    </Space>
                    :
                    ''
                }
            </Modal>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>F.I.Sh</th>
                    <th>Fakultet</th>
                    <th>Kurs</th>
                    <th>Tel</th>
                    <th/>
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
                        <td className='d-flex'>
                            <button className="btn btn-success mx-1"
                                    data-bs-toggle="modal" data-bs-target="#myModal"
                                    onClick={(e) => {
                                        seeStudent(item.student.id);
                                        setStudentUnic(item.student);
                                        setStudentUnicFile(item.removedFileUrl);
                                        setStudentUnicFile2(item.fileOpenUrl);
                                    }}>
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/view.png" alt=""/>
                            </button>
                            {RectorBulin ?
                                ''
                                :
                                <div className='d-flex'>
                                    {
                                        StudentJOINED ?
                                            <div className="d-flex">
                                                <button className="btn btn-danger mx-1"
                                                        onClick={(e) => {
                                                            showModal();
                                                            setStudentID(item.id)
                                                        }}>
                                                    <img style={{width: "15px", height: "15px"}} className='iconEdit'
                                                         src="/img/close.png"
                                                         alt=""/>
                                                </button>
                                                <button className="btn btn-warning mx-1"
                                                        data-bs-toggle="modal" data-bs-target="#myModal1"
                                                        onClick={(e) => {
                                                            setStudentID(item.id)
                                                            setTTJID2('')
                                                            document.getElementById('File').value = ''
                                                            file.fileBox = null
                                                        }}>
                                                    <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                                         src="/img/editing.png" alt=""/>
                                                </button>
                                            </div>
                                            :
                                            ''
                                    }
                                    <button className="btn btn-danger mx-1"
                                            data-bs-toggle="modal" data-bs-target="#myModal2"
                                            onClick={() => {
                                                setStudentID(item.id)
                                            }}>
                                        <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                             src="/img/delete.png"
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
                current={page} total={totalPage} pageSize={pageSizes}
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
                                    Studentunic.imageUrl
                                    :
                                    ApiName1 + Studentunic?.imageUrl} width='20%' height='auto' alt=""/>
                                <div className='w-75'>
                                    <p className='m-0'>F.I.SH</p>
                                    <b className="">{Studentunic?.name}</b>
                                    <hr/>
                                    <p className='m-0'>Login</p>
                                    <b className="">{Studentunic?.login}</b>
                                    <hr/>
                                    <p className='m-0'>Jinsi</p>
                                    <b className="">
                                        {Studentunic?.gender}
                                    </b>
                                    <hr/>
                                    <p className='m-0'>Yashash manzili</p>
                                    <b className="">
                                        {Studentunic?.country} / {Studentunic?.city} / {Studentunic?.district}
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
                                        {Studentunic?.specialty}
                                    </b>
                                    <hr/>
                                    <p className='m-0'>Guruhi</p>
                                    <b className="">
                                        {Studentunic?.group}
                                    </b>
                                    <hr/>
                                </div>
                                <div className="w-50 p-2">
                                    <h4 className='text-center' style={{marginTop: '13px'}}>
                                        Talaba yuklagan fayllari
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
                            <hr/>
                            {StudentJOINED ?
                                <a href={`${ApiName1}${StudentunicFile2}`} target='_blank'
                                   className='m-0'>TTJ ga qabul file</a>
                                :
                                <a href={`${ApiName1}${StudentunicFile}`} target='_blank'
                                   className='m-0'>TTJ dan chetlashtirish sababi</a>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal fade" id="myModal1">
                <div className="modal-dialog" style={{marginLeft: "15%"}}>
                    <div className="modal-content " style={{width: "50vw"}}>
                        <div className="modal-header">
                            <h4>Talabani Universitet yotoqxonasini o'zgartirish</h4>
                            <button type="button" className="btn-close" disabled={loading} data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="TTJ">Yotoqxonani belgilang</label>
                            <select id='TTJ' className='my-2 form-control' value={TTJID2} style={{width: "100%"}}
                                    onChange={(e) => {
                                        setTTJID2(e.target.value)
                                    }}>
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
                            {loading ?
                                <Space direction="vertical" style={{width: '100%',}}>
                                    <Spin tip="Loading...">
                                        <Alert
                                            message="Ma'lumot yuklanmoqda"
                                            description="Iltimos kutib turing"
                                            type="info"
                                        />
                                    </Spin>
                                </Space>
                                :
                                ''
                            }

                            <button className='btn btn-success' disabled={loading}
                                    onClick={postStudentTTJ}>Yuborish
                            </button>
                            <button type="button" className="btn btn-danger" disabled={loading}
                                    data-bs-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal fade" id="myModal2">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Tasdiqlash oynasi </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                        </div>

                        <div className="modal-body">
                            <b>Talaba</b> ni o'chirmoqchimisiz
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={deleteStudent}>
                                <img style={{width: "20px", height: "20px"}} src="/img/delete.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TtjStudents;