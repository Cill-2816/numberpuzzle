
const startbtn = document.getElementById("start-btn");
const timer = document.querySelector(".time");
const arrows = document.querySelectorAll(".arrow");
const gameBoard = document.querySelector(".game-board");

let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let arrowactive = false;
let id = 1;

function addRow() {
  const tbody = document.querySelector("#mytable tbody");
  const newRow = document.createElement("tr");
  const cellId = document.createElement("td");
  const cellCount = document.createElement("td");
  const cellTime = document.createElement("td");
  
  cellId.textContent = id++;
  cellCount.textContent = count;
  cellTime.textContent = hours+":"+minutes+":"+seconds;''
  
  newRow.appendChild(cellId);
  newRow.appendChild(cellCount);
  newRow.appendChild(cellTime);
  tbody.appendChild(newRow);
}

function resetBoard() {
  const tiles = document.querySelectorAll(".game-board div");
  tiles.forEach((tile, index) => {
      if (index === 11) {
          tile.innerHTML = "";
          tile.className = "tile empty";
      } else {
          tile.innerHTML = (index + 1).toString();
          tile.className = `bg-${getColor(index)}-100 text-${getColor(index)}-500 px-4 py-2 rounded`;
      }
  });
}

function getColor(index) {
  const colors = ['green', 'red', 'blue', 'purple', 'pink', 'yellow', 'indigo', 'gray', 'emerald', 'amber', 'lime'];
  return colors[index];
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    let formattedTime =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

    timer.innerHTML = formattedTime;
}

function moveEmptyTile(direction) {
    const emptyTile = document.querySelector(".empty");
    const tiles = document.querySelectorAll(".game-board div");
    const currentIndex = Array.from(tiles).indexOf(emptyTile);
    let targetIndex;

    switch(direction) {
        case "up":
            targetIndex = currentIndex - 4;
            if (targetIndex < 0) return;
            break;
        case "down":
            targetIndex = currentIndex + 4;
            if (targetIndex > 11) return;
            break;
        case "left":
            targetIndex = currentIndex - 1;
            if (currentIndex % 4 === 0) return;
            break;
        case "right":
            targetIndex = currentIndex + 1;
            if (currentIndex % 4 === 3) return;
            break;
    }

    const targetTile = tiles[targetIndex];
    if (targetTile) {
        const tempHTML = targetTile.innerHTML;
        const tempClass = targetTile.className;
        
        targetTile.innerHTML = "";
        targetTile.className = "tile empty";
        
        emptyTile.innerHTML = tempHTML;
        emptyTile.className = tempClass;
    }

    count++;
}
let count = 0;

const directions = ["up", "down", "left", "right"];

function checkWin() {
  const tiles = document.querySelectorAll(".game-board div");
  for (let i = 0; i < 11; i++) {
      if (tiles[i].innerHTML !== (i + 1).toString()) {
          return false;
      }
  }
  return tiles[11].classList.contains("empty");
}

function showAlert() {
  Swal.fire({
      title: "YOU WIN!",
      text: "Chúc mừng! Bạn đã THẮNG với "+count+" bước trong "+hours+":"+minutes+":"+seconds,
      confirmButtonText: "OK"
  });
}

document.addEventListener("keydown", function(event) {
  
  if (arrowactive) {
    event.preventDefault();
    switch(event.key) {
      case "ArrowUp": case "w": case "W": moveEmptyTile("up"); break;
      case "ArrowDown": case "s": case "S": moveEmptyTile("down"); break;
      case "ArrowLeft": case "a": case "A": moveEmptyTile("left"); break;
      case "ArrowRight": case "d": case "D": moveEmptyTile("right"); break;
      default: break;
    }
    if (checkWin()) {
      clearInterval(timerInterval);
      startbtn.innerText = "Chơi lại";
      startbtn.style.backgroundColor ="rgb(23, 129, 23)";
      showAlert();
      addRow();
      resetBoard();
      arrowactive = false;
      
    }
  }
});



startbtn.addEventListener("click", () => {
  if (startbtn.innerText === "Bắt đầu" || startbtn.innerText === "Chơi lại") {
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerInterval = setInterval(updateTimer, 1000);
    startbtn.style.backgroundColor ="rgb(188, 34, 34)";
    startbtn.innerText = "Kết thúc";
    arrowactive = true;
    count = 0;

    while (count <100)
    {
      const randomIndex = Math.floor(Math.random() * directions.length);
      moveEmptyTile(directions[randomIndex]);
    }
    count = 0;

  } else {
    arrowactive = false;
    clearInterval(timerInterval);
    startbtn.innerText = "Bắt đầu";
    startbtn.style.backgroundColor ="rgb(23, 129, 23)";
    resetBoard();
  }
});



