import Lang_Compo from "./Components/Lang_Com";
import LangProvider from "./Context/lang_context";
import "./Style/main.css"
import "./Style/icons.css"
import "./Style/fonts/fonts.css"
import ACProvider from "./Context/Actual_Compo";
import Actual_Compo from "./Components/Actual_Compo";

export const appTag = "pr1";

export default function App() {
    return <div>


        <ACProvider>
            <LangProvider>
                <Actual_Compo/>
                <Lang_Compo></Lang_Compo>
            </LangProvider>
        </ACProvider>
    </div>
}