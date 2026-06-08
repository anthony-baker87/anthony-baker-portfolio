import Link from "next/link";
import styles from "./page.module.css";

export default function InterviewPrep() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Interactive interview practice</p>
          <h1 className={styles.title}>Interview Prep Lab</h1>
          <p className={styles.subtitle}>
            Pick a topic track, then work through quizzes or coding challenges
            with immediate feedback.
          </p>
        </div>
      </section>

      <section className={styles.choiceGrid} aria-label="Interview prep tracks">
        <Link href="/interview-prep/react" className={styles.choiceCard}>
          <span className={styles.choiceEyebrow}>Track 1</span>
          <h2>React</h2>
          <p>
            Practice React multiple choice, written recall, and frontend code
            challenges.
          </p>
          <span className={styles.choiceAction}>Open React prep</span>
        </Link>

        <Link
          href="/interview-prep/code-challenge?track=graphql"
          className={styles.choiceCard}
        >
          <span className={styles.choiceEyebrow}>Track 2</span>
          <h2>GraphQL</h2>
          <p>
            Solve hands-on query, variable, mutation, pagination, and error
            handling coding challenges.
          </p>
          <span className={styles.choiceAction}>Open GraphQL prep</span>
        </Link>

        <Link
          href="/interview-prep/code-challenge?track=rest"
          className={styles.choiceCard}
        >
          <span className={styles.choiceEyebrow}>Track 3</span>
          <h2>REST API</h2>
          <p>
            Practice endpoints, fetch requests, query params, JSON bodies,
            errors, and cleanup patterns.
          </p>
          <span className={styles.choiceAction}>Open REST prep</span>
        </Link>
      </section>
    </div>
  );
}
