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

loadSprite("bakery", "/sprites/bakery.jpg")



// Extend our game with multiple scenes

// Start game
//kaboom()

// Load assets


//N means normal -- K means ketchuo --- M means mustard
const NSPEED = 480
const MSPEED = 600 
let SPEED = NSPEED

const SPEEDC = 1200

const KJUMP = 800
const NJUMP = 650
let JUMP = NJUMP

let start1 = "true"
let INVINSIBLE = "false"


const CHILD_SPEED = 250

var death = ""
var checkpoint = 0


const LEVELS = [
[
"=                                                   =",
"=@         ^     =|+ |  $$$$$     ,       .       > =",
"=====================================================",

],  
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
    "=             $=           =                             =",
    "=@ |+  | +  | =.  ^^^ $ ^   |     + + + |   ^$^          =",
    "================================================   ==    =",
    "   =               =                            =  =    ==",
    "  >=                                                   = =",
    "     ^^|$ +  |  +  + ^^ $^^  +  ^ +   |   +  |,       =  =",
    "=================================================  ===   =",
    
], 
[
"=      $                                                 ",
"= ,    =      =      =      .                            ",
"= =                         =                         >  ",
"=    =                                              ===  ",
"=       ==                                 =      $       ",
"=             =     =              =              =       ",
"=                       =                                 ",
"=           $       =              $            =         ",
"=@   $      =   =                  =                      ",
"==   =   =                                  ====          ",
],
[   
    "        ^ ^ ^ $===| +++  ^    +  +    +   |  ^         =",
    "      =========   =============================        =",
    " =                                              =      =",
    "   =| +  |^ $    ^  + |    $ ^      ^             =    =",
    "========================   =====   === $           =    =",
    "=                                      =          =    =",
    "=                                =       =        =    =",
    "=                            .             =      =    =",
    "=                          ^^=^^ ^^^ ^^     =     =    =",
    "=          =     =     ==============        =    =    =",
    "=  $  =                                       =   =    =",
    "=@ =    |    ^+     |^    ^  ^    |  +   +  |   ,= = > =",
    "========================================================",
    
], 
]

// Define a scene called "game". The callback will be run when we go() to the scene
// Scenes can accept argument from go()
scene("game", ({ levelIdx, score }) => {
    var background = (x,y) => {
    add([
    
        scale(1.9),  
        sprite("bakery"),
        pos(x, y),
        //origin("topleft"),
        area(),    
      ])
    }
    background(-500,-70)
    background(1000, -70)
    background(2500, -70)
    background(4000, -70)


    if (levelIdx == 0){
       add([
            pos(0,0),
    
            text("Ah yes you have awoken. My friend, you have been reborn as a sentient pretzel. Dangerous things are trying to kill you. You must save all your salt friends and escape the bakery.",{
                width: 600,
            }),
        ])

        add([
            pos(-200,100),
            text("GOD MODE! Press 'c' to go into god mode. In god mode you can fly, move faster, be invincible, explore the level, and switch between different levels. The keys are up, left, right, and down arrows which makes you move resectivly. Press 'r' to move onto the next level and 't' to go back a level. If you would like to swtich back into normal mode, press 's'.",{
                width: 275,
            })
        ])

        add([
            pos(250,75),
            text("TUTORIAL")
        ])

        add([
            pos(200,100),
            text("press the right arrow key to move right.")
        ])

        add([
            pos(200,125),
            text("press the left arrow key to move left.")
        ])


        add([
            pos(200,150),
            text("Press the space key in order to jump")
        ])

        add([
            pos(600,100),
            text("This is a furnace. Make sure not to touch it or you will burn to death! Jump over the furnace in order to dodge it",{
                width: 400,
            })
        ])

        add([
            pos(1100,100),
            text("AAAHH, its a child! Did you know 96% of pretzel fatalities are due to small children. Dodge the hungry evil beasts in order to live.",{
                width: 400
            })
        ])

        add([
            pos(1600,100),
            text("These are your salt friends. In order to leave the bakery you must collect all the salt. Make sure to not leave anyone behind!",{
                width: 400,
            })
        ])

        add([
            pos(2100,100),
            text("This is the mustard powerup. Collect it in order to gain a boost in speed.",{
                width: 400,
            })
        ])

        add([
            pos(2600,100),
            text("This is the ketchup powerup. Collect it in order to boost your jump height.",{
                width: 400,
            })
        ])

        add([
            pos(3100,100),
            text("Touch the portal to escape the bakery. Remeber, you need to collect all your salt friends!",{
                width: 400,
            })
        ])
        }
    




// Use the level passed, or first level
const level = addLevel(LEVELS[levelIdx || 0], {
width: 64,
height: 64,
pos: vec2(100, 200),


"@": () => [
sprite("pretzel"),
scale(.26),
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
"stove",
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


onKeyPress("r", ()=> {
    if(INVINSIBLE == "true"){
        JUMP = NJUMP
        SPEED = NSPEED
        checkpoint = checkpoint + 1
            go("game", {
        levelIdx: levelIdx + 1,
            score: 0,
        })
    }
})

onKeyPress("t", ()=> {
    if(INVINSIBLE == "true"){
        JUMP = NJUMP
        SPEED = NSPEED
        checkpoint = checkpoint - 1
            go("game", {
        levelIdx: levelIdx - 1,
            score: 0,
        })
    }
})

var leftCancel = () => {};
var rightCancel = () => {};
var spaceCancel = () => {};
var upCancel = () => {};
var downCancel = () => {};



// Initial Set up idk how to get this to work without it
if (start1 == "true"){
gravity(2400)
    INVINSIBLE = "false";
    leftCancel();
    rightCancel();
    spaceCancel();
    upCancel();
    downCancel();

    spaceCancel = onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP)
    }
    })

    leftCancel = onKeyDown("left", () => {
        player.move(-SPEED, 0)
    })

    rightCancel = onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

    
}

// Movements


onKeyPress("s", () =>{
    gravity(2400)
    INVINSIBLE = "false"
    leftCancel();
    rightCancel();
    spaceCancel();
    upCancel();
    downCancel();

    spaceCancel = onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP)
    }
    })

    leftCancel = onKeyDown("left", () => {
        player.move(-SPEED, 0)
    })

    rightCancel = onKeyDown("right", () => {
        player.move(SPEED, 0)
    })
})

