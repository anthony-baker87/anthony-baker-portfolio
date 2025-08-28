"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { checkWinner, getBestMove, isDraw } from "@/utils/ai/ticTacToe";
import Button from "@/components/Button/Button";

const TicTacToe = () => {
  const [playerTurn, setPlayerTurn] = useState("1");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isWin, setIsWin] = useState(false);

  const handleClick = (cellValue, index) => {
    if (isWin || cellValue || playerTurn !== "1") return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    if (checkWinner(newBoard, "X")) {
      setIsWin(true);
      return;
    }

    if (isDraw(newBoard)) {
      setIsWin(true);
      setPlayerTurn("0");
      return;
    }

    setPlayerTurn("2");

    setTimeout(() => {
      const aiMove = getBestMove(newBoard, "O");
      if (aiMove !== null) {
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);

        if (checkWinner(aiBoard, "O")) {
          setIsWin(true);
          return;
        }

        if (isDraw(aiBoard)) {
          setIsWin(true);
          setPlayerTurn("0");
          return;
        }
      }
      setPlayerTurn("1");
    }, 500);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsWin(false);
    setPlayerTurn("1");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TIC-TAC-TOE</h1>
      <p>See if you can beat the NPC</p>
      <div className={styles.status}>
        {isWin
          ? playerTurn === "0"
            ? "Cat's game!"
            : `Player ${playerTurn} wins!`
          : `It is Player ${playerTurn}'s turn.`}
      </div>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {board.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleClick(cell, index)}
              className={styles.cell}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.resetWrapper}>
        <Button
          title="RESET"
          onClick={handleReset}
          className={styles.resetButton}
        />
      </div>
    </div>
  );
};

export default TicTacToe;
