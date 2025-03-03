
import { useLang } from "../Context/lang_context";
import icons from "../Media/Images/Icons"


export default function Lang_Compo() {
    const {setLang} = useLang();
    return <>
        <div className="div-icon">
            <button className="btn-icon" onClick={()=>{
                setLang('es')
            }}><img className="w-100" src={icons.es_ic} alt="" /></button>
            <button className="btn-icon" onClick={()=>{
                setLang('en')
            }}><img className="w-100" src={icons.en_ic} alt="" /></button>
        </div>
    </>
}