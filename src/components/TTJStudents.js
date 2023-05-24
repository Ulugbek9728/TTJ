import React, {useEffect, useState} from 'react';
import {Input, Select} from "antd";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {useNavigate} from "react-router";


const {Option} = Select;

function TtjStudents(props) {

    const navigate = useNavigate();
    const [sucsessText, setSucsessText] = useState('');
    const [message2, setMessage2] = useState('');
    const [FakultyName, setFakultyName] = useState('');
    const [Kurs, setKurs] = useState('');
    const [Faculty, setFaculty] = useState([]);
    const [FakultyID, setFakultyID] = useState('');
    const [GetTTJList, setGetTTJList] = useState([]);
    const [TTJID, setTTJID] = useState('');
    const [Students, setStudent] = useState([]);


    useEffect(() => {
        Fakulty();
        if (FakultyName !== '') {
            getTTJ();
            if (Kurs !== '') {
                StudentList()
            }
        }
    }, [sucsessText, Kurs, FakultyID, TTJID]);

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
            faculty_id: FakultyID
        }, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        }).then((response) => {
            console.log(response.data.content);
            setStudent(response.data.content);

        }).catch((error) => {
            console.log(error.response)
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

    return (
        <div>
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

                </Select> <br/>

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
                            <button className="btn btn-success mx-1">
                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/view.png" alt=""/>
                            </button>

                            <button className="btn btn-danger mx-1">
                                <img style={{width: "20px", height: "20px"}} className='iconEdit'
                                     src="/img/delete.png" alt=""/>
                            </button>

                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TtjStudents;