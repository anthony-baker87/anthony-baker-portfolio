import styles from "./Rules.module.css";

const Rules = () => {
  return (
    <section className={styles.rulesContainer}>
      <h1 className={styles.title}>Rock, Paper, Scissors Rules</h1>
      <ul className={styles.rulesList}>
        <li>Rock beats Scissors</li>
        <li>Scissors beats Paper</li>
        <li>Paper beats Rock</li>
        <li>If both players choose the same, it’s a tie</li>
      </ul>
      <p className={styles.tip}>
        Tip: Try to predict your opponent’s moves and choose wisely!
      </p>
    </section>
  );
};

export default Rules;