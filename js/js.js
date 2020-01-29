//how to play audio files: https://www.computerhilfen.de/info/audio-ton-ausgabe-im-browser-mit-html-5.html
const firstBell = new Audio('sounds/firstBell.mp3');
const secondBell = new Audio('sounds/secondBell.mp3');
const thirdBell = new Audio('sounds/thirdBell.mp3');
const fourthBell = new Audio('sounds/fourthBell.mp3');
const error = new Audio('sounds/error.mp3');
const complete = new Audio('sounds/complete.mp3');

// function for a timesleep: https://www.heise.de/tipps-tricks/JavaScript-Sleep-und-setTimeout-4060840.html
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Using a framework for alerts: https://alertifyjs.com/
// dialog after finishing the game:
function JSalert() {
  alertify.alert("Oh, that was not right!");
  complete.play();
  alertify.alert(`You remembered ${rightClicks} bulbs correctly! <br>
  Your final score: ${points} + bonus (${bonus}) = \n${endPoints} points! <br>
  Congratulation!`);
}

const button = document.querySelector('button');

button.addEventListener('click', play);

const firstBulb = document.querySelector('.firstBulb');
const secondBulb = document.querySelector('.secondBulb');
const thirdBulb = document.querySelector('.thirdBulb');
const fourthBulb = document.querySelector('.fourthBulb');

function shuffle() {
  randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

let bulbList = [];

function play() {
  showRightClicks.textContent = (0).toString();
  button.removeEventListener('click', play);
  newRound();
}

function userRound() {
  firstBulb.addEventListener('click', addToUserList);
  secondBulb.addEventListener('click', addToUserList);
  thirdBulb.addEventListener('click', addToUserList);
  fourthBulb.addEventListener('click', addToUserList);
  allBulbs.forEach(function(bulb) {
    bulb.setAttribute('style', 'cursor: pointer');
  })
}

async function newRound() {
  shuffle();
  console.log(randomNumber);
  bulbList.push(randomNumber);

  for (const bulb of bulbList) {
    if (bulb === 0) {
      firstBulb.setAttribute('style', 'background-image: url("img/bulb-red.png")');
      firstBell.play();
      await Sleep(1000); // pause for 1 sec
      firstBulb.removeAttribute('style', 'background-image');
      firstBell.pause();
      firstBell.currentTime = 0;
    }
    if (bulb === 1) {
      secondBulb.setAttribute('style', 'background-image: url("img/bulb-blue.png")');
      secondBell.play();
      await Sleep(1000); // pause for 1 sec
      secondBulb.removeAttribute('style', 'background-image');
      secondBell.pause();
      secondBell.currentTime = 0;
    }
    if (bulb === 2) {
      thirdBulb.setAttribute('style', 'background-image: url("img/bulb-yellow.png")');
      thirdBell.play();
      await Sleep(1000); // pause for 1 sec
      thirdBulb.removeAttribute('style', 'background-image');
      thirdBell.pause();
      thirdBell.currentTime = 0;
    }
    if (bulb === 3) {
      fourthBulb.setAttribute('style', 'background-image: url("img/bulb-green.png")');
      fourthBell.play();
      await Sleep(1000); // pause for 1 sec
      fourthBulb.removeAttribute('style', 'background-image');
      fourthBell.pause();
      fourthBell.currentTime = 0;
    }
    await Sleep(500);
  }
  userRound();
}

let userList = [];
const allBulbs = [firstBulb, secondBulb, thirdBulb, fourthBulb];

const firstBulbObject = {
  number: 0,
  img: 'background-image: url("img/bulb-red.png")',
  box: firstBulb,
  sound: firstBell
};

const secondBulbObject = {
  number: 1,
  img: 'background-image: url("img/bulb-blue.png")',
  box: secondBulb,
  sound: secondBell
};

const thirdBulbObject = {
  number: 2,
  img: 'background-image: url("img/bulb-yellow.png")',
  box: thirdBulb,
  sound: thirdBell
};

const fourthBulbObject = {
  number: 3,
  img: 'background-image: url("img/bulb-green.png")',
  box: fourthBulb,
  sound: fourthBell
};

async function addToUserList(event) {
  console.log(event);
  if (event.originalTarget.className == "box firstBulb") {
    bulbObject = firstBulbObject;
  }
  else if (event.originalTarget.className == "box secondBulb") {
    bulbObject = secondBulbObject;
  }
  else if (event.originalTarget.className == "box thirdBulb") {
    bulbObject = thirdBulbObject;
  }
  else if (event.originalTarget.className == "box fourthBulb") {
    bulbObject = fourthBulbObject;
  }
  console.log(bulbObject);
  userList.push(bulbObject.number);
  console.log(' userList = ' + userList);
  console.log(' bulbList:' + bulbList);
  bulbObject.box.setAttribute('style', bulbObject.img);
  bulbObject.sound.play();
  await Sleep(1000); // pause for 1 sec
  bulbObject.box.removeAttribute('style', 'background-image');
  bulbObject.sound.pause();
  bulbObject.sound.currentTime = 0;
  checkClick();
}

let rightClicks = 0;
let points = 0;
let bonus = 0;
let endPoints = 0;
const showRightClicks = document.querySelector('.rightClicksNumber');
const showHighscore = document.querySelector('.highscoreNumber');

async function checkClick() {
  let clickTracker = userList.length - 1;
  console.log('clickTracker: ' + clickTracker);
  if (bulbList[clickTracker] !== userList[clickTracker]) {
    allBulbs.forEach(function (bulb) {
      bulb.removeEventListener('click', addToUserList);
    });
    rightClicks = bulbList.length - 1;
    points = rightClicks * 10;
    if (rightClicks >= 3) {
      bonus = bonus + 20;
    }
    if (rightClicks >= 6) {
      bonus = bonus + 40;
    }
    if (rightClicks >= 9) {
      bonus = bonus + 100;
    }
    if (rightClicks >= 12) {
      bonus = bonus + 200;
    }
    if (rightClicks >= 15) {
      bonus = bonus + 400;
    }
    endPoints = points + bonus;
    showHighscore.textContent = endPoints.toString();
    bulbList = [];
    userList = [];
    button.addEventListener('click', play);
    error.play();
    await Sleep(1000); // pause for 1 sec
    console.log('That was wrong!');
    console.log(`You remembered ${rightClicks} bulbs correctly!`);
    JSalert();
  }
  else if (clickTracker === bulbList.length - 1) {
    showRightClicks.textContent = (clickTracker+1).toString();
    allBulbs.forEach(function (bulb) {
      bulb.removeEventListener('click', addToUserList);
      bulb.removeAttribute('style', 'cursor: pointer');
    });
    userList = [];
    await Sleep(2000);
    newRound();
  }

}

