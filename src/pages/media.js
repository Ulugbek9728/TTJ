import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast, ToastContainer} from "react-toastify";
import {Input, Modal} from "antd";

function Media(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState(false);

    const [Media, setMedia] = useState([]);
    const [creatMedia, setCreatMedia] = useState('');

    const [MediaId, setMediaId] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [attachId, setAttachId] = useState('');
    const [file, setFile] = useState([{
        fileBox: null
    }]);

    const handleInputFile = (e, index) => {
        file.fileBox = e.target.files[0]
        setCreatMedia(e.target.files[0].type.split('/')[0])
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        const allData = new FormData();
        allData.append(`file`,file.fileBox)
        axios.post(`${ApiName1}/attach/upload`, allData)
            .then((response) => {

                if (creatMedia==='image'){
                    axios.post(`${ApiName1}/clips`,{mediaId:response.data[0].id,type:'PHOTO'} ,{
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                        .then((response) => {
                            setIsModalVisible(false);
                            setSucsessText("Rasim qo'shildi");
                        }).catch((error) => {
                        console.log(error)
                    })
                }
                else {
                    axios.post(`${ApiName1}/clips`,{mediaId:response.data[0].id,type:'VIDEO'} ,{
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                        .then((response) => {
                            setIsModalVisible(false);
                            setSucsessText("Video qo'shildi");
                        }).catch((error) => {
                        console.log(error)
                    })
                }


            }).catch((error) => {
            console.log(error)
        })
    }
    const handleCancel = () => {
        setIsModalVisible(false);setedit(false);
    };
    useEffect(() => {
        GetNews();
        notify()
    }, [sucsessText]);

    function GetNews() {
        axios.get(`${ApiName1}/clips`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            params:{page:0,size:100}
        })
            .then((response) => {
            setMedia(response.data.content);
                setSucsessText('')

        }).catch((error) => {
            console.log(error)
        })
    }

    function Delet() {
        axios.delete(`${ApiName1}/clips/${MediaId}`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setMediaId('')
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

    return (
        <div>
            <ToastContainer/>
            <div className="yuklash">
                <button onClick={showModal} className='btn btn-success '>
                    Media qo'shish
                </button>
            </div>
            <Modal className='ticherModal' title={edit ? "Tahrirlash" : "Yangiliklar qo'shish"}
                   open={isModalVisible}
                   onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <label htmlFor='Title'>Rasm yoki Video</label>
                    <Input type="file" onChange={(e) => handleInputFile(e)}/>
                </div>
            </Modal>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>video</th>
                    <th>delet</th>

                </tr>
                </thead>
                <tbody>
                {Media && Media.filter(item=>item.type==='VIDEO').map((item,index)=>{
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <video src={`${ApiName1}${item.open_url}`}
                                   style={{width: "250px", height: "150px"}}
                                   controls={true}/>
                        </td>
                        <td>
                            <button className="btn btn-danger mx-1"
                                    onClick={() => {setMediaId(item.id)}}
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img className='iconEdit' src="/img/delete.png" alt=""
                                     style={{width: "25px", height: "25px"}}/>
                            </button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>foto</th>
                    <th>delet</th>

                </tr>
                </thead>
                <tbody>
                {Media && Media.filter(item=>item.type==='PHOTO').map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img src={`${ApiName1}${item.open_url}`} style={{width: "250px", height: "150px"}} alt=""/>
                        </td>
                        <td>
                            <button className="btn btn-danger mx-1"
                                    onClick={() => {
                                        setMediaId(item.id)
                                    }}
                                    data-bs-toggle="modal" data-bs-target="#myModal">
                                <img className='iconEdit' src="/img/delete.png" alt=""
                                     style={{width: "25px", height: "25px"}}/>
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <b>Rasim yoki Video</b> ni o'chirmoqchimisiz
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

export default Media;