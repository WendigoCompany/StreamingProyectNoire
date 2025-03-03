import { createContext, useContext, useState } from "react";
import { appTag } from "../App";

export const ACContext = createContext();
export const useAC = () => useContext(ACContext);



const ACProvider = ({ children }) => {

    const [ac, setACC] = useState(sessionStorage.getItem(`${appTag}-module`) || "disclaim");




    const setAC = (AC) => {
        sessionStorage.setItem(`${appTag}-module`, AC)
        setACC(AC)

    }



    return <ACContext.Provider value={{ ac, setAC, }}>{children}</ACContext.Provider>
}

export default ACProvider