"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Game.module.css";

const choices = ["rock", "paper", "scissors"];

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [score, setScore] = useState(0);

  const handleClick = (choice) => {
    const randomComputerChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(randomComputerChoice);

    if (choice === randomComputerChoice) return;

    if (
      (choice === "rock" && randomComputerChoice === "scissors") ||
      (choice === "paper" && randomComputerChoice === "rock") ||
      (choice === "scissors" && randomComputerChoice === "paper")
    ) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  const getImageSrc = (choice) => `/images/rockPaperScissors/${choice}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.choices}>
        <div className={styles.choicesTitle}>Your Choices</div>
        {choices.map((choice) => (
          <div
            key={choice}
            className={styles.choiceRow}
            onClick={() => handleClick(choice)}
          >
            <span className={styles.choiceLabel}>
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </span>
            <Image
              src={getImageSrc(choice)}
              alt={choice}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>

      <div className={styles.score}>
        <h2>Score</h2>
        <p>{score}</p>
        {playerChoice && computerChoice && (
          <p>
            You chose: {playerChoice} | Computer chose: {computerChoice}
          </p>
        )}
      </div>

      <div className={styles.choices}>
        {computerChoice ? (
          <div className={styles.choiceRow}>
            <Image
              src={getImageSrc(computerChoice)}
              alt={computerChoice}
              width={80}
              height={80}
            />
            <span className={styles.choiceLabel}>
              {computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}
            </span>
          </div>
        ) : (
          choices.map((choice) => (
            <div key={choice} className={styles.choiceRow}>
              <Image
                src={getImageSrc(choice)}
                alt={choice}
                width={80}
                height={80}
              />
              <span className={styles.choiceLabel}>
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
