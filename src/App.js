import React from 'react';
import HOME from './pages/Home'
import {Routes, Route} from "react-router-dom";



function App() {



  return (
    <div className="App">

      <Routes>
        <Route path={"/"} element={ <HOME/>}/>
      </Routes>

    </div>
  );
}

export default App;
