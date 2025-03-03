import { useAC } from "../Context/Actual_Compo";
import Disclaim from "../Pages/Disclaim";
import Main from "../Pages/Main";

export default function Actual_Compo() {
    const { ac } = useAC();


    const loadCompo = () => {
        switch (ac) {
            case "disclaim":
                return <Disclaim />

            case "main":
                return <Main />
        }
    }

    return <>
        {loadCompo()}
    </>
}