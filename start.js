import "./kaboom.js"








loadSprite("pretzel", "/sprites/blackking.png")
loadSprite("salt", "/sprites/blackking.png")
loadSprite("stove", "/sprites/blackking.png")
loadSprite("floor", "/sprites/blackking.png")
loadSprite("child", "/sprites/blackking.png")
loadSprite("portal", "/sprites/blackking.png")
loadSprite("")

// Extend our game with multiple scenes

// Start game
//kaboom()

// Load assets


const SPEED = 480


const LEVELS = [
[
"@  ^ $$ >",
"=========",
],
[
"@   $   >",
"=   =   =",
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
scale(.3),
area(),
body(),
origin("bot"),
"player",
],
"=": () => [
sprite("floor"),
scale(.3),
area(),
solid(),
origin("bot"),
],
"$": () => [
sprite("salt"),
scale(.3),
area(),
origin("bot"),
"coin",
],
"^": () => [
sprite("stove"),
scale(.3),
area(),
origin("bot"),
"danger",
],
">": () => [
sprite("portal"),
scale(.3),
area(),
origin("bot"),
"portal",
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
