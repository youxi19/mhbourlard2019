//------------------------------------------------------------------------------------------------------------------------
//GENERAL CODE
//------------------------------------------------------------------------------------------------------------------------

//Settings
let timeoutID
let requestID
let isOver = false

//Initialising the canvas
const canvas = document.getElementById("gameboard")
const ctx = canvas.getContext("2d")
canvas.width = 1000
canvas.height = 600

//creating the board
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.img = new Image()
    this.img.src = "images/background.jpg"
    this.height = canvas.height
    this.width = canvas.width
  }
}

const board = new Board()

//GENERAL RE-USABLE FUNCTIONS

//Draw elements on canvas
function draw(object) {
  ctx.beginPath()
  ctx.drawImage(object.img, object.x, object.y, object.width, object.height)
  ctx.closePath()
}

//Detect collision between two objects
function collision(objA, objB) {
  return (
    objA.x < objB.x + objB.width - 15 &&
    objA.x + objA.width - 15 > objB.x &&
    objA.y < objB.y + objB.height - 10 &&
    objA.height + objA.y - 10 > objB.y
  )
}

//------------------------------------------------------------------------------------------------------------------------
//CHARACTER METHODS
//------------------------------------------------------------------------------------------------------------------------

class Object {
  constructor(x, y, width, height, img) {
    this.x = x
    this.y = y
    this.img = img
    this.width = width 
    this.height = height 
  }
}

// // Objects creation

//Load image for Marie-Helene Bourlard
const MHBimg = new Image()
MHBimg.src = "images/MHB.png"
const mhb = new Object(5, 445, 75, 75, MHBimg)

//Load image for Parliament
const parliamentImg = new Image()
parliamentImg.src = "images/parliament.png"
const parliament = new Object(canvas.width - 200, 10, 150, 100, parliamentImg)

//Load sounds
const backgroundSound = new Audio("sounds/bg-sound.wav")
const winSound = new Audio("sounds/win-sound.wav")
const loseSound = new Audio("sounds/lose-sound.wav")

//------------------------------------------------------------------------------------------------------------------------
//GREEDY BOSSES
//------------------------------------------------------------------------------------------------------------------------


class GreedyBoss {
  constructor() {
    this.img = new Image()
    this.img.src = "images/greedy-boss.png"
    this.width = 33
    this.height = 50
    this.x = canvas.width
    this.y = Math.floor(Math.random() * (canvas.height - 300) + 200)
    this.isOffBoard = false
  }

  moveY() {
    this.y -= 2
  }

  moveX() {
    this.x -= 2
  }

  move() {
    if (shouldMoveX(this.x,this.y)) {
      this.moveX()
    }
    else {
      this.moveY()
    }
  }
}


class TopDownGreedyBoss extends GreedyBoss {
  constructor(img, width, height, isOffBoard){
    super(img, width, height, isOffBoard)
    this.x = Math.floor(Math.random() * (canvas.width-200) + 10)
    this.y = 51
  }

  moveY() {
    this.y += 2
  }

  moveX() {
    this.x += 2
  }
}

//reserve of greedyBosses
let greedyBosses = [new GreedyBoss(), new GreedyBoss(), new TopDownGreedyBoss(), new TopDownGreedyBoss()]

//This function creates new greedyBosses to be displayed
function addGreedyBosses() {
  const newGreedyBoss = new GreedyBoss()
  const newTopDownGreedyBoss = new TopDownGreedyBoss()
  greedyBosses.push(newGreedyBoss, newTopDownGreedyBoss)
}

//This function calls the addGreedyBosses function with randomIntervals
function greedyBossLoop() {
  const rand = Math.round(Math.random() * 2500) + 1500
  timeoutID = setTimeout(function() {
    addGreedyBosses()
    if (!isOver) {
      greedyBossLoop()
    } else {
      clearTimeout(timeoutID)
      return
    }
  }, rand)
}

function isGreedyBossOffBoard(oneGreedyBoss) {
  if (
    oneGreedyBoss.x <= oneGreedyBoss.width ||
    oneGreedyBoss.y <= oneGreedyBoss.height ||
    oneGreedyBoss.x >= canvas.width + 50 ||
    oneGreedyBoss.y >= canvas.height + 50
  ) {
    return true
  }
  return false
}

