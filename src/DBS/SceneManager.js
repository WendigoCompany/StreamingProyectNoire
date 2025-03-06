import Backgrounds from "./Backgrounds";
import Sprays from "./Sprays";

import game_lang from "../Text/game.lang.json"
import cmd_lang from "../Text/cmd.lang.json"

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
        this.scene = sessionStorage.getItem("scene") || 1
    }

    load_scene(scid) {
        return Scenes.filter(s => s.scid == scid)[0]
    }

    show_scene() {
        const scene_data = this.load_scene(this.scene)
        // LOADING BG

        if (scene_data.bid != -1) {
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

        if (!scene_data.aval_cmd && !scene_data.wait) {
            //  AVANZANDO A NUEVA ESCENA

            setTimeout(() => {
                Manager.scene += 1
                Manager.show_scene()
            }, scene_data.sc_time * 1000);

        }

        if (scene_data.cmdtxt) {
            let mode = "single";
            if (Array.isArray(scene_data.cmdtxt)) {
                mode = "arr"
            }
            LunchCmd(scene_data.cmdtxt, mode)
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

    // top: 10%;
    // left: 20%;
    // LOADING SP
}


export const Manager = new SceneManager();

class Scene {
    constructor({ scid, bid, spid = [], dialog, cmdtxt, actions = [], aval_cmd = false, sc_time, wait = false }) {
        this.scid = scid;
        this.bid = bid;
        this.spid = spid;
        this.dialog = dialog;
        this.cmdtxt = cmdtxt;
        this.actions = actions;
        this.aval_cmd = aval_cmd;
        this.sc_time = sc_time
        this.wait = wait
    }

}

export const Scenes = [
    new Scene({ scid: 0, bid: 0, wait: true }),
    new Scene(
        {
            scid: 1, bid: 0, cmdtxt: [
                { t: "0-0", tm: 2 },
                { t: "0-1", tm: 2 },
                { t: "0-2", tm: 1 },
                { t: "0-3", tm: 1 },
                { t: "0-4", tm: 0 },
                { t: "0-5", tm: 0 },
                { t: "0-6", tm: 0 },
                { t: "0-7", tm: 0 },

            ]
            , sc_time: 7
        }),
        new Scene(
            {
                scid: 2, bid: 0, cmdtxt: [
                    { t: "0-8", tm: 0 },
                    { t: "0-9", tm: 3 },
                    { t: "0-10", tm: 3},
                    { t: "0-11", tm: 3 },
                    { t: "0-12", tm: 1 },
    
                ]
                , sc_time: 999
            }),
    new Scene({
        scid:3, bid: 1, spid: [{ id: 0, style: { "width": "18%", "height": "65%", "top": "15%", "left": "40%" } }], dialog: "", sc_time: 2
    }),

]

