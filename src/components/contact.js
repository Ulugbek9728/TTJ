import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {ApiName1} from "../APIname1";
import {Input} from 'antd';



function Contact(props) {

    const [sucsessText, setSucsessText] = useState('');
    const [message2, setMessage2] = useState('');

    const [contact, setContact] = useState({});
    const [GetContact, setGetContact] = useState({});

    function add() {
        axios.post(`${ApiName1}/contact`, contact,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            setSucsessText("Ma'lumotlar qo'shildi");
            setContact('')
        }).catch((error)=>{
            console.log(error)
        })
    }

    function getContact(){
        axios.get(`${ApiName1}/contact`,'').then((res)=>{
            console.log(res)
            setGetContact(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        getContact();
        notify();
        setMessage2('');
        setSucsessText('');
        setContact('')

    }, [sucsessText, message2]);

    function notify() {
        if (sucsessText != '') {
            toast.success(sucsessText)
        }
        if (message2 != '') {
            toast.error(message2)
        }
    }

    return (
        <div>
            <div className="d-flex">
                <div className="w-25">
                    <label htmlFor="tel">Tel:</label> <br/>
                    <Input value={contact.phoneContact} className='my-2' id='tel' type="text"
                           onChange={(e) => {setContact({...contact, phoneContact: e.target.value})
                           }}/>
                    <label htmlFor="telegram">Telegram</label> <br/>
                    <Input value={contact.telegramContact} className='form-control my-2'
                           id='telegram' type="text"
                           onChange={(e) => {setContact({...contact, telegramContact: e.target.value})
                           }}/>
                    <label htmlFor="Youtube">Youtube</label> <br/>
                    <Input className='my-2' id='Youtube' type="text"
                           value={contact.youtubeContact}
                           onChange={(e) => {setContact({...contact, youtubeContact: e.target.value})
                           }}/>
                </div>
                <div className="w-25 mx-5">
                    <label htmlFor="tdtu">tdtu.uz</label> <br/>
                    <Input className='my-2' id='tdtu' type="text"
                           value={contact.siteContact}
                           onChange={(e) => {
                               setContact({
                                   ...contact,
                                   siteContact: e.target.value
                               })
                           }}/>
                    <label htmlFor="id_tdtu">id.tdtu.uz</label> <br/>
                    <Input className='my-2' id='id_tdtu' type="text"
                           value={contact.idSiteContact}
                           onChange={(e) => {
                               setContact({
                                   ...contact,
                                   idSiteContact: e.target.value
                               })
                           }}/>
                </div>
            </div>
            <button onClick={add} className='btn btn-success'>Qo'shish</button>
            <hr/>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Tel"</th>
                    <th>Telegram</th>
                    <th>TDTU</th>
                    <th>ID.TDTU</th>
                    <th>YOUTUBE</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>{GetContact.phoneContact}</td>
                    <td>{GetContact.telegramContact}</td>
                    <td>{GetContact.siteContact}</td>
                    <td>{GetContact.idSiteContact}</td>
                    <td>{GetContact.youtubeContact}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Contact;