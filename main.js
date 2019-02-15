//------------------------------------------------------------------------------------------------------------------------
//GENERAL CODE
//------------------------------------------------------------------------------------------------------------------------

//Settings
const zoomFactor = 1.3;
const slowSpeed = 2;
const highSpeed = 7;
let timeoutID;
let isOver = false;

//Initialising the canvas
const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 600;

//creating the board
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.img = new Image();
    this.img.src = "images/background.jpg";
    this.height = canvas.height;
    this.width = canvas.width;
  }
}

const board = new Board();

//GENERAL RE-USABLE FUNCTIONS

//Draw elements on canvas
function draw(object) {
  ctx.beginPath();
  ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  ctx.closePath();
}

//Detect collision between two objects
function collision(objA, objB) {
  return (
    objA.x < objB.x + objB.width - 15 &&
    objA.x + objA.width - 15 > objB.x &&
    objA.y < objB.y + objB.height - 10 &&
    objA.height + objA.y - 10 > objB.y
  );
}

//------------------------------------------------------------------------------------------------------------------------
//CHARACTER METHODS
//------------------------------------------------------------------------------------------------------------------------

class Object {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = width * zoomFactor;
    this.height = height * zoomFactor;
  }
}

// // Objects creation

//Load image for Marie-Helene Bourlard
const MHBimg = new Image();
MHBimg.src = "images/MHB.png";
const mhb = new Object(5, 445, 75, 75, MHBimg);

//Load image for Parliament
const parliamentImg = new Image();
parliamentImg.src = "images/parliament.png";
const parliament = new Object(canvas.width - 200, 10, 150, 100, parliamentImg);

//Load sounds
const backgroundSound = new Audio("sounds/bg-sound.wav");
const winSound = new Audio("sounds/win-sound.wav");
const loseSound = new Audio("sounds/lose-sound.wav");

//------------------------------------------------------------------------------------------------------------------------
//GREEDY BOSSES
//------------------------------------------------------------------------------------------------------------------------


class GreedyBoss {
  constructor() {
    this.img = new Image();
    this.img.src = "images/greedy-boss.png";
    this.width = 33;
    this.height = 50;
    this.x = canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - 300) + 200);
    this.isOffBoard = false;
  }

  moveUp() {
    this.y -= 2;
  }

  moveLeft() {
    this.x -= 2;
  }

  move() {
    if (
      (this.x <= 50 ||
        (this.x >= 100 && this.x <= 150) ||
        (this.x >= 200 && this.x <= 250) ||
        (this.x >= 300 && this.x <= 350) ||
        (this.x >= 400 && this.x <= 450) ||
        (this.x >= 500 && this.x <= 550) ||
        (this.x >= 600 && this.x <= 650) ||
        (this.x >= 700 && this.x <= 750) ||
        (this.x >= 800 && this.x <= 850) ||
        (this.x >= 900 && this.x <= 950) ||
        (this.x >= 1000 && this.x <= 1050) ||
        (this.x >= 1100 && this.x <= 1150) ||
        (this.x >= 1200 && this.x <= 1250) ||
        (this.x >= 1300 && this.x <= 1350) ||
        (this.x >= 1400 && this.x <= 1450) ||
        (this.x >= 1500 && this.x <= 1550) ||
        (this.x >= 1600 && this.x <= 1650) ||
        (this.x >= 1700 && this.x <= 1750)) &&
        (this.y <= 50 ||
        (this.y >= 100 && this.y <= 150) ||
        (this.y >= 200 && this.y <= 250) ||
        (this.y >= 300 && this.y <= 350) ||
        (this.y >= 400 && this.y <= 450) ||
        (this.y >= 500 && this.y <= 550) ||
        (this.y >= 600 && this.y <= 650))
    ) {
      this.moveLeft();
    } else if (
      this.y <= 50 ||
      (this.y >= 100 && this.y <= 150) ||
      (this.y >= 200 && this.y <= 250) ||
      (this.y >= 300 && this.y <= 350) ||
      (this.y >= 400 && this.y <= 450) ||
      (this.y >= 500 && this.y <= 550) ||
      (this.y >= 600 && this.y <= 650)
    ) {
      this.moveUp();
    } else if (
      this.x <= 50 ||
      (this.x >= 100 && this.x <= 150) ||
      (this.x >= 200 && this.x <= 250) ||
      (this.x >= 300 && this.x <= 350) ||
      (this.x >= 400 && this.x <= 450) ||
      (this.x >= 500 && this.x <= 550) ||
      (this.x >= 600 && this.x <= 650) ||
      (this.x >= 700 && this.x <= 750) ||
      (this.x >= 800 && this.x <= 850) ||
      (this.x >= 900 && this.x <= 950) ||
      (this.x >= 1000 && this.x <= 1050) ||
      (this.x >= 1100 && this.x <= 1150) ||
      (this.x >= 1200 && this.x <= 1250) ||
      (this.x >= 1300 && this.x <= 1350) ||
      (this.x >= 1400 && this.x <= 1450) ||
      (this.x >= 1500 && this.x <= 1550) ||
      (this.x >= 1600 && this.x <= 1650) ||
      (this.x >= 1700 && this.x <= 1750)
    ) {
      this.moveUp();
    }
    else {
      this.moveLeft()
    }
  }
}


