import React, {useEffect} from 'react';
import HOME from './pages/Home'
import {Routes, Route} from "react-router-dom";
import "./asset/navbar.scss"
import Yangiliklar from "./pages/Yangiliklar";
import Ariza from "./pages/ariza";
import Login from "./pages/login";
import { changeBgCircle,changeTrue } from './redux/authUser';
import { useDispatch, useSelector } from 'react-redux'
import Loader from "./loader";
import AdminPage from "./pages/adminPage";
import DekanPage from "./pages/DekanPage";
import TyutorPage from "./pages/TyutorPage";
import Natija from "./pages/natija";
import YangilikBatafsil from "./components/yangilik batafsil";


function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authUser);
    useEffect(() => {
        setTimeout(()=>{
            changeTrue()
        },2000)
    });
  return (
    <div className="App">

        {auth.bgCircle ?
            <>
                <Routes>
                    <Route path={"/News/"} element={ <Yangiliklar/>}/>
                    <Route path={"/News/:id"} element={ <YangilikBatafsil/>}/>
                    <Route path={"/login"} element={ <Login/>}/>
                    <Route path={"/Submit"} element={ <Ariza/>}/>
                    <Route path={"/Result"} element={ <Natija/>}/>

                    <Route path={"/Adminyoli/*"} element={ <AdminPage/>}/>
                    <Route path={"/Dekanyoli/*"} element={ <DekanPage/>}/>
                    <Route path={"/Tyutoryoli/*"} element={ <TyutorPage/>}/>

                    <Route path={"/"} element={ <HOME/>}/>
                </Routes>
            </>
          :
            <Loader/>
        }
        <button onClick={() => dispatch(changeBgCircle())}>Change</button>
        <button onClick={() => dispatch(changeTrue())}>true</button>

    </div>
  );
}

export default App;
