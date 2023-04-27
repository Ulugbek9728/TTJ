import React, {useEffect, useState} from 'react';
import {Modal,Input, Select,} from 'antd';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"

const { TextArea } = Input;


function News(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [test, setTest] = useState('');

    const [creatNews, setCreatNews] = useState({});
    const [News, setNews] = useState({});

    const [message, setMessage] = useState([]);
    const [message2, setMessage2] = useState('');

    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        const allData = new FormData();


        allData.append(`file`,file.fileBox)

        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {
                creatNews.attachId=response.data[0].id
                console.log(creatNews)
                axios.post(`${ApiName1}/private/admin/news/create`, creatNews, {
                    headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                })
                    .then((response) => {
                        console.log(response)
                    }).catch((error) => {
                    console.log(error)
                })

            }).catch((error) => {
                console.log(error)
        })
        console.log(allData)

    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setCreatNews('');
        setedit(false);
    };

    useEffect(() => {
        notify();
        GetNews();
        setMessage('');
        setMessage2('');
        setSucsessText('')
    },[message, sucsessText, message2]);

    function GetNews() {
        axios.post(`${ApiName1}/public/news`, '').then((response) => {
            console.log(response.data[0].attachId);

            axios.get(`${ApiName1}/attach/open/${response.data[0].attachId}`).then((response)=>{
                // console.log(response.data)
                setTest(response.data)
                }).catch((error)=>{
                console.log(error)
            })


        }).catch((error) => {
           console.log(error)
        })
    }

    function notify() {
        if (message != ''){message && message.map((item) => (toast.error(item)))}
        if (sucsessText != ''){toast.success(sucsessText)}
        if (message2 != ''){toast.error(message2)}
    }

    return (
        <div>
            <ToastContainer/>
            <div className="yuklash">
                <button onClick={showModal} className='btn btn-success '>
                    Yangiliklar qo'shish
                </button>
            </div>
            <Modal className='ticherModal' title={edit ? "Tahrirlash" : "Yangiliklar qo'shish"}
                   open={isModalVisible}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <label htmlFor='Title'>Rasm</label>
                    <Input type="file" onChange={(e) => handleInputFile(e)}/>

                    <label htmlFor='Title'>Title uz</label>
                    <Input id='Familya' value={creatNews.titleUz} allowClear onChange={(e)=>{
                        setCreatNews({...creatNews, titleUz: e.target.value,})}}/>
                    <label htmlFor='Title'>Title ru</label>
                    <Input id='Familya' value={creatNews.titleRu} allowClear onChange={(e)=>{
                        setCreatNews({...creatNews, titleRu: e.target.value,})}}/>
                    <label htmlFor='Title'>Title en</label>
                    <Input id='Familya' value={creatNews.titleEn} allowClear onChange={(e)=>{
                        setCreatNews({...creatNews, titleEn: e.target.value,})}}/>
                    <label htmlFor='Text'>Text uz</label>
                    <TextArea rows="5" value={creatNews.nameUz} name="text"
                              onChange={(e)=>{setCreatNews({...creatNews, nameUz: e.target.value,})}}/>
                    <label htmlFor='Text'>Text ru</label>
                    <TextArea rows="5" value={creatNews.nameRU} name="text"
                              onChange={(e)=>{setCreatNews({...creatNews, nameRU: e.target.value,})}}/>
                    <label htmlFor='Text'>Text en</label>
                    <TextArea rows="5" value={creatNews.nameEn} name="text"
                              onChange={(e)=>{setCreatNews({...creatNews, nameEn: e.target.value,})}}/>

                    </div>
            </Modal>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Familya</th>
                    <th>Ism</th>
                    <th>Sharif</th>
                    <th>Fakultet</th>
                    <th>Login</th>
                    <th>Parol</th>
                </tr>
                </thead>
                <tbody>
                {/*{Dekan && Dekan.map((item, index)=>{*/}
                {/*    return <tr key={index}>*/}
                {/*        <td>{index+1}</td>*/}
                {/*        <td>{item.surname}</td>*/}
                {/*        <td>{item.name}</td>*/}
                {/*        <td>{item.patronymic}</td>*/}
                {/*        <td>{item.faculty}</td>*/}
                {/*        <td>{item.login}</td>*/}
                {/*        <td>{item.password}</td>*/}
                {/*        <td>*/}
                {/*            <button onClick={()=>{*/}
                {/*                showModal();*/}
                {/*                setCreatDecan(item);*/}
                {/*                setedit(true)*/}
                {/*            }} className="btn btn-warning mx-1">*/}
                {/*                <img className='iconEdit' src="/img/editing.png" alt=""/>*/}
                {/*            </button>*/}
                {/*            <button onClick={()=>{setDekanId(item.id)}} className="btn btn-danger mx-1"*/}
                {/*                    data-bs-toggle="modal" data-bs-target="#myModal">*/}
                {/*                <img className='iconEdit' src="/img/delete.png" alt=""/>*/}
                {/*            </button>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*})}*/}


                </tbody>
            </table>
            <img src={test} style={{width:"100px", height:"100px"}} alt=""/>
        </div>
    );
}

export default News;