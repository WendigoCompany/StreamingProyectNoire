import { useEffect } from "react";
import { useLang } from "../Context/lang_context";
import Backgrounds from "../DBS/Backgrounds";
import { Manager } from "../DBS/SceneManager";
import Sprays from "../DBS/Sprays";
import main_ui_lang from "../Text/main.ui.lang.json"




// style={{ backgroundImage: `url("${Sprays[0].url}")` , ...prepare_style(Sprays[0].style)}}

// style={{ backgroundImage: `url("${Backgrounds[0].url}")` , ...prepare_style(Backgrounds[0].style)}}




export default function Main() {
    const { lang } = useLang();


    useEffect(()=>{
        Manager.show_scene()
    },[])
    return <>
        <button className="f2 reset-btn">{main_ui_lang[lang]["reset-btn"]}</button>
        <div className="dinamic-box">

        </div>
        <div className="w-100 h-100">
            <div className="img-cont" >

            </div>
{/* 
            <div className="sp-cont" style={{ backgroundImage: `url("${Sprays[0].url}")` , ...prepare_style(Sprays[0].style)}} 
            
            ></div> */}
            <div id="sp-cont">
            <img  className="sp-cont" id="cont-sp-1"/>
            </div>
            <div className="cmd-cont" >
                <div className="allow-l"><div className="no-allowed"></div></div>
                <div className="p-cont">
                    <p className="f2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi rerum repudiandae maxime culpa recusandae ipsum minima, beatae consequuntur veniam hic commodi molestias aliquam velit laborum, optio, placeat sapiente laudantium nobis.
                    </p>
                </div>
                <div className="input-cont">
                    <div>
                    </div>
                    <input className="f2" type="text" name="" id="" />
                    <button className="f2">{main_ui_lang[lang]["send-btn"]}</button>
                </div>
            </div>
        </div>
    </>
}   