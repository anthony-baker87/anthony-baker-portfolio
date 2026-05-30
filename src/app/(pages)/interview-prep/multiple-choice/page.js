"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../page.module.css";
import { reactInterviewQuestions } from "@/utils/interviewPrep/reactInterviewQuestions";

const multipleChoiceStorageKey = "interviewPrepMultipleChoiceAnswers:v2";

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

export default function MultipleChoiceInterviewPrep() {
  const [questions, setQuestions] = useState(reactInterviewQuestions);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const savedAnswer = answers[currentQuestion.id];
  const submitted = savedAnswer !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const quizScore = questions.reduce(
    (score, question) =>
      answers[question.id] === question.answer ? score + 1 : score,
    0,
  );
  const answeredQuestions = Object.keys(answers).length;
  const completion = Math.round((answeredQuestions / questions.length) * 100);

  const skillBreakdown = useMemo(() => {
    const skillStats = questions.reduce((stats, question) => {
      const current = stats[question.skill] || { correct: 0, answered: 0 };
      const selectedAnswer = answers[question.id];

      return {
        ...stats,
        [question.skill]: {
          correct:
            selectedAnswer === question.answer
              ? current.correct + 1
              : current.correct,
          answered:
            selectedAnswer === undefined ? current.answered : current.answered + 1,
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
  }, [answers, questions]);

  useEffect(() => {
    setQuestions(shuffleQuestions(reactInterviewQuestions));
  }, []);

  useEffect(() => {
    try {
      const storedAnswers = JSON.parse(
        localStorage.getItem(multipleChoiceStorageKey) || "{}",
      );

      if (storedAnswers && typeof storedAnswers === "object") {
        setAnswers(storedAnswers);
      }
    } catch {
      setAnswers({});
    }
  }, []);

  useEffect(() => {
    setSelectedAnswer(savedAnswer ?? null);
  }, [savedAnswer, currentQuestion.id]);

  useEffect(() => {
    localStorage.setItem(multipleChoiceStorageKey, JSON.stringify(answers));
  }, [answers]);

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: selectedAnswer,
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

  const selectAnswer = (answerIndex) => {
    if (submitted) {
      return;
    }

    setSelectedAnswer(answerIndex);
  };

  const resetQuiz = () => {
    localStorage.removeItem(multipleChoiceStorageKey);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuestions(shuffleQuestions(reactInterviewQuestions));
  };

  return (
    <div className={styles.page}>
      <Link href="/interview-prep" className={styles.backLink}>
        Back to Interview Prep
      </Link>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Multiple choice quiz</p>
          <h1 className={styles.title}>React Interview Questions</h1>
          <p className={styles.subtitle}>
            Work through scenario-based frontend questions and get immediate
            feedback on each answer.
          </p>
        </div>
        <div className={styles.scorePanel} aria-label="Current progress">
          <span className={styles.scoreValue}>{completion}%</span>
          <span className={styles.scoreLabel}>Quiz progress</span>
        </div>
      </section>

      <section className={styles.sectionBlock} aria-labelledby="multiple-choice-heading">
        <div className={styles.quizPanel}>
          <div className={styles.sectionHeader}>
            <p id="multiple-choice-heading">Multiple Choice Questions</p>
            <span>
              {quizScore}/{questions.length} correct
            </span>
          </div>

          <div className={styles.quizSlider}>
            <div className={styles.progressDots} aria-label="Question progress">
              {questions.map((question, index) => {
                const answer = answers[question.id];
                const isAnswered = answer !== undefined;
                const isCorrect = answer === question.answer;
                const isActive = index === currentQuestionIndex;

                return (
                  <button
                    key={question.id}
                    className={`${styles.progressDot} ${
                      isActive
                        ? styles.activeProgressDot
                        : isAnswered && isCorrect
                          ? styles.correctProgressDot
                          : isAnswered
                            ? styles.incorrectProgressDot
                            : ""
                    }`}
                    onClick={() => goToQuestion(index)}
                    type="button"
                    aria-label={`Go to question ${index + 1}`}
                  />
                );
              })}
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
              <div className={styles.optionGrid}>
                {currentQuestion.options.map((option, optionIndex) => {
                  const selected = selectedAnswer === optionIndex;
                  const correct =
                    submitted && optionIndex === currentQuestion.answer;
                  const incorrect =
                    submitted &&
                    selected &&
                    optionIndex !== currentQuestion.answer;

                  return (
                    <button
                      key={`${currentQuestion.id}-${optionIndex}`}
                      className={`${styles.optionButton} ${
                        selected ? styles.selectedOption : ""
                      } ${correct ? styles.correctOption : ""} ${
                        incorrect ? styles.incorrectOption : ""
                      }`}
                      onClick={() => selectAnswer(optionIndex)}
                      disabled={submitted}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted ? (
                <p className={styles.feedback}>{currentQuestion.explanation}</p>
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
              {submitted ? (
                <button
                  className={styles.primaryAction}
                  disabled={isLastQuestion}
                  onClick={goToNextQuestion}
                  type="button"
                >
                  {isLastQuestion ? "Quiz complete" : "Next question"}
                </button>
              ) : (
                <button
                  className={styles.primaryAction}
                  disabled={selectedAnswer === null}
                  onClick={submitAnswer}
                  type="button"
                >
                  Submit answer
                </button>
              )}
              <button
                className={styles.secondaryAction}
                disabled={answeredQuestions === 0 && currentQuestionIndex === 0}
                onClick={resetQuiz}
                type="button"
              >
                Reset quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.sectionHeader}>
          <p>Results + Skill Breakdown</p>
          <span>{answeredQuestions} answered</span>
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
