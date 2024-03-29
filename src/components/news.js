import React, {useEffect, useState} from 'react';
import {Modal, Input, Pagination,} from 'antd';
import axios from "axios";
import {toast} from "react-toastify";

import {ApiName1} from "../APIname1";
import "../asset/Admin.scss"

const { TextArea } = Input;


function News(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);
    const [sucsessText, setSucsessText] = useState('');
    const [NewsId, setNewsId] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSizes, setPageSize] = useState(20);


    const [creatNews, setCreatNews] = useState({
        titleUz:'',
        titleRu:'',
        titleEn:'',
        nameUz:'',
        nameRu:'',
        nameEn:'',

    });
    const [NewsGroup, setNews] = useState([]);
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
        allData.append(`file`,file?.fileBox);
        if (edit === true){

            if (file?.fileBox===undefined || null){
                axios.post(`${ApiName1}/private/admin/news/update/${creatNews.id}`, creatNews,{
                    headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                    .then((response) => {
                        if (response.status === 200){
                            setIsModalVisible(false);
                            setFile(null);
                            setCreatNews('');
                            setPage(1);
                            setNews([]);
                            setSucsessText("Yangilik muvofaqiyatli o'zgartirildi")
                        }
                    }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                axios.post(`${ApiName1}/attach/upload`, allData)
                    .then((response) => {
                        creatNews.attachId=response.data[0].id;
                        axios.post(`${ApiName1}/private/admin/news/update/${creatNews.id}`,
                            creatNews,{
                            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                            .then((response) => {
                                if (response.status === 200){
                                    document.getElementById('Filee').value = '';
                                    setIsModalVisible(false);
                                    file.fileBox=null;
                                    setPage(1);
                                    setCreatNews('');
                                    setNews('');
                                    setSucsessText("Yangilik muvofaqiyatli o'zgartirildi")
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
                    creatNews.attachId=response.data[0].id;
                    axios.post(`${ApiName1}/private/admin/news/create`, creatNews, {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                        .then((response) => {
                            if (response.status === 201){
                                document.getElementById('Filee').value = '';
                                setIsModalVisible(false);
                                file.fileBox=null;
                                setPage(1);
                                setCreatNews('');
                                setNews('');
                                setSucsessText("Yangilik muvofaqiyatli qo'shildi");
                                console.log(file)
                            }
                            console.log(response)
                        }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                console.log(error)
            })
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);setCreatNews('');setedit(false);
    };

    useEffect(() => {
        GetNews();
        notify();
        setSucsessText('')
    },[ sucsessText,page]);

    function GetNews() {
        axios.post(`${ApiName1}/public/news`, '',{params:{page:(page-1),size:pageSizes}})
            .then((response) => {
                setNews(response.data.content);
                setTotalPage(response.data.totalElements)
            }).catch((error) => {
            console.log(error)
        })
    }
    function Delet() {
        axios.delete(`${ApiName1}/private/admin/news/delete/${NewsId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200){
                setNews([])
                setSucsessText("Ma'lumotlar o'chirildi");
            }
        }).catch((error) => {
            console.log(error.response)
        });
    }

    function notify() {
        if (sucsessText !== ''){
            toast.success(sucsessText)

        }
    }

    return (
        <div>
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
                    <input className='form-control' type="file" id='Filee' onChange={(e) => handleInputFile(e)}/>

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
                    <TextArea rows="5" value={creatNews.nameRu} name="text"
                              onChange={(e)=>{setCreatNews({...creatNews, nameRu: e.target.value,})}}/>
                    <label htmlFor='Text'>Text en</label>
                    <TextArea rows="5" value={creatNews.nameEn} name="text"
                              onChange={(e)=>{setCreatNews({...creatNews, nameEn: e.target.value,})}}/>

                    </div>
            </Modal>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Img</th>
                    <th>Fakultet</th>
                </tr>
                </thead>
                <tbody>
                {NewsGroup && NewsGroup.map((item, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.titleUz}</td>
                        <td>{item.nameUz}</td>
                        <td>
                            <img src={`${ApiName1}${item.imageUrl}`} style={{width:"100px", height:"100px"}} alt=""/>
                        </td>
                        <td>
                            <button onClick={()=>{showModal();setCreatNews(item);setedit(true)}}
                                    className="btn btn-warning mx-1">
                                <img className='iconEdit' src="/img/editing.png" alt=""
                                     style={{width:"25px", height:"25px"}}/>
                            </button>
                            <button className="btn btn-danger mx-1"
                                    onClick={()=>{setNewsId(item.id)}}
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img className='iconEdit' src="/img/delete.png" alt=""
                                     style={{width:"25px", height:"25px"}}/>
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
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Tasdiqlash oynasi </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <b>Yangilik</b> ni o'chirmoqchimisiz
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={Delet}>
                                <img style={{width:"20px", height:"20px"}} src="/img/delete.png" alt=""/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default News;