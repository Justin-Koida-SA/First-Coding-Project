import {k} from "./kaboom.js"

k.scene("start", () => {
    k.add([
        k.scale(2),
        k.text("start screen!"),
        k.pos(50, 80),
    ])
})
k.addLevel([
    '! ^^^^^^^^     &',
    '! ^^^^^^^^     &',
    '! ^^^^^^^^     &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
    '!              &',
  
   
    
  ],{ 
    width: 35,
    height: 22,
   // '^': ()=>[sprite('bean'), scale(.75), area(), 'bean'],
    // '!' : ()=>[sprite]
    // '&': ()=>[sprite]
    
  })

// add a piece of text at position (120, 80)
