// Define the game board and current player
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

// Define the winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Get all the cells on the game board
const cells = document.querySelectorAll(".cell");

// Add event listeners to the cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // Check if the cell is empty and the game is not over
    if (board[index] === "" && !isGameOver()) {
      // Update the game board with the current player's move
      board[index] = currentPlayer;
      // Update the UI with the current player's move
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      // Check if the current player has won the game
      if (checkWinner()) {
        
        alert(`Player ${currentPlayer} has won! ${lastMove} `);
      
        // Reset the game board and UI
        reset();
      } else if (isBoardFull()) {
        // Check if the game is a tie
        alert("The game is a tie!");
        // Reset the game board and UI
        reset();
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // Update the UI to show the current player's turn
        document.querySelector(".status").textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  });
});

// Check if the game is over (i.e., if a player has won or the board is full)
function isGameOver() {
  return checkWinner() || isBoardFull();
}
function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      // Add the "winner" class to the winning cells
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      // Get the last entered location term that led to the win
      let lastMove = currentPlayer === "X" ? "O" : "X";
      let winCombo = [a, b, c];
      let lastMoveIndex = winCombo.find((index) => board[index] === lastMove);

      // Alert the winning player and show the last entered location term
      alert(`Player ${currentPlayer} has won! `);
      return true;
    }
  }
  return false;
}


// Check if the game board is full
function isBoardFull() {
  return board.every((cell) => cell !== "");
}

// Reset the game board and UI
function reset() {
  board.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winner");
  });
  currentPlayer = "X";
  // Update the UI to show the current player's turn
  document.querySelector(".status").textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listener to the reset button
document.querySelector(".reset").addEventListener("click", () => {
  reset();
});
