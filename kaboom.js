import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize kaboom context

export const k = kaboom({
    width: 1300,
    height: 650,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 25, ],
    //background:[sprite("bakery"),],
    global: true
}); 





//test edit
