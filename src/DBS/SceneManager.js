import Backgrounds from "./Backgrounds";
import Sprays from "./Sprays";

const prepare_style = (bgs) => {
    const style = {}
    Object.keys(bgs).map(k => {
        style[k] = bgs[k];
    })
    return style
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
        this.scene = sessionStorage.getItem("scene") || 0
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

    }


    // LOADING SP
}


export const Manager = new SceneManager();

class Scene {
    constructor(scid, bid, spid = [], dialog, cmdtxt, actions = []) {
        this.scid = scid;
        this.bid = bid;
        this.spid = spid;
        this.dialog = dialog;
        this.cmdtxt = cmdtxt;
        this.actions = actions;
    }

}

export const Scenes = [
    new Scene(0, 0, [], "", ``, []),
    new Scene(1, 1, [{ id: 0, style: { "width": "18%", "height": "65%", "top": "15%", "left": "40%" } }], "", ``, []),
]

setTimeout(() => {
    Manager.scene = 1
    Manager.show_scene()
}, 3000);