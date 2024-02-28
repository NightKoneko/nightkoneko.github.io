let statusDisplay = document.querySelector('.gamestatus');

let gameActive = true;

let currentPlayer = "X";

let normal = ["", "", "", "", "", "", "", "", ""];

let winningMessage = function() { return `${currentPlayer} has won!`; }
let currentPlayersTurn = function() { return `${currentPlayer}'s turn`; }
let drawerMessage = function() { return `The game has ended in a draw!`; }
statusDisplay.innerHTML = currentPlayersTurn();

let conditionsforwinning = [
    [2, 4, 6],
    [3, 4, 5],
    [0, 1, 2],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [6, 7, 8],
];

function cellPlayed(activatedCell, activatedCellIndex) {

    normal[activatedCellIndex] = currentPlayer;
    activatedCell.innerHTML = currentPlayer;
}

function resultValidation() {
    let winRound = false;
    for (let i = 0; i <= 7; i++) {
        winConditon = conditionsforwinning[i];
        let cat = normal[winConditon[0]];
        let kitten = normal[winConditon[1]];
        let meow = normal[winConditon[2]];
        if (cat === '' || kitten === '' || meow === '') {
            continue;
        }
        if (cat === kitten && kitten === meow) {
            winRound = true;
            break
        }
    }
  

function playerChange() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayersTurn();
}

if (winRound) {
        statusDisplay.innerHTML = winningMessage();
        var audio1 = new Audio('sounds/victory_sJDDywi.mp3');
        audio1.play();
        gameActive = false;
        return;
    }

  let roundDraw = !normal.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawerMessage();
        var audio2 = new Audio('sounds/defeat.mp3');
        audio2.play();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClick(activatedCellEvent) {
   
    activatedCell = activatedCellEvent.target;

    activatedCellIndex = parseInt(
      activatedCell.getAttribute('data-cell-index')
    );

    if (normal[activatedCellIndex] !== "" || !gameActive) {
        return;
    }
 
    cellPlayed(activatedCell, activatedCellIndex);
    resultValidation();
}

function restartGame() {
    currentPlayer = "X";
    statusDisplay.innerHTML = currentPlayersTurn();
    normal = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(function(cell) { cell.innerHTML = ""});
    gameActive = true;
}

document.querySelectorAll('.cell').forEach(function(cell) { cell.addEventListener('click', cellClick)});
document.querySelector('.restartgame').addEventListener('click', restartGame);