class TopDownGreedyBoss extends GreedyBoss {
  constructor(img, width, height, x, y, isOffBoard){
    super(img, width, height, isOffBoard)
    this.x = Math.floor(Math.random() * (canvas.width-200) + 10);
    this.y = 51
  }

  moveDown() {
    this.y += 2;
  }

  moveRight() {
    this.x += 2;
  }


  move() {
    if (
      (this.x <= 50 ||
        (this.x >= 100 && this.x <= 150) ||
        (this.x >= 200 && this.x <= 250) ||
        (this.x >= 300 && this.x <= 350) ||
        (this.x >= 400 && this.x <= 450) ||
        (this.x >= 500 && this.x <= 550) ||
        (this.x >= 600 && this.x <= 650) ||
        (this.x >= 700 && this.x <= 750) ||
        (this.x >= 800 && this.x <= 850) ||
        (this.x >= 900 && this.x <= 950) ||
        (this.x >= 1000 && this.x <= 1050) ||
        (this.x >= 1100 && this.x <= 1150) ||
        (this.x >= 1200 && this.x <= 1250) ||
        (this.x >= 1300 && this.x <= 1350) ||
        (this.x >= 1400 && this.x <= 1450) ||
        (this.x >= 1500 && this.x <= 1550) ||
        (this.x >= 1600 && this.x <= 1650) ||
        (this.x >= 1700 && this.x <= 1750)) &&
        (this.y <= 50 ||
        (this.y >= 100 && this.y <= 150) ||
        (this.y >= 200 && this.y <= 250) ||
        (this.y >= 300 && this.y <= 350) ||
        (this.y >= 400 && this.y <= 450) ||
        (this.y >= 500 && this.y <= 550) ||
        (this.y >= 600 && this.y <= 650))
    ) {
      this.moveDown();
      console.log("movedown 1", this.x, this.y);
    } else if (
      this.y <= 50 ||
      (this.y >= 100 && this.y <= 150) ||
      (this.y >= 200 && this.y <= 250) ||
      (this.y >= 300 && this.y <= 350) ||
      (this.y >= 400 && this.y <= 450) ||
      (this.y >= 500 && this.y <= 550) ||
      (this.y >= 600 && this.y <= 650)
    ) {
      console.log("move right 1", this.x, this.y);
      this.moveRight();
    } else if (
      this.x <= 50 ||
      (this.x >= 100 && this.x <= 150) ||
      (this.x >= 200 && this.x <= 250) ||
      (this.x >= 300 && this.x <= 350) ||
      (this.x >= 400 && this.x <= 450) ||
      (this.x >= 500 && this.x <= 550) ||
      (this.x >= 600 && this.x <= 650) ||
      (this.x >= 700 && this.x <= 750) ||
      (this.x >= 800 && this.x <= 850) ||
      (this.x >= 900 && this.x <= 950) ||
      (this.x >= 1000 && this.x <= 1050) ||
      (this.x >= 1100 && this.x <= 1150) ||
      (this.x >= 1200 && this.x <= 1250) ||
      (this.x >= 1300 && this.x <= 1350) ||
      (this.x >= 1400 && this.x <= 1450) ||
      (this.x >= 1500 && this.x <= 1550) ||
      (this.x >= 1600 && this.x <= 1650) ||
      (this.x >= 1700 && this.x <= 1750)
    ) {
      this.moveRight();
      console.log("move right 2", this.x, this.y);
    }
    else {
      this.moveDown()
      console.log("movedown 1", this.x, this.y);

    }
  }

}

