"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { linter } from "@codemirror/lint";
import { oneDark } from "@codemirror/theme-one-dark";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "prettier/standalone";
import * as babelPlugin from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import styles from "../page.module.css";
import {
  buildCodePreview,
  buildRuntimeCheckPreview,
  codeChallengePreviewCss,
  codeChallenges,
} from "@/utils/interviewPrep/codeChallenges";

const completedStorageKey = "interviewPrepCompletedChallenges";
const solutionsStorageKey = "interviewPrepChallengeSolutions";
const runtimeCheckMessageSource = "code-challenge-runtime-check";
const consoleMessageSource = "code-challenge-console";
const reactHookNames = [
  "createContext",
  "useContext",
  "useEffect",
  "useMemo",
  "useRef",
  "useState",
];
const componentEditorFile = "component";
const cssEditorFile = "css";
const challengeDifficultyOrder = ["Easy", "Medium", "Hard"];
const codeMirrorBaseExtensions = [javascript({ jsx: true }), oneDark];

const getSyntaxErrorPosition = (errorMessage) => {
  const match = errorMessage.match(/\((\d+):(\d+)\)/);

  if (!match) {
    return null;
  }

  return {
    line: Number(match[1]),
    column: Number(match[2]),
  };
};

const getDocumentOffset = (doc, position) => {
  try {
    return doc.line(position.line).from + position.column;
  } catch {
    return 0;
  }
};

const getRuntimeCheckKey = (challengeId, testId) => `${challengeId}:${testId}`;
const isRuntimeCheck = (check) =>
  check && typeof check === "object" && check.type === "runtime";
const getStarterHookImports = (starter) =>
  reactHookNames.filter((hookName) =>
    new RegExp(`(^|[^\\w$])${hookName}\\s*\\(`).test(starter),
  );
const withStarterImports = (starter) => {
  if (/^\s*import\s/m.test(starter)) {
    return starter;
  }

  const hookImports = getStarterHookImports(starter);

  return hookImports.length
    ? `import { ${hookImports.join(", ")} } from "react";\n\n${starter}`
    : starter;
};
const oldDefaultReactImport =
  'import { useEffect, useMemo, useRef, useState } from "react";';
const normalizeOldStarterImports = (code, challengeId) => {
  const challenge = codeChallenges.find((item) => item.id === challengeId);

  if (!challenge || getStarterHookImports(challenge.starter).length > 0) {
    return code;
  }

  return code.replace(`${oldDefaultReactImport}\n\n`, "");
};
const normalizeOldNoopStarterHandlers = (code) =>
  code
    .replaceAll(" onClick={() => {}}", "")
    .replaceAll(" onChange={() => {}}", "")
    .replace(
      /\s+onChange=\{\(\) => \{\s*\/\/ TODO: update query here\.\s*\}\}/g,
      "",
    )
    .replaceAll(" onClick={addTodo}", "")
    .replaceAll(" onClick={() => addToCart(product)}", "")
    .replaceAll(
      ' onChange={(event) => handleChange(row.id, "name", event.target.value)}',
      "",
    )
    .replaceAll(" onChange={handleUpload}", "")
    .replaceAll(" onClick={sendMessage}", "")
    .replaceAll(" onClick={handleClick}", "")
    .replaceAll(" onClick={addThree}", "")
    .replaceAll("value={query}", "")
    .replaceAll('value={text} placeholder="New todo"', 'placeholder="New todo"')
    .replaceAll(
      'value={text} placeholder="Type a message"',
      'placeholder="Type a message"',
    )
    .replaceAll('value={text} placeholder="Search"', 'placeholder="Search"')
    .replaceAll("value={category}", "defaultValue={category}")
    .replaceAll("value={row.name}", "defaultValue={row.name}")
    .replaceAll(' type="date" value={start}', ' type="date"')
    .replaceAll(' type="date" value={end}', ' type="date"')
    .replaceAll(
      ' value={form.email} placeholder="Email"',
      ' placeholder="Email"',
    )
    .replaceAll(
      ' value={form.password} placeholder="Password"',
      ' placeholder="Password"',
    );
