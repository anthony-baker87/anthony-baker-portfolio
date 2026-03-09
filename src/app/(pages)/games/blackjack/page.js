"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const SUITS = ["S", "H", "D", "C"];
const RANKS = [
  { label: "A", value: 11 },
  { label: "K", value: 10 },
  { label: "Q", value: 10 },
  { label: "J", value: 10 },
  { label: "10", value: 10 },
  { label: "9", value: 9 },
  { label: "8", value: 8 },
  { label: "7", value: 7 },
  { label: "6", value: 6 },
  { label: "5", value: 5 },
  { label: "4", value: 4 },
  { label: "3", value: 3 },
  { label: "2", value: 2 },
];

const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.label}-${suit}-${Math.random().toString(36).slice(2, 8)}`,
        suit,
        rank: rank.label,
        value: rank.value,
      });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  const next = [...deck];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const calculateHandValue = (hand) => {
  let total = hand.reduce((sum, card) => sum + card.value, 0);
  let aceCount = hand.filter((card) => card.rank === "A").length;

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount -= 1;
  }

  return total;
};

const dealCard = (deck) => {
  const [card, ...rest] = deck;
  return { card, deck: rest };
};

const getOverallResult = (outcomes) => {
  if (outcomes.every((o) => o === "win")) return "player";
  if (outcomes.every((o) => o === "lose")) return "dealer";
  if (outcomes.every((o) => o === "push")) return "push";
  return "mixed";
};

const resolveRound = (playerHands, dealerHand) => {
  const dealerTotal = calculateHandValue(dealerHand);

  const outcomes = playerHands.map((hand) => {
    const total = calculateHandValue(hand);

    if (total > 21) return "lose";
    if (dealerTotal > 21) return "win";
    if (total > dealerTotal) return "win";
    if (total < dealerTotal) return "lose";
    return "push";
  });

  const status = outcomes
    .map((outcome, index) => {
      if (outcome === "win") return `Hand ${index + 1}: Win`;
      if (outcome === "lose") return `Hand ${index + 1}: Lose`;
      return `Hand ${index + 1}: Push`;
    })
    .join(" | ");

  return {
    outcomes,
    result: getOverallResult(outcomes),
    status,
  };
};

const buildRound = () => {
  let deck = shuffleDeck(createDeck());

  const p1 = dealCard(deck);
  deck = p1.deck;
  const d1 = dealCard(deck);
  deck = d1.deck;
  const p2 = dealCard(deck);
  deck = p2.deck;
  const d2 = dealCard(deck);
  deck = d2.deck;

  const playerHands = [[p1.card, p2.card]];
  const dealerHand = [d1.card, d2.card];
  const playerTotal = calculateHandValue(playerHands[0]);
  const dealerTotal = calculateHandValue(dealerHand);

  if (playerTotal === 21 && dealerTotal === 21) {
    return {
      deck,
      playerHands,
      dealerHand,
      activeHandIndex: 0,
      isRoundOver: true,
      result: "push",
      status: "Both got blackjack. Push.",
    };
  }

  if (playerTotal === 21) {
    return {
      deck,
      playerHands,
      dealerHand,
      activeHandIndex: 0,
      isRoundOver: true,
      result: "player",
      status: "Blackjack. You win.",
    };
  }

  if (dealerTotal === 21) {
    return {
      deck,
      playerHands,
      dealerHand,
      activeHandIndex: 0,
      isRoundOver: true,
      result: "dealer",
      status: "Dealer has blackjack. You lose.",
    };
  }

  return {
    deck,
    playerHands,
    dealerHand,
    activeHandIndex: 0,
    isRoundOver: false,
    result: null,
    status: "Your move: Hit, Stand, or Split.",
  };
};

const Hand = ({ title, cards, hideSecond = false, total, isActive = false }) => {
  return (
    <section className={`${styles.handSection} ${isActive ? styles.activeHand : ""}`}>
      <div className={styles.handHeader}>
        <h2>{title}</h2>
        <span>Total: {total}</span>
      </div>
      <div className={styles.cardRow}>
        {cards.map((card, index) => {
          if (hideSecond && index === 1) {
            return (
              <div key="hidden-card" className={`${styles.card} ${styles.hiddenCard}`}>
                ??
              </div>
            );
          }

          const isRed = card.suit === "H" || card.suit === "D";
          return (
            <div key={card.id} className={styles.card}>
              <span className={isRed ? styles.redText : styles.blackText}>{card.rank}</span>
              <span className={isRed ? styles.redText : styles.blackText}>{card.suit}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default function BlackjackPage() {
  const [round, setRound] = useState(null);

  useEffect(() => {
    setRound(buildRound());
  }, []);

  const playerTotals = useMemo(
    () => (round ? round.playerHands.map((hand) => calculateHandValue(hand)) : []),
    [round]
  );
  const dealerTotal = useMemo(
    () => (round ? calculateHandValue(round.dealerHand) : 0),
    [round]
  );

  if (!round) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <h1>Blackjack</h1>
          <p>Loading table...</p>
        </div>
      </main>
    );
  }

  const activeHand = round.playerHands[round.activeHandIndex] || [];
  const activeHandTotal = calculateHandValue(activeHand);

  const visibleDealerTotal = round.isRoundOver
    ? dealerTotal
    : round.dealerHand[0].value;

  const canSplit =
    !round.isRoundOver &&
    round.playerHands.length === 1 &&
    round.playerHands[0].length === 2 &&
    round.playerHands[0][0].rank === round.playerHands[0][1].rank;

  const startNewHand = () => {
    setRound(buildRound());
  };

  const finishDealerAndResolve = (stateAfterPlayerTurns) => {
    let deck = stateAfterPlayerTurns.deck;
    let dealerHand = [...stateAfterPlayerTurns.dealerHand];
    let dealerRunningTotal = calculateHandValue(dealerHand);

    while (dealerRunningTotal < 17) {
      const dealt = dealCard(deck);
      deck = dealt.deck;
      dealerHand.push(dealt.card);
      dealerRunningTotal = calculateHandValue(dealerHand);
    }

    const resolution = resolveRound(stateAfterPlayerTurns.playerHands, dealerHand);

    setRound({
      ...stateAfterPlayerTurns,
      deck,
      dealerHand,
      isRoundOver: true,
      result: resolution.result,
      status: resolution.status,
    });
  };

  const moveToNextHandOrResolve = (nextState, endStatus) => {
    const nextIndex = nextState.activeHandIndex + 1;

    if (nextIndex < nextState.playerHands.length) {
      setRound({
        ...nextState,
        activeHandIndex: nextIndex,
        status: endStatus || `Playing hand ${nextIndex + 1}.`,
      });
      return;
    }

    finishDealerAndResolve(nextState);
  };

  const handleHit = () => {
    if (round.isRoundOver) return;

    let deck = round.deck;
    const dealt = dealCard(deck);
    deck = dealt.deck;

    const nextPlayerHands = round.playerHands.map((hand, index) =>
      index === round.activeHandIndex ? [...hand, dealt.card] : hand
    );

    const nextRound = {
      ...round,
      deck,
      playerHands: nextPlayerHands,
    };

    const nextActiveTotal = calculateHandValue(nextPlayerHands[round.activeHandIndex]);

    if (nextActiveTotal > 21) {
      moveToNextHandOrResolve(
        nextRound,
        `Hand ${round.activeHandIndex + 1} bust. Playing hand ${round.activeHandIndex + 2}.`
      );
      return;
    }

    setRound({
      ...nextRound,
      status: `Playing hand ${round.activeHandIndex + 1}. Hit or Stand.`,
    });
  };

  const handleStand = () => {
    if (round.isRoundOver) return;

    moveToNextHandOrResolve(
      round,
      `Hand ${round.activeHandIndex + 1} stands. Playing hand ${round.activeHandIndex + 2}.`
    );
  };

  const handleSplit = () => {
    if (!canSplit) return;

    let deck = round.deck;
    const [firstCard, secondCard] = round.playerHands[0];

    const firstDeal = dealCard(deck);
    deck = firstDeal.deck;
    const secondDeal = dealCard(deck);
    deck = secondDeal.deck;

    const nextPlayerHands = [
      [firstCard, firstDeal.card],
      [secondCard, secondDeal.card],
    ];

    setRound({
      ...round,
      deck,
      playerHands: nextPlayerHands,
      activeHandIndex: 0,
      status: "Hand split. Playing hand 1.",
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Blackjack</h1>
        <p>Hit 21 without going over. Dealer stands on 17.</p>
      </div>

      <div className={styles.table}>
        <Hand
          title="Dealer"
          cards={round.dealerHand}
          hideSecond={!round.isRoundOver}
          total={visibleDealerTotal}
        />

        {round.playerHands.map((hand, index) => (
          <Hand
            key={`player-hand-${index}`}
            title={`Player Hand ${index + 1}`}
            cards={hand}
            hideSecond={false}
            total={playerTotals[index]}
            isActive={!round.isRoundOver && index === round.activeHandIndex}
          />
        ))}
      </div>

      <p
        className={`${styles.status} ${
          round.result === "player"
            ? styles.statusWin
            : round.result === "dealer"
              ? styles.statusLose
              : ""
        }`}
      >
        {round.status}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleHit}
          disabled={round.isRoundOver || activeHandTotal > 21}
        >
          Hit
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleStand}
          disabled={round.isRoundOver}
        >
          Stand
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleSplit}
          disabled={!canSplit}
        >
          Split
        </button>
        <button type="button" className={styles.actionButton} onClick={startNewHand}>
          New Hand
        </button>
      </div>
    </main>
  );
}
