import "./kaboom.js"

scene("title", () => {
    addButton("Start", vec2(650,200), () => go('game', {levelIdx: 1, score: 0}), )
    addButton("Tutorial", vec2(650,400), () => go('game', {levelIdx: 0, score: 0}), )
})


function addButton(txt, p, f) {

	const btn = add([
		text(txt,{
            font:"sinko",
            size: 100,


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
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})

}

