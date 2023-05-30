import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ApiName1} from "../APIname1";

function TtjRector(props) {

    const [GetTTJ, setGetTTJ] = useState([]);


    useEffect(() => {GetTTJInfo();},[]);

    function GetTTJInfo() {
        axios.get(`${ApiName1}/private/admin/dormitory`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            setGetTTJ(response.data);
        }).catch((error) => {
            console.log(error.response)
        })
    }

    return (
        <div>
            <table className="table table-bordered ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>img</th>
                    <th>TTJ name</th>
                    <th>Fakultet kvotalari</th>
                    <th>Kurslar kvotalari</th>
                </tr>
                </thead>
                <tbody>
                {GetTTJ && GetTTJ.map((item, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td><img src={`${ApiName1}${item.photoUrl}`} style={{width:"100px", height:"100px"}} alt=""/></td>
                        <td>
                            <b>Yotoqxona nomi: </b>{item.name} <br/>
                            <b>Umumiy joylar: </b>{item.actualCount} <br/>
                            <b>Qolgan joylar: </b>{item.leftCount}
                        </td>
                        <td colSpan="2">{item.faculty.map((item, index)=>{
                            return <div key={index}>
                                <div className='d-flex  w-100'>
                                    <div  className="w-50">
                                        <b>{item.name}</b> <br/>
                                        <b>Umumiy joylar: </b>{item.actualCount} <br/>
                                        <b>Qolgan joylar: </b>{item.leftCount}
                                    </div>
                                    <div className="w-50 px-2" style={{borderLeft:"1px solid black"}}>
                                        {item.courses.map((item, index)=>{
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
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TtjRector;