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
                { t: "0-10", tm: 3 },
                { t: "0-11", tm: 3 },
                {
                    t: "0-12", tm: 1, cb: () => {
                        document.getElementsByClassName("dinamic-box")[0].style.opacity = 1
                    }
                },

            ]
            , sc_time: 13
        }),


    new Scene(
        {
            scid: 3, bid: 0, cmdtxt: [
                { t: "0-13", tm: 1 },
                { t: "0-14", tm: 1 },
                { t: "0-15", tm: 0 },
                { t: "0-16", tm: 0 },
                { t: "0-17", tm: 0 },
            ]
            , sc_time: 5
        }),


    new Scene({
        scid: 4, bid: 1,
        cmdtxt: [
            { t: "0-18", tm: 1 },
            { t: "0-14", tm: 1 },
            { t: "0-15", tm: 0 },
            { t: "0-16", tm: 0 },
            { t: "0-17", tm: 0 },
        ],
        dialog: {
            t: "N-0", style: {

            }, color: "noire"
        },
        spid: [{ id: 0, style: { "width": "18%", "height": "65%", "top": "15%", "left": "40%" } }], sc_time: 5
    }),


    new Scene({
        scid: 5, bid: 1,
        dialog: {
            t: "N-1", style: {

            }, color: "noire"
        },
        spid: [{ id: 0, style: { "width": "18%", "height": "65%", "top": "15%", "left": "40%" } }], sc_time: 999
    }),


]



