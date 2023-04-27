import React, {useEffect,useState} from 'react';
import {
    UserAddOutlined,
    PicLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Modal, Input} from 'antd';
import {Link} from "react-router-dom";
import {Route, Routes, useNavigate} from "react-router";
import Rector from "../components/Rector";
import Dekan from "../components/Dekan";
import "../asset/Admin.scss"
import News from "../components/news";



const { Header, Content, Footer, Sider } = Layout;

function AdminPage(props) {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NewPassword, setNewPassword] = useState({});



    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
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

    const {token: { colorBgContainer }} = theme.useToken();

    return (
        <Layout>
            <Sider style={{
                    overflow: 'auto', height: '100vh',
                    position: 'fixed', left: 0, top: 0, bottom: 0,
                }}>
                <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}}/>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                      onClick={(into)=>{

                          if (into.key === "1"){ navigate("/Adminyoli/");}
                          if (into.key === "2"){ navigate("/Adminyoli/AddDekan");}
                          if (into.key === "3"){ navigate("/Adminyoli/AddNews");}
                      }}
                      items={[
                          {
                              label:"Rektor",
                              key:"1",
                              icon:<UserAddOutlined/>
                              },
                          {
                              label:"Zam Dekanlar",
                              key:"2",
                              icon:<UserAddOutlined/>
                          },
                          {
                              label:"Yangiliklar",
                              key:"3",
                              icon:<PicLeftOutlined />
                          }
                          ]} />
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                <Header>
                    <span className="HeaderTitle">TTJ Admin paneli</span>

                </Header>
                <div className="dropdown ">
                    <button type="button" className="btn " data-bs-toggle="dropdown">
                        {localStorage.getItem("user_Info")&&
                        localStorage.getItem("user_Info").slice(0, 2)}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                                {localStorage.getItem("user_Info")}
                            </a>
                        </li>
                        <li onClick={showModal}>
                            <a className="dropdown-item" href="#">Parolni yangilash</a></li>
                        <li onClick={signOut}><a className="dropdown-item" href="#">Chiqish<img
                            src="./img/logout.png" alt=""/></a></li>
                    </ul>
                    <Modal className='ticherModal' title="Parolni o'zgartirish" open={isModalVisible}
                           onOk={handleOk} onCancel={handleCancel}>
                        <div className="w-100">
                            <label htmlFor="editLogin">Login kiriting</label>
                            <Input id='editLogin' placeholder="AA1234567" allowClear value={NewPassword.login}
                                   onChange={(e)=>{setNewPassword({...NewPassword, login: e.target.value.toUpperCase()})}}
                                   maxLength="9"/>
                            <label htmlFor="editPassword">Yangi parol kiriting</label>
                            <Input id='editPassword' allowClear value={NewPassword.password}
                                   onChange={(e)=>{setNewPassword({...NewPassword, password: e.target.value,})}}/>

                        </div>

                    </Modal>
                </div>

                <Content style={{margin: '24px 16px 0', overflow: 'initial',}}>
                    <Routes>
                        <Route path={"/AddDekan"} element={<Dekan/>}/>
                        <Route path={"/AddNews"} element={<News/>}/>
                        <Route path={"/"} element={<Rector/>}/>
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
}

export default AdminPage;