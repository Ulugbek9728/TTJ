import React, {useEffect, useState} from 'react';
import {TeamOutlined, GoldOutlined} from '@ant-design/icons';
import {Input, Layout, Menu, Modal, theme} from 'antd';
import {Route, Routes, useNavigate} from "react-router";
import StudentListDekan from "../components/StudentList_Dekan";
import TtjStudentListDekan from "../components/TTJ_StudentListDekan";
import TtjDekan from "../components/TTJ_Dekan";
import logout from "../img/logout.png"
import axios from "axios";
import {ApiName1} from "../APIname1";
import {toast} from "react-toastify";
import AddStudent from "../components/addStudent";

const {Header, Content, Sider} = Layout;


function DekanPage(props) {

    const navigate = useNavigate();
    const [sucsessText, setSucsessText] = useState('');
    const [message, setMessage] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NewPassword, setNewPassword] = useState({});

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        axios.post(`${ApiName1}/dkn/dekan/change_password`,NewPassword ,{
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response.data);
            setIsModalVisible(false);
            setSucsessText("Parolingiz yangilandi")
            setNewPassword(
                {
                    login:'',
                    password:'',
                    oldPassword:'',
                }
            )
        }).catch((error) => {
            console.log(error.response)
            if (error.response.status===400){
                setMessage(error.response.data)
            }
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_Info");
        localStorage.removeItem("id");
        navigate("/")
    }
    useEffect(() => {
        notify();

        setMessage('');
        setSucsessText('')
    }, [sucsessText, message]);

    function notify() {

        if (sucsessText != '') {
            toast.success(sucsessText)
        }
        if (message != '') {
            toast.error(message)
        }
    }

    return (
        <Layout hasSider>
            <Sider style={{
                overflow: 'auto', height: '100vh', position: 'fixed',
                left: 0, top: 0, bottom: 0,
            }}>
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                      items={[
                          {
                              label: "1-kurs qabuli",
                              key: "4",
                              icon: <GoldOutlined/>
                          },
                          {
                              label: "TTJ",
                              key: "3",
                              icon: <GoldOutlined/>
                          },
                          {
                              label: "Arizalar",
                              key: "1",
                              icon: <TeamOutlined/>
                          },
                          {
                              label: "TTJ da turuvchi Talabalar",
                              key: "2",
                              icon: <TeamOutlined/>
                          },
                      ]}
                      onClick={(into) => {
                          if (into.key === "1") {
                              navigate("/Dekanyoli/");
                          }
                          if (into.key === "2") {
                              navigate("/Dekanyoli/StudentList_Dekan");
                          }
                          if (into.key === "3") {
                              navigate("/Dekanyoli/TTJ_List");
                          }
                          if (into.key === "4") {
                              navigate("/Dekanyoli/TTJ_Qabuli");
                          }
                      }}
                />
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                <Header>
                    <span className="HeaderTitle">TTJ Dekan paneli</span>
                </Header>
                <div className="dropdown">
                    <button type="button" className="btn " data-bs-toggle="dropdown"
                            data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        {localStorage.getItem("user_Info")&&
                        localStorage.getItem("user_Info").slice(0, 2)}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a className="dropdown-item" href="#">
                                {localStorage.getItem("user_Info")}
                            </a>
                        </li>
                        <li onClick={showModal}>
                            <a className="dropdown-item" href="#">Parolni yangilash</a></li>
                        <li onClick={signOut}><a className="dropdown-item" href="#">Chiqish<img
                            src={logout} alt=""/></a></li>
                    </ul>
                    <Modal className='ticherModal' title="Parolni o'zgartirish" open={isModalVisible}
                           onOk={handleOk} onCancel={handleCancel}>
                        <div className="w-100">
                            <label htmlFor="editLogin">Login kiriting</label>
                            <Input id='editLogin' placeholder="AA1234567" allowClear value={NewPassword.login}
                                   onChange={(e)=>{setNewPassword({...NewPassword, login: e.target.value.toUpperCase()})}}
                                   maxLength="9"/>
                            <label htmlFor="editPassword">Eski parolingizni kiriting</label>
                            <Input id='editPassword' allowClear value={NewPassword.oldPassword}
                                   onChange={(e) => {
                                       setNewPassword({...NewPassword, oldPassword: e.target.value,})
                                   }}/>
                            <label htmlFor="editPassword">Yangi parol kiriting</label>
                            <Input id='editPassword' allowClear value={NewPassword.password}
                                   onChange={(e) => {
                                       setNewPassword({...NewPassword, password: e.target.value,})
                                   }}/>
                        </div>

                    </Modal>
                </div>
                <Content style={{margin: '24px 16px 0', overflow: 'initial',}}>
                    <Routes>
                        <Route path={"/TTJ_Qabuli"} element={<AddStudent/>}/>
                        <Route path={"/TTJ_List"} element={<TtjDekan/>}/>
                        <Route path={"/StudentList_Dekan"} element={<TtjStudentListDekan/>}/>
                        <Route path={"/"} element={<StudentListDekan/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DekanPage;