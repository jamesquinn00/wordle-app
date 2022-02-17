const fs = require('fs')

// All potential answers
const firstRead = fs.readFileSync('answers.txt').toString().split("\\");
let answers = []
for(let x in firstRead){
    answers.push(firstRead[x].slice(-5))
}