//creative
onKeyPress("c", () =>{
    gravity(0)  
    INVINSIBLE = "true"
    leftCancel();
    rightCancel();
    spaceCancel();
    upCancel();
    downCancel();
    leftCancel = onKeyDown("left", () => {
        player.move(-SPEEDC, 0)
    })
    
   rightCancel = onKeyDown("right", () => {
        player.move(SPEEDC, 0)
    })

    downCancel = onKeyDown("down", () => {
        player.move(0, SPEEDC)
        })

    upCancel = onKeyDown("up", () => {
        player.move(0, -SPEEDC)
        })

    player.move(0,-100)

})

 
player.onCollide("ketchup", (power) => {
destroy(power)
JUMP = KJUMP
})

player.onCollide("mustard", (power) => {
    destroy(power)
    SPEED = MSPEED
    })



    player.onCollide("children", () => {
    if(INVINSIBLE == "false"){
        player.pos = level.getPos(0, 0)
        go("lose")
        death = "You have been gobbled up by a child"
    }
})

player.onCollide("stove", () => {
    if(INVINSIBLE == "false"){
        player.pos = level.getPos(0, 0)
        go("lose")
        death = "You have burned in the inferno humans call stove"
    }
})




player.onCollide("coin", (coin) => {
destroy(coin)

score++
scoreLabel.text = score
})

onUpdate('children', (s)=> {
   s.move(s.speed, 0)
   
})
onCollide("children", 'invis-wall', (s) =>{
    s.speed = s.speed * -1
   })

player.onUpdate(() => {
if (player.pos.y >= 2000) {
death = "You fell. Didn't even die to a mob. This right here is emotional damage"
go("lose")
}
})

// Enter the next level on portal
player.onCollide("portal", () => {
    //take out the if score <5 STATEMENT and else if score >=5 for original
    if(score < 5){
        death = "You left a salt friend behind, you died from EMOTIONAL DAMAGE..."
        go("lose")
    }
   else if (score >= 5){
    if (levelIdx < LEVELS.length - 1) {
    // If there's a next level, go() to the same scene but load the next level
    SPEED = NSPEED,
    JUMP = NJUMP,
    checkpoint = checkpoint + 1,
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
text(death + ". Press 'space' to respawn",{
    size: 50,
    font: "sink",
    width: 1000,
}),
pos(200, 200),
])
// Press any key to go back
onKeyPress("space", respawn)

})

scene("win", ({ score }) => {

add([
//text(`You grabbed ${score} coins!!!`, {
text(`Congrats! You have sucessfully escaped the bakery.`, {
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

function respawn() {
    // Start with the "game" scene, with initial parameters
    SPEED = NSPEED,
    JUMP = NJUMP,
    go("game", {
    levelIdx: checkpoint,
    score: 0,
    })
    }

start()
