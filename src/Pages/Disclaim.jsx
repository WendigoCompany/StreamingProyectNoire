
import icons from "../Media/Images/Icons";
import txt from "../Text/disclaim.lang.json";
import { useLang } from "../Context/lang_context";
import { useAC } from "../Context/Actual_Compo";

import "../Style/disclaim.css"
import "../Style/disclaim-devices.css"


export default function Disclaim() {
    const { lang } = useLang();
    const { setAC } = useAC();

    const move_to_page = () => {
        setAC("main")
    }

    const move_to_google = () => {
        window.location.href = "https://www.google.com";
    }
    return (
        <div>
            <div className={`alert-img-cont`}>
                <img
                    className={`alert-img alert-img`}
                    src={icons.alert_ic}
                    alt=""
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <h3 className={`disclaim disclaim f1 t-shadow-blacked`}>
                    {txt[lang].disclaim_txt}
                </h3>
                <button
                    onClick={move_to_page}
                    className={`button outline disc-accept f1 disc-accept t-shadow-blacked`}
                >
                    {txt[lang].y_btn}
                </button>
                <br />
                <button
                    onClick={move_to_google}
                    className={`button outline disc-cancel f1 disc-cancel t-shadow-blacked`}
                >   {txt[lang].n_btn}

                </button>
            </div>
        </div>
    );
}