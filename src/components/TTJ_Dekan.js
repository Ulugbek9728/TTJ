import React, {useEffect, useState} from 'react';
import {ApiName1} from "../APIname1";
import axios from "axios";

function TtjDekan(props) {
    const [TTJ, setTTJ] = useState({});
    const [TTJId, setTTJId] = useState('');
    const [GetTTJ, setGetTTJ] = useState([]);
    const [FakultyName, setFakultyName] = useState('');

    useEffect(() => {
        setFakultyName(localStorage.getItem("faculty"));
        getTTJ();

    }, []);

    function getTTJ() {
        axios.get(`${ApiName1}/private/dekan/show/dormitories`, {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res.data)
            setGetTTJ(res.data)
        }).catch((error) => {
            console.log(error)
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
                    <th>Kurslar kvotalari</th>
                </tr>
                </thead>
                <tbody>
                {GetTTJ && GetTTJ.map((item, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img src={`${ApiName1}${item.photoUrl}`}
                                 style={{width: "100px", height: "100px"}} alt=""/>
                        </td>
                        <td>
                            <b>{item.name}</b><br/>
                            <span>Bo'sh joylar soni <b>{item.actualCount}</b></span><br/>
                            <span>Band joylar soni <b>{item?.actualCount-item?.leftCount}</b></span>
                        </td>
                        <td>
                            {item.faculty[0].courses.map((item, index)=>{
                                return <div key={index}>
                                    <b>Kurs </b>{item.name} <br/>
                                    Umumiy joylar: {item.actualCount} <br/>
                                    Qolgan joylar: {item.leftCount}
                                    <hr/>
                                </div>
                            })}

                        </td>

                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TtjDekan;