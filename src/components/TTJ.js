import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";
import {Button, Form, Input} from "antd";


function Ttj(props) {
    const [form] = Form.useForm();
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

    function creatTTJ(values) {
        const allData = new FormData();
        allData.append(`file`, file.fileBox);
        if (edit === true) {

            if (file.fileBox === undefined || null) {
                axios.put(`${ApiName1}/private/admin/dormitory/${TTJ.id}`,
                    {
                        name: values.name,
                        count: values.count,
                        photoId: TTJ.photoId
                    },
                    {
                        headers: {
                            "Authorization":
                                "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            setFile(null);
                            setTTJ('');
                            setGetTTJ([]);
                            setSucsessText("TTJ muvofaqiyatli o'zgartirildi");
                            form.resetFields();
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                axios.post(`${ApiName1}/attach/upload`, allData)
                    .then((response) => {
                        axios.put(`${ApiName1}/private/admin/dormitory/${TTJ.id}`, {
                                name: values.name,
                                count: values.count,
                                photoId: response.data[0].id
                            },
                            {
                                headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                            })
                            .then((response) => {
                                console.log(response)
                                if (response.status === 200) {
                                    file.fileBox = null;
                                    setTTJ('');
                                    file.fileBox = null
                                    setGetTTJ('');
                                    setSucsessText("TTJ muvofaqiyatli o'zgartirildi")
                                    form.resetFields();
                                }
                            }).catch((error) => {
                            console.log(error)
                        })
                    }).catch((error) => {
                    console.log(error)
                })
            }
        } else {
            axios.post(`${ApiName1}/attach/upload`, allData)
                .then((response) => {
                    TTJ.photoId = response.data[0].id;

                    axios.post(`${ApiName1}/private/admin/dormitory`, {
                        name: values.name,
                        count: values.count,
                        photoId: TTJ.photoId
                    }, {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                    })
                        .then((response) => {
                            if (response.status === 201) {
                                file.fileBox = null;
                                setTTJ('');
                                setGetTTJ('');
                                setSucsessText("TTJ muvofaqiyatli qo'shildi")
                                form.resetFields();
                            }
                        }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                console.log(error)
            })
        }
    }
    const onCancel = ()=>{
        setedit(false);
        setTTJ({});
        form.resetFields();
    }
    useEffect(() => {
        GetTTJInfo();
        notify()
    }, [sucsessText]);

    function GetTTJInfo() {
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
        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
    }

    return (
        <div>
            <Form
                form={form}
                fields={[
                    {
                        name: 'name',
                        value: TTJ?.name
                    },
                    {
                        name: 'count',
                        value: TTJ.count
                    }
                ]}
                onFinish={creatTTJ}
                layout="vertical"
            >
                <Form.Item
                    label="Rasm"
                    name="photo"
                    rules={[
                        {
                            required: !edit,
                            message: 'upload photo'
                        }
                    ]}
                >
                    <Input type="file"
                           name="photo"
                           className='form-control w-25 mb-2'
                           onChange={(e) => handleInputFile(e)}/>
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Enter name'
                        }
                    ]}
                    label="TTJ nomini kiriting">
                    <Input type="text"
                           name="name"
                           className='form-control w-25 mb-2'
                           onChange={(e) => {
                               setTTJ({...TTJ, name: e.target.value})
                           }}>
                    </Input>

                </Form.Item>
                <Form.Item
                    name="count"
                    rules={[
                        {
                            required: true,
                            message: 'Enter name'
                        }
                    ]}
                    label="TTJ umumiy kvotani kiriting">
                    <Input type="text" value={TTJ.count || ''}
                           name="count"
                           className='form-control w-25 mb-2'
                           onChange={(e) => {
                               setTTJ({...TTJ, count: e.target.value})
                           }}>

                    </Input>
                </Form.Item>
                <Form.Item>
                    <div className="d-flex justify-content-lg-start">
                        <Button className="btn btn-danger mx-2" onClick={onCancel}>
                            Bekor qilish
                        </Button>

                        <Button htmlType="submit" className="btn btn-success">
                            Yaratish
                        </Button>
                    </div>
                </Form.Item>
            </Form>
            <hr/>

            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>img</th>
                    <th>TTJ name</th>
                    <th>Fakultet kvotalari</th>
                    <th>Kurslar kvotalari</th>
                    <th>Edit</th>
                    <th>Delet</th>
                </tr>
                </thead>
                <tbody>
                {GetTTJ && GetTTJ.map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={`${ApiName1}${item.photoUrl}`} style={{width: "100px", height: "100px"}} alt=""/>
                        </td>
                        <td>
                            <b>Yotoqxona nomi: </b>{item.name} <br/>
                            <b>Umumiy joylar: </b>{item.actualCount} <br/>
                            <b>Qolgan joylar: </b>{item.leftCount}
                        </td>
                        <td colSpan="2">{item.faculty.map((item, index) => {
                            return <div key={index}>
                                <div className='d-flex  w-100'>
                                    <div className="w-50">
                                        <b>{item.name}</b> <br/>
                                        <b>Umumiy joylar: </b>{item.actualCount} <br/>
                                        <b>Qolgan joylar: </b>{item.leftCount}
                                    </div>
                                    <div className="w-50 px-2" style={{borderLeft: "1px solid black"}}>
                                        {item.courses.map((item, index) => {
                                            return <div key={index}>
                                                <b>Kurs </b>{item.name} <br/>
                                                Umumiy joylar: {item.actualCount} <br/>
                                                Qolgan joylar: {item.leftCount}
                                                <hr/>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <hr/>
                            </div>

                        })}</td>
                        <td>
                            <button className="btn btn-warning mx-1"
                                    onClick={() => {
                                        setTTJId(item.id);
                                        setTTJ({
                                            ...TTJ,
                                            name: item.name,
                                            count: item.actualCount,
                                            id: item.id,
                                            photoId: item.photoId,
                                        });
                                        setedit(true)
                                    }}>

                                <img style={{width: "20px", height: "20px"}}
                                     className='iconEdit' src="/img/editing.png" alt=""/>
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-danger mx-1"
                                    onClick={() => {
                                        setTTJId(item.id)
                                    }}
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img style={{width: "20px", height: "20px"}} className='iconEdit' src="/img/delete.png"
                                     alt=""/>
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