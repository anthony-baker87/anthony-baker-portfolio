"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Hero from "@/components/Golf/Hero/Hero";
import Button from "@/components/Button/Button";
import { isMobile } from "@/utils/device";

const RESTING_BALL_Y = 38;
const START_BALL_POSITION = { x: 72, y: RESTING_BALL_Y };
const GOLFER_Y = -7;
const GOLFER_BALL_OFFSET_X = 108;
const BALL_SIZE = 30;

const getGolferPositionForBall = (ballX) => ({
  x: ballX - GOLFER_BALL_OFFSET_X,
  y: GOLFER_Y,
});

const HoleInOne = () => {
  const [mobile, setMobile] = useState(false);
  const [power, setPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [ballPosition, setBallPosition] = useState(START_BALL_POSITION);
  const [golferPosition, setGolferPosition] = useState(
    getGolferPositionForBall(START_BALL_POSITION.x)
  );
  const [hasWon, setHasWon] = useState(false);
  const [strokes, setStrokes] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Hold mouse button to charge your shot, then release to swing."
  );

  const animationRef = useRef(null);
  const powerIntervalRef = useRef(null);
  const powerDirectionRef = useRef(1);
  const currentPowerRef = useRef(0);
  const gameAreaRef = useRef(null);
  const flagRef = useRef(null);
  const hitBallRef = useRef(null);
  const courseImageRef = useRef(null);
  const courseCanvasRef = useRef(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setMobile(isMobile(userAgent));
  }, []);

  useEffect(() => {
    currentPowerRef.current = power;
  }, [power]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (powerIntervalRef.current) {
        clearInterval(powerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = `${basePath}/images/golf/golf-hole.png`;
    img.onload = () => {
      courseImageRef.current = img;
    };
  }, [basePath]);

  const [golferFrame, setGolferFrame] = useState(
    `${basePath}/images/golf/golfer-idle.png`
  );

  const chargingFrames = [
    `${basePath}/images/golf/golfer-idle.png`,
    `${basePath}/images/golf/golfer-bottom-left.png`,
    `${basePath}/images/golf/golfer-left.png`,
    `${basePath}/images/golf/golfer-top-left.png`,
    `${basePath}/images/golf/golfer-top.png`,
  ];

  const releaseFrames = [
    `${basePath}/images/golf/golfer-top.png`,
    `${basePath}/images/golf/golfer-top-left.png`,
    `${basePath}/images/golf/golfer-left.png`,
    `${basePath}/images/golf/golfer-bottom-left.png`,
    `${basePath}/images/golf/golfer-idle.png`,
    `${basePath}/images/golf/golfer-finish.png`,
  ];

  const playHitBallSound = () => {
    if (hitBallRef.current) {
      hitBallRef.current.currentTime = 0;
      hitBallRef.current.play();
    }
  };

  const clearPowerInterval = () => {
    if (powerIntervalRef.current) {
      clearInterval(powerIntervalRef.current);
      powerIntervalRef.current = null;
    }
  };

  const stopPowerCharge = () => {
    clearPowerInterval();
    setIsCharging(false);
  };

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    stopPowerCharge();
    setPower(0);
    setIsSwinging(false);
    setBallPosition(START_BALL_POSITION);
    setGolferPosition(getGolferPositionForBall(START_BALL_POSITION.x));
    setHasWon(false);
    setStrokes(0);
    setStatusMessage("Hold mouse button to charge your shot, then release to swing.");
    setGolferFrame(`${basePath}/images/golf/golfer-idle.png`);
  };

  const animateFrames = (frames, onComplete, holdLast = 0, onFrame = null) => {
    let i = 0;
    const interval = setInterval(() => {
      const frame = frames[i];
      setGolferFrame(frame);

      if (onFrame) {
        onFrame(frame, i);
      }

      i++;
      if (i >= frames.length) {
        clearInterval(interval);
        if (holdLast > 0) {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, holdLast);
        } else if (onComplete) {
          onComplete();
        }
      }
    }, 100);
  };

  const handleMouseDown = () => {
    if (hasWon || isSwinging) return;

    setStatusMessage("Charging...");
    powerDirectionRef.current = 1;
    setPower(0);
    setIsCharging(true);
    animateFrames(chargingFrames);
  };

  const handleMouseUp = () => {
    if (!isCharging || hasWon || isSwinging) return;

    const shotPower = Math.max(currentPowerRef.current, 5);
    stopPowerCharge();
    setPower(0);
    setIsSwinging(true);

    animateFrames(
      releaseFrames,
      () => {
        setGolferFrame(`${basePath}/images/golf/golfer-idle.png`);
      },
      250,
      (_, i) => {
        if (i === 2) {
          playHitBallSound();
          hitBall(shotPower);
        }
      }
    );
  };

  const handlePointerDown = (event) => {
    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    handleMouseDown();
  };

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    handleMouseUp();
  };

  useEffect(() => {
    if (isCharging) {
      powerIntervalRef.current = setInterval(() => {
        setPower((prev) => {
          let direction = powerDirectionRef.current;
          let next = prev + direction * 2;

          if (next >= 100) {
            next = 100;
            direction = -1;
          } else if (next <= 0) {
            next = 0;
            direction = 1;
          }

          powerDirectionRef.current = direction;
          return next;
        });
      }, 16);
    }

    return clearPowerInterval;
  }, [isCharging]);

  const drawCourseToCanvas = (width, height) => {
    const img = courseImageRef.current;
    if (!img || !img.width || !img.height) return null;

    if (!courseCanvasRef.current) {
      courseCanvasRef.current = document.createElement("canvas");
    }

    const canvas = courseCanvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const scale = Math.max(width / img.width, height / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = height - drawHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    return ctx;
  };

  const isWaterPixel = (r, g, b) => b > 115 && g > 95 && b > r + 25 && b >= g;

  const isInWaterHazardAtRest = (ballCenterX, ballCenterY, gameRect, holeCenterX) => {
    const nearCup = Math.abs(ballCenterX - holeCenterX) < gameRect.width * 0.05;
    if (nearCup) return false;

    const ctx = drawCourseToCanvas(
      Math.round(gameRect.width),
      Math.round(gameRect.height)
    );

    if (!ctx) {
      return false;
    }

    const sampleY = Math.round(gameRect.height - ballCenterY);
    const sampleOffsets = [
      { x: 0, y: 0 },
      { x: -6, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: -4 },
      { x: 0, y: 4 },
    ];

    let waterHits = 0;
    for (const offset of sampleOffsets) {
      const sampleX = Math.round(ballCenterX + offset.x);
      const px = Math.min(Math.max(sampleX, 0), Math.round(gameRect.width) - 1);
      const py = Math.min(Math.max(sampleY + offset.y, 0), Math.round(gameRect.height) - 1);

      const [r, g, b] = ctx.getImageData(px, py, 1, 1).data;
      if (isWaterPixel(r, g, b)) {
        waterHits++;
      }
    }

    return waterHits >= 3;
  };

  const hitBall = (shotPower) => {
    const gameEl = gameAreaRef.current;
    const flagEl = flagRef.current;

    if (!gameEl || !flagEl) {
      setIsSwinging(false);
      return;
    }

    let nextStroke = 0;
    setStrokes((prev) => {
      nextStroke = prev + 1;
      return nextStroke;
    });

    const startX = ballPosition.x;
    const startY = ballPosition.y;
    const flagRect = flagEl.getBoundingClientRect();
    const gameRect = gameEl.getBoundingClientRect();
    const holeCenterX = flagRect.left - gameRect.left + flagRect.width / 2;
    const holeCenterYFromTop = flagRect.bottom - gameRect.top - 3;
    const holeCenterY = gameRect.height - holeCenterYFromTop;

    const maxTravel = Math.max(gameRect.width - startX - 40, 250);
    const travelDistance = (shotPower / 100) * (maxTravel * 1.15);
    const targetX = Math.min(startX + travelDistance, gameRect.width - 20);

    let t = 0;
    const duration = Math.max(45, Math.round(125 - shotPower * 0.55));
    const peakHeight = Math.max(90, shotPower * 2.9);

    setStatusMessage(`Swing ${nextStroke}: ${Math.round(shotPower)}% power`);

    const animate = () => {
      t++;
      const progress = t / duration;
      const arc = -4 * peakHeight * progress * (progress - 1);
      const x = startX + (targetX - startX) * progress;
      const y = startY + arc;

      const clampedX = Math.min(Math.max(x, 20), gameRect.width - 20);
      const clampedY = Math.max(y, RESTING_BALL_Y);

      const ballCenterX = clampedX + BALL_SIZE / 2;
      const ballCenterY = clampedY + BALL_SIZE / 2;
      const distanceToHole = Math.hypot(
        ballCenterX - holeCenterX,
        ballCenterY - holeCenterY
      );

      if (distanceToHole < 14) {
        const settledBallX = holeCenterX - BALL_SIZE / 2;
        const settledBallY = holeCenterY - BALL_SIZE / 2;

        setBallPosition({ x: settledBallX, y: settledBallY });
        setGolferPosition(getGolferPositionForBall(settledBallX));
        setHasWon(true);
        setStatusMessage("You win");
        setIsSwinging(false);

        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      setBallPosition({ x: clampedX, y: clampedY });

      if (t < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        const settledX = clampedX;
        const settledCenterX = settledX + BALL_SIZE / 2;

        if (isInWaterHazardAtRest(settledCenterX, RESTING_BALL_Y + BALL_SIZE / 2, gameRect, holeCenterX)) {
          const dropX = Math.max(
            START_BALL_POSITION.x,
            Math.min(settledX - 90, gameRect.width * 0.68)
          );

          setBallPosition({ x: dropX, y: RESTING_BALL_Y });
          setGolferPosition(getGolferPositionForBall(dropX));
          setStatusMessage(
            "Splash! Ball finished in water. Dropped back on the fairway."
          );
        } else {
          setBallPosition({ x: settledX, y: RESTING_BALL_Y });
          setGolferPosition(getGolferPositionForBall(settledX));
          setStatusMessage("Missed the cup. Charge and try again.");
        }

        setIsSwinging(false);
      }
    };

    animate();
  };

  if (mobile) return <h1>Sorry, this is only available on desktop.</h1>;

  return (
    <React.Fragment>
      <Hero />

      <div className={styles.hud}>
        <p className={styles.statusText}>{statusMessage}</p>
        <p className={styles.strokeCount}>Strokes: {strokes}</p>
        <div className={styles.powerBar}>
          <div className={styles.powerFill} style={{ width: `${power}%` }} />
        </div>
      </div>

      <div className={styles.gameContainer}>
        <div
          className={styles.golfArea}
          ref={gameAreaRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <Image
            src={`${basePath}/images/golf/golf-hole.png`}
            alt="Golf Hole"
            fill
            draggable={false}
            style={{ objectFit: "cover", objectPosition: "bottom center" }}
          />

          <div
            className={styles.golfer}
            style={{
              left: `${golferPosition.x}px`,
              bottom: `${golferPosition.y}px`,
            }}
          >
            <Image
              src={golferFrame}
              alt="Golfer"
              width={200}
              height={200}
              draggable={false}
            />
          </div>

          <div
            className={styles.ball}
            style={{
              left: `${ballPosition.x}px`,
              bottom: `${ballPosition.y}px`,
            }}
          >
            <Image
              src={`${basePath}/images/golf/golf-ball.png`}
              alt="Golf Ball"
              width={BALL_SIZE}
              height={BALL_SIZE}
              draggable={false}
            />
          </div>

          <div
            ref={flagRef}
            className={styles.flag}
            style={{ right: "50px", bottom: "60px" }}
            aria-label="Golf flag"
          >
            <span className={styles.flagPole} />
            <span className={styles.flagBanner} />
            <span className={styles.cup} />
          </div>
        </div>

        <audio
          ref={hitBallRef}
          src={`${basePath}/soundfx/golf/swing-hit.mp3`}
          preload="auto"
        />
      </div>

      <Button
        title="Reset Round"
        className={styles.resetButton}
        onClick={handleReset}
      />
    </React.Fragment>
  );
};

export default HoleInOne;