//handle greedyBosses directions
function shouldMoveX(xValue, yValue) {
  if (
    (xValue <= 50 ||
      (xValue >= 100 && xValue <= 150) ||
      (xValue >= 200 && xValue <= 250) ||
      (xValue >= 300 && xValue <= 350) ||
      (xValue >= 400 && xValue <= 450) ||
      (xValue >= 500 && xValue <= 550) ||
      (xValue >= 600 && xValue <= 650) ||
      (xValue >= 700 && xValue <= 750) ||
      (xValue >= 800 && xValue <= 850) ||
      (xValue >= 900 && xValue <= 950) ||
      (xValue >= 1000 && xValue <= 1050) ||
      (xValue >= 1100 && xValue <= 1150) ||
      (xValue >= 1200 && xValue <= 1250) ||
      (xValue >= 1300 && xValue <= 1350) ||
      (xValue >= 1400 && xValue <= 1450) ||
      (xValue >= 1500 && xValue <= 1550) ||
      (xValue >= 1600 && xValue <= 1650) ||
      (xValue >= 1700 && xValue <= 1750)) &&
      (yValue <= 50 ||
      (yValue >= 100 && yValue <= 150) ||
      (yValue >= 200 && yValue <= 250) ||
      (yValue >= 300 && yValue <= 350) ||
      (yValue >= 400 && yValue <= 450) ||
      (yValue >= 500 && yValue <= 550) ||
      (yValue >= 600 && yValue <= 650))
  ) {
    return true
  } else if (
    (
      yValue <= 50 ||
      (yValue >= 100 && yValue <= 150) ||
      (yValue >= 200 && yValue <= 250) ||
      (yValue >= 300 && yValue <= 350) ||
      (yValue >= 400 && yValue <= 450) ||
      (yValue >= 500 && yValue <= 550) ||
      (yValue >= 600 && yValue <= 650)
    )
    || (
      xValue <= 50 ||
    (xValue >= 100 && xValue <= 150) ||
    (xValue >= 200 && xValue <= 250) ||
    (xValue >= 300 && xValue <= 350) ||
    (xValue >= 400 && xValue <= 450) ||
    (xValue >= 500 && xValue <= 550) ||
    (xValue >= 600 && xValue <= 650) ||
    (xValue >= 700 && xValue <= 750) ||
    (xValue >= 800 && xValue <= 850) ||
    (xValue >= 900 && xValue <= 950) ||
    (xValue >= 1000 && xValue <= 1050) ||
    (xValue >= 1100 && xValue <= 1150) ||
    (xValue >= 1200 && xValue <= 1250) ||
    (xValue >= 1300 && xValue <= 1350) ||
    (xValue >= 1400 && xValue <= 1450) ||
    (xValue >= 1500 && xValue <= 1550) ||
    (xValue >= 1600 && xValue <= 1650) ||
    (xValue >= 1700 && xValue <= 1750)
    )
  ) {
    return false
  } else {
    return true
  }
}

//----------------------------------------------------------------------------------------------------------
//GAME LOGIC AND VISUALS
//----------------------------------------------------------------------------------------------------------

const resetValues = () => {
  mhb.x = 5
  mhb.y = 445
  greedyBosses = [new GreedyBoss(), new GreedyBoss(), new TopDownGreedyBoss(), new TopDownGreedyBoss()]
}

const startGame = () => {
 // if (!requestID) {
    requestID = window.requestAnimationFrame(drawLoop)
  //} 
  // else {
  //   endGame()
  // }
}

const endGame = () => {
  isOver = true
  window.cancelAnimationFrame(requestID);
  resetValues()
  backgroundSound.pause()
}

const drawLoop = () => {

  console.log(greedyBosses.length)
  //erase the old drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  //redraw the objects
  draw(board)
  draw(mhb)
  draw(parliament)

  for (let oneGreedyBoss of greedyBosses) {
    draw(oneGreedyBoss)
    oneGreedyBoss.move()

    if (isGreedyBossOffBoard(oneGreedyBoss)){
      oneGreedyBoss.isOffBoard = true
    }

    if (collision(mhb, oneGreedyBoss)) {
      endGame()
      loseSound.play()
      return
    }
  }

  //delete greedyBosses that are off screen
  greedyBosses = greedyBosses.filter(function(oneGreedyBoss) {
    return !oneGreedyBoss.isOffBoard
  })

  startGame()

  //end game when mhb reaches the parliament
  if (collision(mhb, parliament)) {
    endGame()
    winSound.play()
  }
}

const startButton = document.getElementById("start-button")
startButton.onclick = () => {
  //if(!isOver){
  backgroundSound.play()
  greedyBossLoop()
  //} else {
  resetValues()
  //}
  startGame()
}

//-------------------------------------------------------------------------------------------------------------------
//USER INPUT
//-------------------------------------------------------------------------------------------------------------------
const body = document.querySelector("body")
body.onkeydown = e => {
  e.preventDefault()
  if (e.keyCode === 37) {
    if (mhb.x >= 10) {
      mhb.x -= 20
    }
  } else if (e.keyCode === 38) {
    if (mhb.y >= 20) {
      mhb.y -= 20
    }
  } else if (e.keyCode === 39) {
    if (mhb.x <= canvas.width - mhb.width - 10) {
      mhb.x += 20
    }
  } else if (e.keyCode === 40) {
    if (mhb.y <= canvas.height - mhb.height - 10) {
      mhb.y += 20
    }
  }
}
