// Define winning combinations
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

// Check if the board is full (draw)
const isDraw = (board) => {
  return board.every((cell) => cell !== null);
};

// Check if a given mark ("X" or "O") has won
const checkWinner = (board, mark) => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === mark && board[b] === mark && board[c] === mark) {
      return true;
    }
  }
  return false;
};

// Simple AI to get the best move for "O" aka NPC
const getBestMove = (board, player) => {
  const opponent = player === "X" ? "O" : "X";
  const aiMoves = board.filter((cell) => cell === player).length;

  // Win if possible
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = player;
      if (checkWinner(newBoard, player)) return i;
    }
  }

  // Block opponent
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = opponent;
      if (checkWinner(newBoard, opponent)) return i;
    }
  }

  // Skip center on first AI move
  if (aiMoves > 0 && board[4] === null) return 4;

  // Corner
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === null) return corner;
  }

  // Any open space
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) return i;
  }

  return null;
};

export { checkWinner, getBestMove, isDraw };
