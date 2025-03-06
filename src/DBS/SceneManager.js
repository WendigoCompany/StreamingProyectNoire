import Backgrounds from "./Backgrounds";
import Sprays from "./Sprays";

import game_lang from "../Text/game.lang.json"
import cmd_lang from "../Text/cmd.lang.json"
import { Scenes } from "./Scenes";

const prepare_style = (bgs) => {
    const style = {}
    Object.keys(bgs).map(k => {
        style[k] = bgs[k];
    })
    return style
}


const SpecialText = (element, txt) => {
    let text = txt.replaceAll("\n", "<br/>")

    element.innerHTML = text;

}

const ArrCmd = (cmddata, i = 0) => {
    let text = "";


    for (let j = 0; j <= i; j++) {
        text += cmd_lang[Manager.lang][cmddata[j].t.split('-')[0]][cmddata[j].t.split('-')[1]]
        text += " <br/>"

        if (typeof cmddata[j].cb == "function") {
            cmddata[j].cb()
        }
    }

    i++

    if (cmddata[i] != undefined) {
        setTimeout(() => {
            ArrCmd(cmddata, i)
        }, cmddata[i].tm * 1000);
    }

    document.getElementById("cmd-retro").innerHTML = text;


}

const LunchCmd = (cmddata, mode) => {
    if (mode == "arr") {
        ArrCmd(cmddata)
    }

}



const search = (arr, tof, k = "id") => {


    if (k) {
        console.log(tof);


        return arr.filter(a => a[k] == tof)[0]
    } else {
        return arr.filter(a => a == tof)[0]
    }
}

class SceneManager {
    constructor() {
        this.scene = sessionStorage.getItem("scene") || 11
    }

    load_scene(scid) {
        return Scenes.filter(s => s.scid == scid)[0]
    }

    show_scene() {
        const scene_data = this.load_scene(this.scene)
        // LOADING BG



        if (Array.isArray(scene_data.bid)) {

        } else if (scene_data.bid != -1) {
            const bgdata = search(Backgrounds, scene_data.bid);
            const bgc = document.getElementsByClassName("img-cont")[0]
            const style = {
                "background-image": `url("${bgdata.url}")`,

                ...prepare_style(bgdata.style),
            }

            style["opacity"] = bgdata.style["opacity"] ? bgdata.style : 1

            Object.keys(style).map(k => {
                bgc.style[k] = style[k];
            })



        } else {
            const bgc = document.getElementsByClassName("img-cont")[0]
            bgc.style.opacity = 0;

        }

        // LOADING BG

        // LOADING SP
        if (scene_data.spid.length > 0) {
            let spc = document.getElementsByClassName("sp-cont")
            if (!spc.length >= scene_data.spid.length) {
                const tocreate = scene_data.spid.length - spc.length;

                for (let i = 1; i <= tocreate; i++) {
                    const img = document.createElement("img");
                    img.className = "sp-cont";
                    const id = spc.length + i
                    img.id = `cont-sp-${id}`;
                }
            }
            spc = document.getElementsByClassName("sp-cont")

            for (let i = 0; i < spc.length; i++) {
                spc[i].style.opacity = 1

            }

            scene_data.spid.map((spid, i) => {
                const spdata = search(Sprays, spid.id);
                const style = {

                    ...prepare_style(spid.style),
                }


                const spcont = document.getElementsByClassName("sp-cont")[i]
                spcont.src = spdata.url

                Object.keys(style).map(k => {
                    spcont.style[k] = style[k];
                })

            })




        } else {
            const spc = document.getElementsByClassName("sp-cont")
            for (let i = 0; i < spc.length; i++) {
                spc[0].style.opacity = 0;

            }
        }



        if (scene_data.cmdtxt) {
            sessionStorage.setItem("hcmd", scene_data.scid)
            let mode = "single";
            if (Array.isArray(scene_data.cmdtxt)) {
                mode = "arr"
            }
            LunchCmd(scene_data.cmdtxt, mode)
        } else {
            const cmdcache = (this.load_scene(parseInt(sessionStorage.getItem("hcmd")))).cmdtxt
            let cmdtxt = "";
            if (Array.isArray(cmdcache)) {
                cmdcache.map(c => {
                    cmdtxt += cmd_lang[Manager.lang][c.t.split('-')[0]][c.t.split('-')[1]]
                    cmdtxt += " <br/>"
                })

            }
            document.getElementById("cmd-retro").innerHTML = cmdtxt;

        }



        if (scene_data.dialog) {

            const color = !scene_data.dialog.color.includes("#") ? characters[scene_data.dialog.color] : scene_data.dialog.color;
            const style = {
                "color": color,
                ...prepare_style(scene_data.dialog.style),
            };


            Object.keys(style).map(k => {
                document.getElementById("dialog").style[k] = style[k];
            })



            document.getElementById("dialog").innerHTML = game_lang[Manager.lang]["dialogs"][scene_data.dialog.t.split("-")[0]][scene_data.dialog.t.split("-")[1]];



        } else {
            document.getElementById("dialog").textContent = ""
        }

        //SPECIAL CASES
        if (Manager.scene > 2) {
            document.getElementsByClassName("dinamic-box")[0].style.opacity = 1
        }
        //SPECIAL CASES



        if (!scene_data.aval_cmd && !scene_data.wait) {
            //  AVANZANDO A NUEVA ESCENA
            document.getElementById("ligth").classList = "no-allowed";
            document.getElementById("user-prom").disabled = true;
            setTimeout(() => {
                Manager.scene += 1
                Manager.show_scene()
            }, scene_data.sc_time * 1000);

        } else if (scene_data.aval_cmd) {
            document.getElementById("ligth").classList = "allowed";
            document.getElementById("user-prom").disabled = false;
        }



        if (scene_data.scid == 0) {
            setTimeout(() => {
                const startmod = document.getElementsByClassName("start-modal-cont")[0];
                // startmod.style.top = "10%";
                startmod.style.left = "20%";

                SpecialText(startmod.querySelector("p"), game_lang[Manager.lang]["start-msj"])
            }, 300);
        }


    }

    load_cmd() {
        let entry = document.getElementById("user-prom").value;
        document.getElementById("user-prom").value = ""
        console.log(entry);

    }
    // top: 10%;
    // left: 20%;
    // LOADING SP
}


export const Manager = new SceneManager();



const characters = {
    "noire": "rgb(206, 36, 36)",
};
