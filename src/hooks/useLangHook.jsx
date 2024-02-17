import { useState } from "react";

export default function useLangHook(){
    const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
    const handleLangChange = (e) => {
        setLang(e);
      };
      const availableLang=['ar','en','fr']
    return{
        handleLangChange,
        lang,setLang,
        availableLang,
    }
}