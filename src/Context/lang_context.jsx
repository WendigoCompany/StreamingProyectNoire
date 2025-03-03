import { createContext, useContext, useState } from "react";

export const LangContext = createContext();
export const useLang = () => useContext(LangContext);



const LangProvider = ({ children }) => {

  const [lang, setL] = useState(sessionStorage.getItem("l") || "en");

  const setLang = (lang) => {
    sessionStorage.setItem("l", lang)
    setL(lang)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export default LangProvider