const normalizeStoredChallengeCode = (code, challengeId) =>
  normalizeOldNoopStarterHandlers(
    normalizeOldStarterImports(code, challengeId),
  );
const getStarterCode = (challengeId) => {
  const challenge = codeChallenges.find((item) => item.id === challengeId);

  return challenge ? withStarterImports(challenge.starter) : "";
};
const getStarterCodeByChallenge = () =>
  Object.fromEntries(
    codeChallenges.map((challenge) => [
      challenge.id,
      withStarterImports(challenge.starter),
    ]),
  );
const moveImportsToTop = (code) => {
  const lines = code.replace(/\r\n/g, "\n").split("\n");
  const imports = [];
  const body = [];

  lines.forEach((line) => {
    if (/^\s*import\s/.test(line)) {
      imports.push(line.trim());
      return;
    }

    body.push(line);
  });

  if (imports.length === 0) {
    return code;
  }

  return [
    ...new Set(imports),
    "",
    ...body.join("\n").trimStart().split("\n"),
  ].join("\n");
};

export default function CodeChallengeInterviewPrep() {
  const [activeChallenge, setActiveChallenge] = useState(codeChallenges[0].id);
  const [codeByChallenge, setCodeByChallenge] = useState(
    getStarterCodeByChallenge,
  );
  const [checkedChallenges, setCheckedChallenges] = useState({});
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [runtimeCheckResults, setRuntimeCheckResults] = useState({});
  const [showConsole, setShowConsole] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [formatError, setFormatError] = useState("");
  const [previewRunId, setPreviewRunId] = useState(0);
  const [activeEditorFile, setActiveEditorFile] = useState(componentEditorFile);
  const [openChallengeDifficulty, setOpenChallengeDifficulty] =
    useState("Easy");
  const compilerRef = useRef(null);

  const currentChallenge = codeChallenges.find(
    (challenge) => challenge.id === activeChallenge,
  );
  const currentCode = codeByChallenge[activeChallenge];
  const editorValue =
    activeEditorFile === cssEditorFile ? codeChallengePreviewCss : currentCode;
  const isViewingCss = activeEditorFile === cssEditorFile;
  const editorExtensions = useMemo(() => {
    if (isViewingCss) {
      return codeMirrorBaseExtensions;
    }

    return [
      ...codeMirrorBaseExtensions,
      linter(async (view) => {
        try {
          await format(moveImportsToTop(view.state.doc.toString()), {
            parser: "babel",
            plugins: [babelPlugin, estreePlugin],
          });

          return [];
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message.split("\n")[0]
              : "Syntax error";
          const position = getSyntaxErrorPosition(message);
          const from = position
            ? getDocumentOffset(view.state.doc, position)
            : view.state.selection.main.head;
          const to = Math.min(from + 1, view.state.doc.length);

          return [
            {
              from,
              to: Math.max(to, from),
              severity: "error",
              message,
            },
          ];
        }
      }),
    ];
  }, [isViewingCss]);
  const challengesByDifficulty = challengeDifficultyOrder
    .map((difficulty) => ({
      difficulty,
      challenges: codeChallenges.filter(
        (challenge) => challenge.difficulty === difficulty,
      ),
    }))
    .filter((group) => group.challenges.length > 0);
  const hasRunChecks = checkedChallenges[activeChallenge] === currentCode;
  const codeMatchesCheck = (test) => {
    const { check } = test;

    if (isRuntimeCheck(check)) {
      const result =
        runtimeCheckResults[getRuntimeCheckKey(activeChallenge, check.id)];

      return Boolean(result?.passed);
    }

    if (typeof check === "function") {
      return check(currentCode);
    }

    if (check instanceof RegExp) {
      return check.test(currentCode);
    }

    return currentCode.includes(check);
  };
  const testResults = currentChallenge.tests.map((test) => ({
    ...test,
    passed: hasRunChecks && codeMatchesCheck(test),
  }));
  const passedTests = testResults.filter((test) => test.passed).length;
  const isCurrentChallengeComplete =
    passedTests === currentChallenge.tests.length && hasRunChecks;
  const completion = Math.round(
    (passedTests / currentChallenge.tests.length) * 100,
  );

  useEffect(() => {
    try {
      const storedChallenges = JSON.parse(
        localStorage.getItem(completedStorageKey) || "[]",
      );
      const storedSolutions = JSON.parse(
        localStorage.getItem(solutionsStorageKey) || "{}",
      );

      if (Array.isArray(storedChallenges)) {
        setCompletedChallenges(storedChallenges);
      }

      if (storedSolutions && typeof storedSolutions === "object") {
        const normalizedSolutions = Object.fromEntries(
          Object.entries(storedSolutions).map(([challengeId, code]) => [
            challengeId,
            typeof code === "string"
              ? normalizeStoredChallengeCode(code, challengeId)
              : code,
          ]),
        );

        setCodeByChallenge((current) => ({
          ...current,
          ...normalizedSolutions,
        }));
        localStorage.setItem(
          solutionsStorageKey,
          JSON.stringify(normalizedSolutions),
        );

        if (Array.isArray(storedChallenges)) {
          setCheckedChallenges(
            Object.fromEntries(
              storedChallenges
                .filter((challengeId) => normalizedSolutions[challengeId])
                .map((challengeId) => [
                  challengeId,
                  normalizedSolutions[challengeId],
                ]),
            ),
          );
        }
      }
    } catch {
      setCompletedChallenges([]);
    }
  }, []);

  useEffect(() => {
    const appendConsoleMessage = (data) => {
      if (
        data?.source !== consoleMessageSource ||
        data.challengeId !== activeChallenge
      ) {
        return;
      }

      setConsoleMessages((current) => [
        ...current.slice(-39),
        {
          id: `${Date.now()}-${current.length}`,
          level: data.level || "log",
          message: Array.isArray(data.args) ? data.args.join(" ") : "",
        },
      ]);
    };
    const handleConsoleMessage = (event) => {
      appendConsoleMessage(event.data);
    };

    window.__codeChallengeConsoleMessage = appendConsoleMessage;
    window.addEventListener("message", handleConsoleMessage);

    return () => {
      if (window.__codeChallengeConsoleMessage === appendConsoleMessage) {
        delete window.__codeChallengeConsoleMessage;
      }

      window.removeEventListener("message", handleConsoleMessage);
    };
  }, [activeChallenge]);

  useEffect(() => {
    const saveRuntimeCheckResult = (data) => {
      if (data?.source !== runtimeCheckMessageSource) {
        return;
      }

      const { challengeId, code, error, passed, testId } = data;

      setRuntimeCheckResults((current) => ({
        ...current,
        [getRuntimeCheckKey(challengeId, testId)]: {
          code,
          error,
          passed,
        },
      }));
    };
    const handleRuntimeCheckMessage = (event) => {
      saveRuntimeCheckResult(event.data);
    };

    window.__codeChallengeRuntimeCheck = saveRuntimeCheckResult;
    window.addEventListener("message", handleRuntimeCheckMessage);

    return () => {
      delete window.__codeChallengeRuntimeCheck;
      window.removeEventListener("message", handleRuntimeCheckMessage);
    };
  }, []);

  useEffect(() => {
    if (!isCurrentChallengeComplete) {
      return;
    }

    setCompletedChallenges((current) => {
      if (current.includes(activeChallenge)) {
        return current;
      }

      const nextCompletedChallenges = [...current, activeChallenge];
      localStorage.setItem(
        completedStorageKey,
        JSON.stringify(nextCompletedChallenges),
      );
      return nextCompletedChallenges;
    });
  }, [activeChallenge, isCurrentChallengeComplete]);

  useEffect(() => {
    if (!hasRunChecks) {
      return;
    }

    const runtimeTests = currentChallenge.tests.filter((test) =>
      isRuntimeCheck(test.check),
    );

    if (runtimeTests.length === 0) {
      return;
    }

    let attempts = 0;
    const pendingCheckIds = new Set(runtimeTests.map((test) => test.check.id));

    const readRuntimeFrames = () => {
      attempts += 1;

      runtimeTests.forEach((test) => {
        const checkId = test.check.id;

        if (!pendingCheckIds.has(checkId)) {
          return;
        }

        const frame = Array.from(document.querySelectorAll("iframe")).find(
          (item) => item.title === `${test.label} runtime check`,
        );
        const text =
          frame?.contentDocument?.getElementById("root")?.textContent || "";
        const passed =
          checkId === "booking-calendar-date-difference" &&
          text.toLowerCase().includes("7 days selected");

        if (!passed && attempts < 20) {
          return;
        }

        pendingCheckIds.delete(checkId);
        setRuntimeCheckResults((current) => ({
          ...current,
          [getRuntimeCheckKey(activeChallenge, checkId)]: {
            code: currentCode,
            error: text,
            passed,
          },
        }));
      });

      if (pendingCheckIds.size === 0) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(readRuntimeFrames, 250);
    readRuntimeFrames();

    return () => {
      clearInterval(intervalId);
    };
  }, [activeChallenge, currentChallenge, currentCode, hasRunChecks]);

  const updateCode = (value) => {
    setFormatError("");

    setCodeByChallenge((current) => {
      const nextCodeByChallenge = {
        ...current,
        [activeChallenge]: value,
      };
      const savedSolutions = Object.fromEntries(
        Object.entries(nextCodeByChallenge).filter(([challengeId, code]) => {
          const challenge = codeChallenges.find(
            (item) => item.id === challengeId,
          );
          return challenge && code !== withStarterImports(challenge.starter);
        }),
      );

      localStorage.setItem(solutionsStorageKey, JSON.stringify(savedSolutions));

      return nextCodeByChallenge;
    });
  };

  const resetChallenge = (challengeId) => {
    const starterCode = getStarterCode(challengeId);

    setCodeByChallenge((current) => {
      const nextCodeByChallenge = {
        ...current,
        [challengeId]: starterCode,
      };
      const savedSolutions = Object.fromEntries(
        Object.entries(nextCodeByChallenge).filter(
          ([currentChallengeId, code]) => {
            const starter = getStarterCode(currentChallengeId);

            return starter && code !== starter;
          },
        ),
      );

      localStorage.setItem(solutionsStorageKey, JSON.stringify(savedSolutions));

      return nextCodeByChallenge;
    });
    setCheckedChallenges((current) => {
      const nextCheckedChallenges = { ...current };
      delete nextCheckedChallenges[challengeId];

      return nextCheckedChallenges;
    });
    setCompletedChallenges((current) => {
      const nextCompletedChallenges = current.filter(
        (item) => item !== challengeId,
      );
      localStorage.setItem(
        completedStorageKey,
        JSON.stringify(nextCompletedChallenges),
      );

      return nextCompletedChallenges;
    });
    setRuntimeCheckResults((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([key]) => !key.startsWith(`${challengeId}:`),
        ),
      ),
    );

    if (challengeId === activeChallenge) {
      setConsoleMessages([]);
    }
  };

  const resetAllChallenges = () => {
    setCodeByChallenge(getStarterCodeByChallenge());
    setCheckedChallenges({});
    setCompletedChallenges([]);
    setRuntimeCheckResults({});
    setConsoleMessages([]);
    localStorage.removeItem(solutionsStorageKey);
    localStorage.removeItem(completedStorageKey);
  };

  const resetChallengeGroup = (challenges) => {
    const challengeIds = challenges.map((challenge) => challenge.id);
    const challengeIdSet = new Set(challengeIds);

    setCodeByChallenge((current) => {
      const nextCodeByChallenge = { ...current };

      challengeIds.forEach((challengeId) => {
        nextCodeByChallenge[challengeId] = getStarterCode(challengeId);
      });

      const savedSolutions = Object.fromEntries(
        Object.entries(nextCodeByChallenge).filter(([challengeId, code]) => {
          const starter = getStarterCode(challengeId);

          return starter && code !== starter;
        }),
      );

      localStorage.setItem(solutionsStorageKey, JSON.stringify(savedSolutions));

      return nextCodeByChallenge;
    });
    setCheckedChallenges((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([challengeId]) => !challengeIdSet.has(challengeId),
        ),
      ),
    );
    setCompletedChallenges((current) => {
      const nextCompletedChallenges = current.filter(
        (challengeId) => !challengeIdSet.has(challengeId),
      );

      localStorage.setItem(
        completedStorageKey,
        JSON.stringify(nextCompletedChallenges),
      );

      return nextCompletedChallenges;
    });
    setRuntimeCheckResults((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([key]) =>
            !challengeIds.some((challengeId) =>
              key.startsWith(`${challengeId}:`),
            ),
        ),
      ),
    );

    if (challengeIdSet.has(activeChallenge)) {
      setConsoleMessages([]);
    }
  };

  const selectChallenge = (challengeId) => {
    const nextChallenge = codeChallenges.find(
      (challenge) => challenge.id === challengeId,
    );

    if (nextChallenge?.difficulty) {
      setOpenChallengeDifficulty(nextChallenge.difficulty);
    }

    setActiveChallenge(challengeId);
    setActiveEditorFile(componentEditorFile);

    requestAnimationFrame(() => {
      compilerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const formatCode = async () => {
    if (isViewingCss) {
      return;
    }

    try {
      const nextCode = await format(moveImportsToTop(currentCode), {
        parser: "babel",
        plugins: [babelPlugin, estreePlugin],
        printWidth: 82,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "all",
      });

      updateCode(nextCode.trimEnd());
    } catch (error) {
      setFormatError(
        error instanceof Error
          ? error.message.split("\n")[0]
          : "Could not format this code yet.",
      );
    }
  };

  const validateCurrentCodeSyntax = async () => {
    await format(moveImportsToTop(currentCode), {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin],
    });
  };

  const runChecks = async () => {
    try {
      await validateCurrentCodeSyntax();
      setFormatError("");
    } catch (error) {
      setFormatError(
        error instanceof Error
          ? error.message.split("\n")[0]
          : "Fix syntax errors before running checks.",
      );
      setCheckedChallenges((current) => {
        const nextCheckedChallenges = { ...current };
        delete nextCheckedChallenges[activeChallenge];

        return nextCheckedChallenges;
      });

      return;
    }

    const nextRuntimeCheckResults = { ...runtimeCheckResults };

    currentChallenge.tests.forEach((test) => {
      if (isRuntimeCheck(test.check)) {
        delete nextRuntimeCheckResults[
          getRuntimeCheckKey(activeChallenge, test.check.id)
        ];
      }
    });

    setRuntimeCheckResults(nextRuntimeCheckResults);
    setPreviewRunId((current) => current + 1);
    setCheckedChallenges((current) => ({
      ...current,
      [activeChallenge]: currentCode,
    }));
  };

  const handleRuntimeCheckFrameLoad = (frame, check) => {
    let attempts = 0;

    const readRuntimeResult = () => {
      attempts += 1;

      const text =
        frame.contentDocument?.getElementById("root")?.textContent || "";
      const passed =
        check.id === "booking-calendar-date-difference" &&
        text.toLowerCase().includes("7 days selected");

      if (!passed && attempts < 10) {
        setTimeout(readRuntimeResult, 250);
        return;
      }

      setRuntimeCheckResults((current) => ({
        ...current,
        [getRuntimeCheckKey(activeChallenge, check.id)]: {
          code: currentCode,
          error: text,
          passed,
        },
      }));
    };

    setTimeout(readRuntimeResult, 250);
  };

  return (
    <div className={styles.page}>
      <Link href="/interview-prep" className={styles.backLink}>
        Back to Interview Prep
      </Link>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Coding quiz</p>
          <h1 className={styles.title}>Frontend Code Challenge</h1>
          <p className={styles.subtitle}>
            Solve practical JavaScript and component prompts in the editor, then
            watch the preview and checks update in the browser.
          </p>
        </div>
        <div className={styles.scorePanel} aria-label="Current progress">
          <span className={styles.scoreValue}>{completion}%</span>
          <span className={styles.scoreLabel}>Checks passing</span>
        </div>
      </section>

      <section
        className={styles.sectionBlock}
        aria-labelledby="coding-quiz-heading"
      >
        <div className={styles.codePanel}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderTitle}>
              <p id="coding-quiz-heading">Code Challenge</p>
              <button
                className={styles.compactAction}
                onClick={resetAllChallenges}
                type="button"
              >
                Reset all
              </button>
            </div>
            <span>
              {passedTests}/{currentChallenge.tests.length} checks
            </span>
          </div>

          <div className={styles.challengeTabs} aria-label="Coding challenges">
            {challengesByDifficulty.map((group) => {
              const isOpen = openChallengeDifficulty === group.difficulty;
              const completedInGroup = group.challenges.filter((challenge) =>
                completedChallenges.includes(challenge.id),
              ).length;
              const panelId = `challenge-group-${group.difficulty.toLowerCase()}`;

              return (
                <section
                  className={styles.challengeGroup}
                  key={group.difficulty}
                >
                  <div className={styles.challengeGroupHeader}>
                    <button
                      className={`${styles.challengeGroupButton} ${
                        isOpen ? styles.openChallengeGroupButton : ""
                      }`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenChallengeDifficulty((current) =>
                          current === group.difficulty ? "" : group.difficulty,
                        )
                      }
                    >
                      <span className={styles.challengeGroupName}>
                        <span
                          className={styles.challengeGroupIndicator}
                          aria-hidden="true"
                        >
                          {isOpen ? "-" : "+"}
                        </span>
                        <span>{group.difficulty}</span>
                      </span>
                      <span className={styles.challengeGroupProgress}>
                        {completedInGroup}/{group.challenges.length} complete
                      </span>
                    </button>
                    <button
                      className={styles.challengeGroupResetButton}
                      type="button"
                      onClick={() => resetChallengeGroup(group.challenges)}
                    >
                      Reset {group.difficulty}
                    </button>
                  </div>

                  {isOpen ? (
                    <div
                      className={styles.challengeGroupGrid}
                      id={panelId}
                      role="tablist"
                      aria-label={`${group.difficulty} coding challenges`}
                    >
                      {group.challenges.map((challenge) => (
                        <div
                          className={`${styles.challengeTabWrap} ${
                            completedChallenges.includes(challenge.id)
                              ? styles.completedChallengeWrap
                              : ""
                          }`}
                          key={challenge.id}
                        >
                          <div className={styles.challengeStatusCell}>
                            {completedChallenges.includes(challenge.id) ? (
                              <span
                                className={styles.completedMark}
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            ) : null}
                          </div>
                          <button
                            className={`${styles.challengeTab} ${
                              challenge.id === activeChallenge
                                ? styles.activeChallengeTab
                                : ""
                            } ${
                              completedChallenges.includes(challenge.id)
                                ? styles.completedChallengeTab
                                : ""
                            }`}
                            onClick={() => selectChallenge(challenge.id)}
                            role="tab"
                            aria-selected={challenge.id === activeChallenge}
                            type="button"
                          >
                            {completedChallenges.includes(challenge.id) ? (
                              <span
                                className={styles.completedMark}
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            ) : null}
                            <span className={styles.challengeTitleCell}>
                              {challenge.title}
                            </span>
                          </button>
                          <div className={styles.challengeResetCell}>
                            <button
                              className={styles.challengeResetButton}
                              onClick={() => resetChallenge(challenge.id)}
                              type="button"
                              aria-label={`Reset ${challenge.title}`}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          <div ref={compilerRef} className={styles.editorGrid}>
            <div className={styles.previewColumn}>
              <div className={styles.previewFrameWrap}>
                <iframe
                  key={`${activeChallenge}:${previewRunId}`}
                  title={`${currentChallenge.title} live preview`}
                  className={styles.previewFrame}
                  sandbox="allow-scripts allow-forms allow-same-origin"
                  srcDoc={buildCodePreview(currentCode, activeChallenge)}
                />
              </div>

              <div className={styles.testList}>
                {testResults.map((test) => (
                  <div
                    key={test.label}
                    className={`${styles.testItem} ${
                      test.passed ? styles.testPassed : styles.testPending
                    }`}
                  >
                    <span>{test.passed ? "Pass" : "Check"}</span>
                    {test.label}
                  </div>
                ))}
              </div>

              {hasRunChecks
                ? currentChallenge.tests
                    .filter((test) => isRuntimeCheck(test.check))
                    .map((test) => (
                      <iframe
                        key={test.check.id}
                        title={`${test.label} runtime check`}
                        onLoad={(event) =>
                          handleRuntimeCheckFrameLoad(
                            event.currentTarget,
                            test.check,
                          )
                        }
                        srcDoc={buildRuntimeCheckPreview(
                          currentCode,
                          activeChallenge,
                          test.check.id,
                        )}
                        style={{
                          border: 0,
                          height: 1,
                          opacity: 0,
                          pointerEvents: "none",
                          position: "absolute",
                          width: 1,
                        }}
                      />
                    ))
                : null}
            </div>

            <div className={styles.codeWorkspace}>
              <div className={styles.editorColumn}>
                <h2>{currentChallenge.title}</h2>
                <p>{currentChallenge.instructions}</p>
                {currentChallenge.resources?.length ? (
                  <div
                    className={styles.resourceList}
                    aria-label="API reference"
                  >
                    {currentChallenge.resources.map((resource) => (
                      <div className={styles.resourceItem} key={resource.url}>
                        <strong>{resource.label}</strong>
                        <span>URL: {resource.url}</span>
                        <span>HTTP Method: {resource.method}</span>
                        <span>Content Type: {resource.contentType}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className={styles.editorActions}>
                  <div className={styles.editorActionButtons}>
                    <button
                      className={styles.primaryAction}
                      onClick={runChecks}
                      type="button"
                    >
                      Run checks
                    </button>
                    <button
                      className={styles.secondaryAction}
                      onClick={formatCode}
                      disabled={isViewingCss}
                      type="button"
                    >
                      Format
                    </button>
                    <button
                      className={`${styles.secondaryAction} ${
                        showConsole ? styles.consoleOpenAction : ""
                      }`}
                      onClick={() => setShowConsole((current) => !current)}
                      type="button"
                      aria-pressed={showConsole}
                    >
                      Console
                    </button>
                  </div>
                  <span>
                    {hasRunChecks
                      ? `${passedTests}/${currentChallenge.tests.length} passing`
                      : "Checks not run yet"}
                  </span>
                </div>
                {formatError ? (
                  <p className={styles.formatError}>{formatError}</p>
                ) : null}
                <div className={styles.fileTabs} aria-label="Editor files">
                  <button
                    className={`${styles.fileTab} ${
                      activeEditorFile === componentEditorFile
                        ? styles.activeFileTab
                        : ""
                    }`}
                    onClick={() => setActiveEditorFile(componentEditorFile)}
                    type="button"
                  >
                    Component.jsx
                  </button>
                  <button
                    className={`${styles.fileTab} ${
                      activeEditorFile === cssEditorFile
                        ? styles.activeFileTab
                        : ""
                    }`}
                    onClick={() => setActiveEditorFile(cssEditorFile)}
                    type="button"
                  >
                    preview.css
                  </button>
                </div>
                <CodeMirror
                  className={`${styles.editor} ${
                    isViewingCss ? styles.readOnlyEditor : ""
                  }`}
                  basicSetup={{
                    autocompletion: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    foldGutter: true,
                    highlightActiveLine: true,
                    highlightActiveLineGutter: true,
                    lineNumbers: true,
                  }}
                  editable={!isViewingCss}
                  extensions={editorExtensions}
                  height="540px"
                  value={editorValue}
                  onChange={(value) => {
                    if (!isViewingCss) {
                      updateCode(value);
                    }
                  }}
                  aria-label={
                    isViewingCss
                      ? `${currentChallenge.title} preview CSS`
                      : `${currentChallenge.title} code editor`
                  }
                />
              </div>

              {showConsole ? (
                <aside
                  className={styles.consolePanel}
                  aria-label="Console output"
                >
                  <div className={styles.consoleHeader}>
                    <strong>Console</strong>
                    <button
                      className={styles.consoleClear}
                      onClick={() => setConsoleMessages([])}
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                  <div className={styles.consoleOutput}>
                    {consoleMessages.length ? (
                      consoleMessages.map((message) => (
                        <p
                          key={message.id}
                          className={
                            message.level === "error"
                              ? styles.consoleError
                              : styles.consoleLine
                          }
                        >
                          {message.message || "(empty)"}
                        </p>
                      ))
                    ) : (
                      <p className={styles.consoleMuted}>
                        No console output yet.
                      </p>
                    )}
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
