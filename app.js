document.onkeydown = checkKey;
const gameBoard = document.getElementById("game-board");
const btnRestart = document.getElementById("btnRestart");
const btnUndo = document.getElementById("btnUndo");
let numbers = [];
let checkIterationOnDesk = false;
let stateEachElement = [];

const createArrayNumbers = () => {
  let number = Math.random() > 0.5 ? 1 : 2;
  for (let i = 0; number > numbers.length; i++) {
    numbers[i] = Math.random() > 0.5 ? 2 : 4;
  }
  return numbers;
};
const createDiv = () => {
  for (let i = 0; i < 16; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    gameBoard.appendChild(div);
  }
};
const iterateDiv = () => {
  numbers.forEach((element) => {
    const getDiv = document.getElementsByClassName("tile");
    const rand = Math.round(Math.random() * 15);
    getDiv[rand].textContent = element;
    getDiv[rand].setAttribute("data-value", element);
  });
};
const gameOver = () => {
  const getDiv = document.getElementsByClassName("tile");
  [...getDiv].forEach((element) => {
    element.textContent = null;
    element.removeAttribute("data-value");
  });
  addElementDiv();
};
const state = () => {
  const getDiv = document.getElementsByClassName("tile");
  stateEachElement = [...getDiv].map((element) => element.textContent);
};
const undo = () => {
  const getDiv = document.getElementsByClassName("tile");
  for (let i = 0; i < getDiv.length; i++) {
    getDiv[i].textContent = stateEachElement[i];
    getDiv[i].setAttribute("data-value", stateEachElement[i]);
  }
};
const addElementDiv = () => {
  const getDiv = document.getElementsByClassName("tile");
  const arrayWithoutNumbers = [...getDiv].filter(
    (element) => !element.hasAttribute("data-value")
  );
  let yourScore = [...getDiv].reduce((acc, item) => {
    let value = parseInt(item.textContent) || 0;
    return acc > value ? acc : value;
  }, 0);
  if (yourScore == 2048) alert("You are a winner!!!");
  if (arrayWithoutNumbers.length == 0) {
    alert(`Game Over! Your score: ${yourScore}`);
    gameOver();
  } else {
    const rand = Math.floor(Math.random() * arrayWithoutNumbers.length);
    let number = Math.random() > 0.5 ? 2 : 4;
    arrayWithoutNumbers[rand].textContent = number;
    arrayWithoutNumbers[rand].setAttribute("data-value", number);
  }
};
const sortAndAddNumbersInArray = (arrayLine, reverse = false) => {
  let arrayTrue = [];
  let arrayFalse = [];
  if (!reverse) {
    for (let i = 0; i < arrayLine.length; i++) {
      if (arrayLine[i].hasAttribute("data-value")) {
        arrayTrue.push(arrayLine[i]);
      } else {
        arrayFalse.push(arrayLine[i]);
      }
    }
  } else {
    for (let i = arrayLine.length - 1; i >= 0; i--) {
      if (arrayLine[i].hasAttribute("data-value")) {
        arrayTrue.push(arrayLine[i]);
      } else {
        arrayFalse.push(arrayLine[i]);
      }
    }
  }
  arrayFalse.forEach((element) => {
    arrayTrue.push(element);
  });
  let numbersFromTrue = arrayTrue.map((element) =>
    parseInt(element.textContent)
  );
  for (let i = 0; i < numbersFromTrue.length - 1; i++) {
    if (
      numbersFromTrue[i] === numbersFromTrue[i + 1] &&
      numbersFromTrue[i] !== 0
    ) {
      numbersFromTrue[i] *= 2;
      numbersFromTrue.splice(i + 1, 1);
      numbersFromTrue.push(0);
    }
  }
  return numbersFromTrue;
};

const moveUP = (columnIndex) => {
  const getDiv = document.getElementsByClassName("tile");
  const arrayLine = [...getDiv].filter((_, index) => index % 4 === columnIndex);

  let numbersFromTrue = sortAndAddNumbersInArray(arrayLine);

  numbersFromTrue.forEach((element) => {
    if (element) {
      getDiv[columnIndex].textContent = element;
      getDiv[columnIndex].setAttribute("data-value", element);
    } else {
      getDiv[columnIndex].textContent = null;
      getDiv[columnIndex].removeAttribute("data-value");
    }
    columnIndex += 4;
  });
};

const moveDown = (columnIndex) => {
  const getDiv = document.getElementsByClassName("tile");
  const arrayLine = [...getDiv].filter((_, index) => index % 4 === columnIndex);

  let numbersFromTrue = sortAndAddNumbersInArray(arrayLine, true);

  columnIndex = 16 + columnIndex;
  numbersFromTrue.forEach((element) => {
    columnIndex -= 4;
    if (element) {
      getDiv[columnIndex].textContent = element;
      getDiv[columnIndex].setAttribute("data-value", element);
    } else {
      getDiv[columnIndex].textContent = null;
      getDiv[columnIndex].removeAttribute("data-value");
    }
  });
};

const moveLeft = (columnIndex) => {
  const getDiv = document.getElementsByClassName("tile");
  const arrayLine = [...getDiv].filter(
    (_, index) => index > columnIndex - 1 && index < columnIndex + 4
  );

  let numbersFromTrue = sortAndAddNumbersInArray(arrayLine);

  numbersFromTrue.forEach((element) => {
    if (element) {
      getDiv[columnIndex].textContent = element;
      getDiv[columnIndex].setAttribute("data-value", element);
    } else {
      getDiv[columnIndex].textContent = "";
      getDiv[columnIndex].removeAttribute("data-value");
    }
    columnIndex += 1;
  });
};

const moveRight = (columnIndex) => {
  const getDiv = document.getElementsByClassName("tile");
  const arrayLine = [...getDiv].filter(
    (_, index) => index > columnIndex - 1 && index < columnIndex + 4
  );

  let numbersFromTrue = sortAndAddNumbersInArray(arrayLine, true);

  columnIndex = 4 + columnIndex;
  numbersFromTrue.forEach((element) => {
    columnIndex -= 1;
    if (element) {
      getDiv[columnIndex].textContent = element;
      getDiv[columnIndex].setAttribute("data-value", element);
    } else {
      getDiv[columnIndex].textContent = null;
      getDiv[columnIndex].removeAttribute("data-value");
    }
  });
};

createArrayNumbers();
createDiv();
iterateDiv();

function checkKey(e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 38:
      state();
      moveUP(0);
      moveUP(1);
      moveUP(2);
      moveUP(3);
      addElementDiv();
      break;
    case 40:
      moveDown(0);
      moveDown(1);
      moveDown(2);
      moveDown(3);
      addElementDiv();
      break;
    case 37:
      moveLeft(0);
      moveLeft(4);
      moveLeft(8);
      moveLeft(12);
      addElementDiv();
      break;
    case 39:
      moveRight(0);
      moveRight(4);
      moveRight(8);
      moveRight(12);
      addElementDiv();
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
  });

  function handleSwipe() {
    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        checkKey({ keyCode: 39 });
      } else if (diffX < -50) {
        checkKey({ keyCode: 37 });
      }
    } else {
      if (diffY > 50) {
        checkKey({ keyCode: 40 });
      } else if (diffY < -50) {
        checkKey({ keyCode: 38 });
      }
    }
  }
});

document.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
btnRestart.addEventListener("click", gameOver);
btnUndo.addEventListener("click", undo);
