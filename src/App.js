import React from 'react';
import {useTranslation} from "react-i18next";



function App() {

  const { t, i18n} = useTranslation();
  const changeLanguage = (language)=>{
    i18n.changeLanguage(language)
  };

  return (
    <div className="App">
      <button className="btn btn-success" onClick={()=> changeLanguage("ru")}>RU</button>
      <button className="btn btn-success" onClick={()=> changeLanguage("uz")}>UZ</button>

      <span>{t("test")}</span>

    </div>
  );
}

export default App;
