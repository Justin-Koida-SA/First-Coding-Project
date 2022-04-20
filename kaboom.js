import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize kaboom context

export const k = kaboom({
    width: 1300,
    height: 650,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 255, ],
    //background:[sprite("bakery"),],
    global: true
}); 

loadSprite("bakery", "/sprites/bakery.jpg")
let background = add([
    sprite("bakery"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(1),
    // Keep the background position fixed even when the camera moves
    fixed()
  ]);



//test edit
