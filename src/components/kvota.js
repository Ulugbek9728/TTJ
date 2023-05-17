import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast, ToastContainer} from "react-toastify";
import {Button, Form, Input} from "antd";
import {PlusOutlined} from '@ant-design/icons';


const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

function Kvota(props) {

    const [sucsessText, setSucsessText] = useState('');
    const [GetTTJ, setGetTTJ] = useState([]);
    const [Getfakultet, setGetFakultet] = useState([]);
    const [fakultetList, setFakultetList] = useState([
        {
            count: 0,
            courses: [
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                }
            ],
            id: 0
        }
    ]);
    const [postFakultet, setPostFakultet] = useState({
        facultyList:[]
    });

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');

    const addFakulty = () => {
        setFakultetList([...fakultetList, {
            count: 0,
            courses: [
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                },
                {
                    count: 0,
                    course: ""
                }
            ],
            id: 0
        }])
    };
    useEffect(() => {
        GetTTJInfo();
        GetFakultet();
        notify()
    },[sucsessText,setMessage2]);

    function GetTTJInfo() {
        axios.get(`${ApiName1}/private/admin/dormitory`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetTTJ(response.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }
    function GetFakultet() {
        axios.post(`${ApiName1}/adm/faculty/faculty_list`, '',{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetFakultet(response.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }

    function addKvota() {
        postFakultet.facultyList=fakultetList;
        axios.post(`${ApiName1}/private/admin/dormitory/faculty/create`, postFakultet,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
            .then((response) => {
                console.log(response);
                setPostFakultet({
                    facultyList:[]
                });
                setFakultetList([
                    {
                        count: 0,
                        courses: [
                            {
                                count: 0,
                                course: ""
                            },
                            {
                                count: 0,
                                course: ""
                            },
                            {
                                count: 0,
                                course: ""
                            },
                            {
                                count: 0,
                                course: ""
                            }
                        ],
                        id: 0
                    }
                ]);
                setSucsessText("Ma'lumotlar qo'shildi")

            }).catch((error) => {
            setMessage2('')
            console.log(error.response);
            if (error.response.status === 400){
                setMessage2(error.response.data)
            }
        })
    }

    function notify() {
        if (message !== ''){message && message.map((item) => (toast.error(item)))}
        if (sucsessText !== ''){toast.success(sucsessText)}
        if (message2 !== ''){toast.error(message2)}
    }
    return (
        <div>
            <ToastContainer/>
            <select className='form-control my-2' style={{width: "30%"}}
                    onChange={(e) => {
                        setPostFakultet({...postFakultet,
                            dormitoryId:e.target.value});

                    }}>>
                <option>Yotoqxona</option>
                {GetTTJ && GetTTJ.map((item, index) => {
                    return <option key={index} value={item.id}>{item.name}</option>
                })}
            </select>

            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{width: "100%"}}
                autoComplete="off">
                <div className="d-flex w-100">
                    {fakultetList.map((item, index) => (
                        <div key={index} style={{width: "28%"}}>
                            <select className='form-control my-2'
                                    onChange={(e) => {fakultetList[index].id = e.target.value}}>>
                                <option>Fakultet</option>
                                {Getfakultet && Getfakultet.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            <label htmlFor="">fakultet kvotasi</label>
                            <input type="text" className='form-control my-2'
                                   onChange={(e) => {fakultetList[index].count = e.target.value}}/>

                            <label htmlFor="">1-kursga ajratilgan kvota</label>
                            <input type="text" className='form-control my-2'
                            onChange={(e) => {
                                fakultetList[index].courses[0].count=e.target.value;
                                fakultetList[index].courses[0].course="COURSE_1";
                            }}/>
                            <label htmlFor="">2-kursga ajratilgan kvota</label>
                            <input type="text" className='form-control my-2'
                                   onChange={(e) => {
                                       fakultetList[index].courses[1].count=e.target.value;
                                       fakultetList[index].courses[1].course="COURSE_2";
                                   }}/>
                            <label htmlFor="">3-kursga ajratilgan kvota</label>
                            <input type="text" className='form-control my-2'
                                   onChange={(e) => {
                                       fakultetList[index].courses[2].count=e.target.value;
                                       fakultetList[index].courses[2].course="COURSE_3";
                                   }}/>
                            <label htmlFor="">4-kursga ajratilgan kvota</label>
                            <input type="text" className='form-control my-2'
                                   onChange={(e) => {
                                       fakultetList[index].courses[3].count=e.target.value;
                                       fakultetList[index].courses[3].course="COURSE_4";
                                   }}/>
                            <hr/>
                        </div>

                    ))}
                </div>
                <Form.Item>
                    <Button type="dashed" block icon={<PlusOutlined/>}
                    onClick={addFakulty}>
                        fakultet qo'shish
                    </Button>
                </Form.Item>


            </Form>

            <div className="d-flex justify-content-center">
                <Button className="signUp" onClick={addKvota}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Kvota;