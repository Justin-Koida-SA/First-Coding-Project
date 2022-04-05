import "./kaboom.js"

scene("start", () => {
    add([
        scale(2),
        text("start screen!"),
        pos(50, 80),
    ])
})
addLevel([
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
