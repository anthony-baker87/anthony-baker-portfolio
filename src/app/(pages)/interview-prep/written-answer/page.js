"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "../page.module.css";
import { reactInterviewQuestions } from "@/utils/interviewPrep/reactInterviewQuestions";

const shuffleQuestions = (questions) => {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[swapIndex]] = [
      shuffledQuestions[swapIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions;
};

export default function WrittenAnswerInterviewPrep() {
  const [questions] = useState(() => shuffleQuestions(reactInterviewQuestions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [draftAnswers, setDraftAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [gradedAnswers, setGradedAnswers] = useState({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentDraft = draftAnswers[currentQuestion.id] || "";
  const isCurrentRevealed = Boolean(revealedAnswers[currentQuestion.id]);
  const currentGrade = gradedAnswers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const gradedQuestions = Object.keys(gradedAnswers).length;
  const correctAnswers = Object.values(gradedAnswers).filter(Boolean).length;
  const completion = Math.round((gradedQuestions / questions.length) * 100);

  const skillBreakdown = useMemo(() => {
    const skillStats = questions.reduce((stats, question) => {
      const current = stats[question.skill] || { correct: 0, answered: 0 };
      const grade = gradedAnswers[question.id];

      return {
        ...stats,
        [question.skill]: {
          correct: grade ? current.correct + 1 : current.correct,
          answered: grade === undefined ? current.answered : current.answered + 1,
        },
      };
    }, {});

    return Object.entries(skillStats).map(([name, stats]) => ({
      name,
      value:
        stats.answered === 0
          ? 0
          : Math.round((stats.correct / stats.answered) * 100),
    }));
  }, [gradedAnswers, questions]);

  const modelAnswer = `${currentQuestion.options[currentQuestion.answer]} ${currentQuestion.explanation}`;

  const updateDraft = (value) => {
    setDraftAnswers((current) => ({
      ...current,
      [currentQuestion.id]: value,
    }));
  };

  const revealAnswer = () => {
    if (!currentDraft.trim()) {
      return;
    }

    setRevealedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: true,
    }));
  };

  const gradeAnswer = (isCorrect) => {
    setGradedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: isCorrect,
    }));
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const goToNextQuestion = () => {
    if (!isLastQuestion) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  return (
    <div className={styles.page}>
      <Link href="/interview-prep" className={styles.backLink}>
        Back to Interview Prep
      </Link>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Written answer quiz</p>
          <h1 className={styles.title}>React Interview Practice</h1>
          <p className={styles.subtitle}>
            Write your answer in your own words, reveal the reference answer,
            then mark yourself right or wrong.
          </p>
        </div>
        <div className={styles.scorePanel} aria-label="Current progress">
          <span className={styles.scoreValue}>{completion}%</span>
          <span className={styles.scoreLabel}>Graded</span>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-labelledby="written-answer-heading">
        <div className={styles.quizPanel}>
          <div className={styles.sectionHeader}>
            <p id="written-answer-heading">Written Answer Questions</p>
            <span>
              {correctAnswers}/{questions.length} correct
            </span>
          </div>

          <div className={styles.quizSlider}>
            <div className={styles.progressDots} aria-label="Question progress">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  className={`${styles.progressDot} ${
                    index === currentQuestionIndex ? styles.activeProgressDot : ""
                  } ${
                    gradedAnswers[question.id] !== undefined
                      ? styles.answeredDot
                      : ""
                  }`}
                  onClick={() => goToQuestion(index)}
                  type="button"
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>

            <article className={styles.sliderQuestionCard}>
              <div className={styles.questionMeta}>
                <span>
                  Question {currentQuestionIndex + 1} of{" "}
                  {questions.length}
                </span>
                <span>{currentQuestion.skill}</span>
              </div>
              <h2>{currentQuestion.prompt}</h2>

              <textarea
                className={styles.writtenAnswer}
                value={currentDraft}
                onChange={(event) => updateDraft(event.target.value)}
                placeholder="Write your answer here"
                aria-label="Written answer"
              />

              {isCurrentRevealed ? (
                <div className={styles.modelAnswer}>
                  <strong>Reference answer</strong>
                  <p>{modelAnswer}</p>
                </div>
              ) : null}

              {currentGrade !== undefined ? (
                <p className={styles.feedback}>
                  Marked {currentGrade ? "correct" : "incorrect"}.
                </p>
              ) : null}
            </article>

            <div className={styles.quizActions}>
              <button
                className={styles.secondaryAction}
                disabled={currentQuestionIndex === 0}
                onClick={() => goToQuestion(currentQuestionIndex - 1)}
                type="button"
              >
                Previous
              </button>

              {!isCurrentRevealed ? (
                <button
                  className={styles.primaryAction}
                  disabled={!currentDraft.trim()}
                  onClick={revealAnswer}
                  type="button"
                >
                  Show answer
                </button>
              ) : (
                <>
                  <button
                    className={styles.secondaryAction}
                    onClick={() => gradeAnswer(false)}
                    type="button"
                  >
                    Mark wrong
                  </button>
                  <button
                    className={styles.primaryAction}
                    onClick={() => gradeAnswer(true)}
                    type="button"
                  >
                    Mark right
                  </button>
                  <button
                    className={styles.secondaryAction}
                    disabled={isLastQuestion}
                    onClick={goToNextQuestion}
                    type="button"
                  >
                    {isLastQuestion ? "Quiz complete" : "Next question"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.sectionHeader}>
          <p>Results + Skill Breakdown</p>
          <span>{gradedQuestions} graded</span>
        </div>
        <div className={styles.skillGrid}>
          {skillBreakdown.map((skill) => (
            <div key={skill.name} className={styles.skillRow}>
              <div className={styles.skillLabel}>
                <span>{skill.name}</span>
                <strong>{skill.value}%</strong>
              </div>
              <div className={styles.skillTrack}>
                <span style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
