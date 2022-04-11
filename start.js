import "./kaboom.js"


loadSprite("pretzel", "/sprites/pretzel.png")
loadSprite("salt", "/sprites/salt.png")
loadSprite("stove", "/sprites/stove.jpg")
loadSprite("floor", "/sprites/floor.png")
//loadSprite("child", "/sprites/child.png")
loadSprite("portal", "/sprites/portal.png")
loadSprite("ketchup", "/sprites/blackking.png")
loadSprite("spear", "/sprites/blackking.png")
loadSprite("mustard", "/sprites/blackking.png")
loadSprite("children", "/sprites/child.png")
loadSprite("invis-wall", "sprites/wall.jpg")


// Extend our game with multiple scenes

// Start game
//kaboom()

// Load assets


//N means normal -- K means ketchuo --- M means mustard
const NSPEED = 480
const MSPEED = 600 
let SPEED = NSPEED

const KDMG = 2
const NDMG = 1
let DMG = NDMG


const CHILD_SPEED = 50
let CURRENT_CHILD_SPEED = CHILD_SPEED

const LEVELS = [
[
"=            =   =   =   ",
"=@  ^ $$  ^ =  |  +    |>",
"=========================",
],
[
"                   =    ",
"@   $      =   =       >",
"=   =   =              =",
],
]

// Define a scene called "game". The callback will be run when we go() to the scene
// Scenes can accept argument from go()
scene("game", ({ levelIdx, score }) => {

gravity(2400)

// Use the level passed, or first level
const level = addLevel(LEVELS[levelIdx || 0], {
width: 64,
height: 64,
pos: vec2(100, 200),
"@": () => [
sprite("pretzel"),
scale(.27),
area(),
body(),
origin("bot"),
"player",
],
"=": () => [
sprite("floor"),
scale(.175),
area(),
solid(),
origin("bot"),
],
"$": () => [
sprite("salt"),
scale(.1),
area(),
origin("bot"),
"coin",
],
"^": () => [
sprite("stove"),
scale(.035),
area(),
origin("bot"),
"danger",
],
">": () => [
sprite("portal"),
scale(.1),
area(),
origin("bot"),
"portal",
],
".": () =>[
    sprite("ketchup"),
    scale(.3),
    area(),
    origin("bot"),
    "power",
 ],
 ",": () =>[
    sprite("mustard"),
    scale(.3),
    area(),
    origin("bot"),
    "power",
 ],
 "+": () => [
    sprite("children"),
    scale(.225),
    area(),
    solid(),
    origin("bot"),
    "children",
    ],
    "|": () => [
      sprite("invis-wall"),
      scale(.3),
      area(),
      origin("bot"),
      'invis-wall'
      ],
})

// Get the player object from tag
const player = get("player")[0]


// Movements
onKeyPress("space", () => {
if (player.isGrounded()) {
player.jump()
}
})

onKeyDown("left", () => {
player.move(-SPEED, 0)
})

onKeyDown("right", () => {
player.move(SPEED, 0)
})

// onKeyPress("l", () => {
//    //fire
// }
// })
 
player.onCollide("ketchup", (power) => {
destory(power)
DMG = KDMG
})


player.onCollide("danger", () => {
player.pos = level.getPos(0, 0)
// Go to "lose" scene when we hit a "danger"
go("lose")
})

//for children lose scene
player.onCollide("danger", () => {
    player.pos = level.getPos(0, 0)
    // Go to "lose" scene when we hit a "danger"
    go("lose")
    })

player.onCollide("coin", (coin) => {
destroy(coin)

score++
scoreLabel.text = score
})

action('children', (s)=> {
   s.move(CURRENT_CHILD_SPEED, 0)
})

onCollide('children', 'invis-wall', (s,p)=> {
  if(CHILD_SPEED = 50){
    
  }
})

// Fall death
player.onUpdate(() => {
if (player.pos.y >= 480) {
go("lose")
}
})

// Enter the next level on portal
player.onCollide("portal", () => {

if (levelIdx < LEVELS.length - 1) {
// If there's a next level, go() to the same scene but load the next level
go("game", {
levelIdx: levelIdx + 1,
score: score,
})
} else {
// Otherwise we have reached the end of game, go to "win" scene!
go("win", { score: score, })
}
})
//camera follows player
player.onUpdate(() => {
   camPos(player.pos)
})
// Score counter text
const scoreLabel = add([
text(score),
pos(12)
])

})

scene("lose", () => {

add([
text("You Lose"),
pos(12),
])

// Press any key to go back
onKeyPress(start)

})

scene("win", ({ score }) => {

add([
text(`You grabbed ${score} coins!!!`, {
width: width(),
}),
pos(12),
])

onKeyPress(start)

})

function start() {
// Start with the "game" scene, with initial parameters
go("game", {
levelIdx: 0,
score: 0,
})
}

start()
