import "./kaboom.js"

scene("title", () => {
    addButton("Start", vec2(650,300), () => go('game', {levelIdx: 1, score: 0,}))
    addButton("Tutorial", vec2(650,350), () => go('game', {levelIdx: 0, score: 0}) )
	add([
		pos(650, 150),
		origin("center"),
		color(300,100,200),
		text("Pretzel Escape", {
			size: 100,
			font: "sinko",
		})
	])

	add([
		sprite("pretzel"),
		scale(3),
		origin("center"),
		pos(650, 500),
		"beggining",

	])

	const player = get("beggining")[0]
	const SPEED = 150
	onDraw(()=> {
		if(player.curAnim() !== "run"){
            player.play("run")
        }
		player.move(SPEED,0)
		if (player.pos.x >= 1350){
			player.pos.x = 0
		}
	
	})
	
})


function addButton(txt, p, f) {

	const btn = add([
		text(txt,{
            font:"sinko",
            size: 30,


        }),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4)
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})

}

