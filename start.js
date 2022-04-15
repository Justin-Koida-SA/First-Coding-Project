import "./kaboom.js"



loadSprite("pretzel", "/sprites/pretzel.png")
loadSprite("salt", "/sprites/salt.png")
loadSprite("stove", "/sprites/stove.jpg")
loadSprite("floor", "/sprites/floor.png")
//loadSprite("child", "/sprites/child.png")
loadSprite("portal", "/sprites/portal.png")
loadSprite("ketchup", "/sprites/ketchup.png")
loadSprite("spear", "/sprites/blackking.png")
loadSprite("mustard", "/sprites/mustard.png")
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

const KJUMP = 800
const NJUMP = 650
let JUMP = NJUMP


const CHILD_SPEED = 250


const LEVELS = [
[       
"                 .                                       =",   
"=             =   =   =                  =               =",
"=@  |^ $$ +^|= |  + $   |   + ^^   |$  =    $ |    +  |, =",
"======================================================   =",
"                                                        ==",
"                                                       = =", 
"  >  |  +  |    +    | ^^^ +     |    +  |  +  +     |=  =",
"==========================================================", 
                                               
],
[
"=      $                       .                          ",
"= ,    =      =       =        =                          ",
"= =                                                    >  ",
"=    =                                               ===  ",
"=        =                                        $       ",
"=             =     =              =              =       ",
"=                       =                                 ",
"=           $       =              $            =         ",
"=@   $      =   =                  =                      ",
"==   =   =                                  ===           ",
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
'floor',

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
scale(.4),
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
    'ketchup',
 ],
 ",": () =>[
    sprite("mustard"),
    scale(.1),
    area(),
    origin("bot"),
    "power",
    'mustard'
 ],
 "+": () => [
    sprite("children"),
    scale(.2),
    area(),
   // solid(),
    origin("bot"),
    "children",
    "danger",
    {
        speed:CHILD_SPEED
    }
    ],
    "|": () => [
      sprite("invis-wall"),
      scale(.3),
      area(),
      origin("bot"),
      opacity(.1),
      'invis-wall',
      ],
})

// Get the player object from tag
const player = get("player")[0]


// Movements
onKeyPress("space", () => {
if (player.isGrounded()) {
player.jump(JUMP)
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
destroy(power)
JUMP = KJUMP
})

player.onCollide("mustard", (power) => {
    destroy(power)
    SPEED = MSPEED
    })


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
   s.move(s.speed, 0)
   
})
onCollide("children", 'invis-wall', (s) =>{
    s.speed = s.speed * -1
   })

  

// onCollide('children', 'invis-wall', (s,p)=> {

//     if(p.isLeft() || p.isRight()){
//        s.move(CHILD_SPEED*-1)
//     }
    
    
    // if(CURRENT_CHILD_SPEED = 50){
    //    s.flipX(false);
    //    CURRENT_CHILD_SPEED = CHILD_SPEED * -1
    // }
    // else if(CURRENT_CHILD_SPEED = CHILD_SPEED*-1){
    //    s.flipX(true);
    //    CURRENT_CHILD_SPEED = CHILD_SPEED
    // } 
 //})

// Fall death
player.onUpdate(() => {
if (player.pos.y >= 1000) {
go("lose")
}
})

// Enter the next level on portal
player.onCollide("portal", () => {
    //take out the if score <5 STATEMENT and else if score >=5 for original
    if(score < 5){
        text("no")
    }
   else if (score >= 5){
    if (levelIdx < LEVELS.length - 1) {
    // If there's a next level, go() to the same scene but load the next level
    SPEED = NSPEED,
    JUMP = NJUMP,
    go("game", {
    levelIdx: levelIdx + 1,
        score: score,
        score: 0,
})
    } else {
    // Otherwise we have reached the end of game, go to "win" scene!
    go("win", { score: score, })
    }
    }
})

//camera follows player
player.onUpdate(() => {
   camPos(player.pos)
})
// Score counter text
const scoreLabel = add([
text(score),
pos(player.pos.x, 200)
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
SPEED = NSPEED,
JUMP = NJUMP,
go("game", {
levelIdx: 0,
score: 0,
})
}

start()