//reserve of greedyBosses
let greedyBosses = [new GreedyBoss(), new GreedyBoss(), new TopDownGreedyBoss(), new TopDownGreedyBoss()];

//This function creates new greedyBosses to be displayed
function addGreedyBosses() {
  const newGreedyBoss = new GreedyBoss();
  const newTopDownGreedyBoss = new TopDownGreedyBoss()
  greedyBosses.push(newGreedyBoss, newTopDownGreedyBoss);
}

//This function calls the addGreedyBosses function with randomIntervals
function greedyBossLoop() {
  const rand = Math.round(Math.random() * 2500) + 1500;
  timeoutID = setTimeout(function() {
    addGreedyBosses();
    if (!isOver) {
      greedyBossLoop();
    } else {
      clearTimeout(timeoutID);
      return;
    }
  }, rand);
}

function checkIfGreedyBossIsOffBoard(oneGreedyBoss) {
  if (
    oneGreedyBoss.x <= oneGreedyBoss.width ||
    oneGreedyBoss.y <= oneGreedyBoss.height ||
    oneGreedyBoss.x >= canvas.width + 50 ||
    oneGreedyBoss.y >= canvas.height + 50
  ) {
    oneGreedyBoss.isOffBoard = true;
  }
}

//----------------------------------------------------------------------------------------------------------
//GAME LOGIC AND VISUALS
//----------------------------------------------------------------------------------------------------------

let requestID;

const resetValues = () => {
  mhb.x = 5;
  mhb.y = 445;
  greedyBosses = [];
  timer = 0;
};

const startGame = () => {
  if (!isOver) {
    requestID = window.requestAnimationFrame(drawLoop);
  } else {
    endGame();
  }
};

const endGame = () => {
  window.cancelAnimationFrame(requestID);
  isOver = true;
  resetValues();
  backgroundSound.pause();
};

const drawLoop = () => {
  //erase the old drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //redraw the objects
  draw(board);
  draw(mhb);
  draw(parliament);

  for (let oneGreedyBoss of greedyBosses) {
    draw(oneGreedyBoss);
    oneGreedyBoss.move();
    checkIfGreedyBossIsOffBoard(oneGreedyBoss);
    if (collision(mhb, oneGreedyBoss)) {
      endGame();
      loseSound.play();
      return;
    }
  }

  //delete greedyBosses that are off screen
  greedyBosses = greedyBosses.filter(function(oneGreedyBoss) {
    return !oneGreedyBoss.isOffBoard;
  });

  startGame();

  //end game when mhb reaches the parliament
  if (collision(mhb, parliament)) {
    endGame();
    winSound.play();
  }
};

const startButton = document.getElementById("start-button");
startButton.onclick = () => {
  //if(!isOver){
  backgroundSound.play();
  greedyBossLoop();
  //} else {
  resetValues();
  //}
  startGame();
};

//-------------------------------------------------------------------------------------------------------------------
//USER INPUT
//-------------------------------------------------------------------------------------------------------------------
const body = document.querySelector("body");
body.onkeydown = e => {
  e.preventDefault();
  if (e.keyCode === 37) {
    if (mhb.x >= 10) {
      mhb.x -= 20;
    }
  } else if (e.keyCode === 38) {
    if (mhb.y >= 20) {
      mhb.y -= 20;
    }
  } else if (e.keyCode === 39) {
    if (mhb.x <= canvas.width - mhb.width - 10) {
      mhb.x += 20;
    }
  } else if (e.keyCode === 40) {
    if (mhb.y <= canvas.height - mhb.height - 10) {
      mhb.y += 20;
    }
  }
};
