import React, { useEffect, useState } from "react";
import "./Game.css";

const checkWinner = (arr) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
      return arr[i][0];
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (arr[0][j] && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) {
      return arr[0][j];
    }
  }
  // Check diagonals
  if (arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    return arr[0][0];
  }

  if (arr[0][2] && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    return arr[0][2];
  }
  return null;
};

export default function Game() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  function handleClick(row, col) {
    if (board[row][col] != null || winner) return;
    const newBoard = board.map((r, i) => {
      if (i !== row) return r;
      return r.map((cell, j) => (j == col ? currentPlayer : cell));
    });
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }
  function handelRestart() {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setCurrentPlayer("X");
    setWinner(null);
  }

  useEffect(() => {
    setWinner(checkWinner(board));
  }, [board]);

  const isDraw = board.flat().every((cell) => cell !== null) && !winner;
  return (
    <div className="game-board-container">
      <h1>Tic Tac Toe</h1>
      <h3>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw"
          : `Current Player: ${currentPlayer}`}
      </h3>
      <div className="game-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}${j}`}
              className={`game-cell ${
                cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""
              }`}
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button className="restart-btn" onClick={handelRestart}>
        Restart Game
      </button>
    </div>
  );
}
