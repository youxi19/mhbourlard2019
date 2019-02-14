//------------------------------------------------------------------------------------------------------------------------
//GENERAL CODE
//------------------------------------------------------------------------------------------------------------------------

//Settings
const zoomFactor = 1.3
const slowSpeed = 2
const highSpeed = 7


//Initialising the canvas
const canvas = document.getElementById("gameboard")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
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
    objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.height + objA.y > objB.y
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
    this.width = width * zoomFactor
    this.height = height * zoomFactor
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

//Load image for greedyBoss
const greedyBossImg = new Image()
greedyBossImg.src = "images/greedy-boss.png"
const greedyBoss1 = new Object(canvas.width - 200, 180, 33, 50, greedyBossImg)
const greedyBoss2 = new Object(200, 100, 33, 50, greedyBossImg)
const greedyBoss3 = new Object(canvas.width - 500, 400, 33, 50, greedyBossImg)

//Load sounds
const backgroundSound = new Audio("sounds/bg-sound.wav")
const winSound = new Audio("sounds/win-sound.wav")

// //------------------------------------------------------------------------------------------------------------------------
// //CHARACTERS PROJECTILES
// //------------------------------------------------------------------------------------------------------------------------

// //TWEETS object and methods
// class Tweet {
//   constructor() {
//     this.x = trump.x + trump.width + 5;
//     this.y = trump.y + 25;
//     this.img = new Image();
//     this.img.src = "./images/Logo-Twitter.png";
//     this.height = 24;
//     this.width = 30;
//     this.isIntercepted = false;
//   }

//   move() {
//     this.x += highSpeed;
//   }
// }

// //Create a second type of tweets that will move slower

// class SlowTweet extends Tweet {
//   constructor(x, img, width, height, isIntercepted) {
//     super(x, img, width, height, isIntercepted);
//     this.y = trump.y + 45;
//   }

//   move() {
//     this.x += slowSpeed;
//   }
// }

// //ROCKETS object and methods
// class Rocket {
//   constructor() {
//     this.x = kim.x;
//     this.y = kim.y + 75;
//     this.img = new Image();
//     this.img.src = "./images/Rocket.png";
//     this.width = 30;
//     this.height = 30;
//     this.isIntercepted = false;
//   }

//   move() {
//     this.x -= highSpeed;
//   }
// }

// //Create a second type of rockets that will move slower

// class SlowRocket extends Rocket {
//   constructor(x, img, width, height, isIntercepted) {
//     super(x, img, width, height, isIntercepted);
//     this.y = kim.y + 30;
//   }

//   move() {
//     this.x -= slowSpeed;
//   }
// }

// //HAVE THE CHARACTERS RANDOMLY SHOOT PROJECTILES
// let tweets = [];
// let rockets = [];

// //This function adds amo in the array that will serve as a reserve for shootings
// function addTweets() {
//   const newTweet = new Tweet();
//   const newSlowTweet = new SlowTweet();
//   tweets.push(newTweet);
//   tweets.push(newSlowTweet);
// }

// function addRockets() {
//   const newRocket = new Rocket();
//   const newSlowRocket = new SlowRocket();
//   rockets.push(newRocket);
//   rockets.push(newSlowRocket);
// }

// //This self-calling function calls the addTweets and addRockets functions with randomIntervals
// (function tweetLoop() {
//   const rand = Math.round(Math.random() * (6000 - 2000)) + 2000;
//   setTimeout(function() {
//     addTweets();
//     tweetLoop();
//   }, rand);
// })();

// (function rocketLoop() {
//   const rand = Math.round(Math.random() * (6000 - 2000)) + 2000;
//   setTimeout(function() {
//     addRockets();
//     rocketLoop();
//   }, rand);
// })();

// //------------------------------------------------------------------------------------------------------------------------
// //USER BAR OBJECT AND METHODS
// //------------------------------------------------------------------------------------------------------------------------

// //User Bar Prototype
// class UserBar {
//   constructor() {
//     this.x = canvas.width / 2;
//     this.y = canvas.height - 80;
//     this.img = new Image();
//     this.img.src = "./images/HeartBar.png";
//     this.height = 60 * zoomFactor;
//     this.width = 60 * zoomFactor;
//   }

//   shoot() {
//     const newHeart = new Heart();
//     hearts.push(newHeart);
//   }
// }

// //Creation of the userBar
// const userBar = new UserBar();
// const hearts = [];

// //Heart Projectile Object and methods
// class Heart {
//   constructor() {
//     this.x = userBar.x;
//     this.y = userBar.y;
//     this.img = new Image();
//     this.img.src = "./images/like.png";
//     this.width = 30;
//     this.height = 30;
//   }

//   move() {
//     this.y -= 15;
//   }
// }

// //----------------------------------------------------------------------------------------------------------
// //GAME LOGIC AND VISUALS
// //----------------------------------------------------------------------------------------------------------

let requestID

const drawLoop = () => {
    requestID = undefined
    //erase the old drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //redraw the background, the characters and user bar
    draw(board)
    draw(mhb)
    draw(parliament)
    draw(greedyBoss1)
    draw(greedyBoss2)
    draw(greedyBoss3)

    startGame()
    //Manage hearts, rockets and tweets drawing and collisions
    if(collision(mhb, parliament)){
      endGame()
      winSound.play()
    }
    
}

const startGame = () => {
  if (!requestID) {
    requestID = window.requestAnimationFrame(drawLoop)
 }
}

const endGame = () => {
  if (requestID) {
    window.cancelAnimationFrame(requestID)
    requestID = undefined
 }
 backgroundSound.pause()
}

const startButton = document.getElementById("start-button")
startButton.onclick = ()=>{
  backgroundSound.play()
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
    if (mhb.x <= (canvas.width - mhb.width - 10)) {
      mhb.x += 20
    }
  } else if (e.keyCode === 40) {
    if (mhb.y <= (canvas.height - mhb.height - 10)) {
      mhb.y += 20
    }
  }
}
