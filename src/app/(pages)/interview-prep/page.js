import Link from "next/link";
import styles from "./page.module.css";

export default function InterviewPrep() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Interactive frontend practice</p>
          <h1 className={styles.title}>Interview Prep Lab</h1>
          <p className={styles.subtitle}>
            Choose a focused practice mode for React interview questions or
            browser-based coding challenges.
          </p>
        </div>
      </section>

      <section className={styles.choiceGrid} aria-label="Interview prep modes">
        <Link
          href="/interview-prep/multiple-choice"
          className={styles.choiceCard}
        >
          <span className={styles.choiceEyebrow}>Section 1</span>
          <h2>Multiple Choice Quiz</h2>
          <p>
            Answer React, hooks, state, accessibility, and performance questions
            with instant feedback.
          </p>
          <span className={styles.choiceAction}>Start quiz</span>
        </Link>

        <Link
          href="/interview-prep/written-answer"
          className={styles.choiceCard}
        >
          <span className={styles.choiceEyebrow}>Section 2</span>
          <h2>Written Answer Quiz</h2>
          <p>
            Type answers in your own words, reveal a reference answer, then
            grade yourself right or wrong.
          </p>
          <span className={styles.choiceAction}>Practice recall</span>
        </Link>

        <Link href="/interview-prep/code-challenge" className={styles.choiceCard}>
          <span className={styles.choiceEyebrow}>Section 3</span>
          <h2>Code Challenge</h2>
          <p>
            Work through JavaScript and component prompts with an in-browser
            editor, live preview, and checks.
          </p>
          <span className={styles.choiceAction}>Open editor</span>
        </Link>
      </section>
    </div>
  );
}
