import Link from "next/link";
import styles from "./page.module.css";

const games = [
  {
    href: "/games/hole-in-one",
    title: "Hole in One",
    description:
      "A fun golf-themed game project with an interactive experience.",
  },
  {
    href: "/games/rock-paper-scissors",
    title: "Rock, Paper, Scissors",
    description: "A classic game built with React and JavaScript.",
  },
  {
    href: "/games/tic-tac-toe",
    title: "Tic Tac Toe",
    description: "A simple strategy game with clean UI and game logic.",
  },
  {
    href: "/games/blackjack",
    title: "Blackjack",
    description: "A classic 21 card game with hit, stand, and dealer logic.",
  },
];

export default function GamesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Games</h1>
        <p className={styles.subtitle}>
          Explore a few interactive game projects built with Next.js and React.
        </p>
      </div>

      <div className={styles.grid}>
        {games.map((game) => (
          <Link key={game.href} href={game.href} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{game.title}</h2>
              <p className={styles.cardDescription}>{game.description}</p>
              <span className={styles.cardLink}>Play Game →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
