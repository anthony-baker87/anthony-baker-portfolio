"use client";
import React, { useState, useEffect } from "react";
import { deck } from "./util";
import styles from "./page.module.css";

const Blackjack = () => {
  const [gameDeck, setGameDeck] = useState(deck);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerStay, setPlayerStay] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const calculateScore = (cards) => {
    let total = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.name === "A") {
        aces += 1;
        total += 11;
      } else if (["K", "Q", "J"].includes(card.name)) {
        total += 10;
      } else {
        total += card.value;
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }

    return total;
  };

  // --- SCORE UPDATES ---
  useEffect(() => {
    const pScore = calculateScore(playerCards);
    const dScore = calculateScore(dealerCards);
    setPlayerScore(pScore);
    setDealerScore(dScore);

    // --- Check for immediate game-ending conditions ---
    if (gameStarted && !gameResult) {
      // Player bust
      if (pScore > 21) {
        setGameResult("Player busts! Dealer wins.");
        setPlayerTurn(false);
      }

      // Dealer blackjack
      if (dScore === 21 && dealerCards.length === 2) {
        setGameResult("Dealer has Blackjack! Dealer wins.");
        setPlayerTurn(false);
      }

      // Player blackjack
      if (pScore === 21 && playerCards.length === 2) {
        if (dScore === 21 && dealerCards.length === 2) {
          setGameResult("Both have Blackjack! Push.");
        } else {
          setGameResult("Blackjack! Player wins!");
        }
        setPlayerTurn(false);
      }
    }
  }, [playerCards, dealerCards]);

  // --- DEAL ---
  const deal = () => {
    const newDeck = [...deck];
    shuffle(newDeck);

    const firstPlayerCard = newDeck.pop();
    const firstDealerCard = newDeck.pop();
    const secondPlayerCard = newDeck.pop();
    const secondDealerCard = newDeck.pop();

    setGameDeck(newDeck);
    setPlayerCards([firstPlayerCard, secondPlayerCard]);
    setDealerCards([firstDealerCard, secondDealerCard]);
    setGameResult(null);
    setPlayerStay(false);
    setGameStarted(true);
    setPlayerTurn(true);
  };

  // --- HIT ---
  const hit = () => {
    if (!playerTurn || gameResult) return;

    const newDeck = [...gameDeck];
    const hitCard = newDeck.pop();
    const updatedCards = [...playerCards, hitCard];
    setPlayerCards(updatedCards);
    setGameDeck(newDeck);

    const newScore = calculateScore(updatedCards);
    if (newScore > 21) {
      setPlayerScore(newScore);
      setGameResult("Player busts! Dealer wins.");
      setPlayerTurn(false);
    } else if (newScore === 21) {
      // Auto stay on 21
      setPlayerScore(newScore);
      setPlayerTurn(false);
      setPlayerStay(true);
      dealerLogic(newDeck);
    }
  };

  // --- STAY ---
  const stay = () => {
    if (!playerTurn) return;
    setPlayerStay(true);
    setPlayerTurn(false);
    dealerLogic(gameDeck);
  };

  // --- SHUFFLE ---
  const shuffle = (deckArray) => {
    for (let i = deckArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]];
    }
  };

  // --- DEALER LOGIC ---
  const dealerLogic = async (currentDeck) => {
    let newDeck = [...currentDeck];
    let newDealerCards = [...dealerCards];
    let newDealerScore = calculateScore(newDealerCards);

    // Dealer must hit until 17 or higher
    while (newDealerScore < 17) {
      await new Promise((r) => setTimeout(r, 800));
      const newCard = newDeck.pop();
      newDealerCards.push(newCard);
      newDealerScore = calculateScore(newDealerCards);
      setDealerCards([...newDealerCards]);
      setDealerScore(newDealerScore);

      // Stop early if dealer hits blackjack
      if (newDealerScore === 21) break;
    }

    setGameDeck(newDeck);
    decideWinner(newDealerScore);
  };

  // --- DETERMINE WINNER ---
  const decideWinner = (dealerFinal) => {
    const playerFinal = calculateScore(playerCards);

    if (playerFinal > 21) {
      setGameResult("Player busts! Dealer wins.");
    } else if (dealerFinal > 21) {
      setGameResult("Dealer busts! Player wins!");
    } else if (dealerFinal === playerFinal) {
      setGameResult("Push! It's a tie.");
    } else if (dealerFinal === 21) {
      setGameResult("Dealer has 21! Dealer wins.");
    } else if (dealerFinal > playerFinal) {
      setGameResult("Dealer wins!");
    } else {
      setGameResult("Player wins!");
    }
  };

  return (
    <div className={styles.blackjackContainer}>
      <h1>Blackjack</h1>

      <div className={styles.tableContainer}>
        <div className={styles.dealerContainer}>
          <h2>Dealer</h2>
          {dealerCards.map((card, key) => (
            <div key={key}>{card.name}</div>
          ))}
          <div>Score: {dealerScore}</div>
        </div>

        <div className={styles.playerContainer}>
          <h2>Player</h2>
          {playerCards.map((card, key) => (
            <div key={key}>{card.name}</div>
          ))}
          <div>Score: {playerScore}</div>
        </div>
      </div>

      <div className={styles.hudContainer}>
        <button onClick={deal} className={styles.dealButton}>
          Deal
        </button>
        {gameStarted && playerTurn && !gameResult && (
          <>
            <button onClick={hit}>Hit</button>
            <button onClick={stay}>Stay</button>
          </>
        )}
      </div>

      {gameResult && <div className={styles.result}>{gameResult}</div>}
    </div>
  );
};

export default Blackjack;
