"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
import Hero from "@/components/Golf/Hero/Hero";
import Button from "@/components/Button/Button";
import { isMobile } from "@/utils/device";

const HoleInOne = () => {
  const [mobile, setMobile] = useState(false);
  const [power, setPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 40, y: 40 });
  const [golferPosition, setGolferPosition] = useState({ x: -70, y: -7 });
  const [hasWon, setHasWon] = useState(false);
  const [club, setClub] = useState(null);

  const animationRef = useRef(null);
  const gameAreaRef = useRef(null);
  const flagRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setMobile(isMobile(userAgent));
  }, []);

  const [golferFrame, setGolferFrame] = useState(
    "./images/golf/golfer-idle.png"
  );
  const chargingFrames = [
    "./images/golf/golfer-idle.png",
    "./images/golf/golfer-bottom-left.png",
    "./images/golf/golfer-left.png",
    "./images/golf/golfer-top-left.png",
    "./images/golf/golfer-top.png",
  ];
  const releaseFrames = [
    "./images/golf/golfer-top.png",
    "./images/golf/golfer-top-left.png",
    "./images/golf/golfer-left.png",
    "./images/golf/golfer-bottom-left.png",
    "./images/golf/golfer-idle.png",
    "./images/golf/golfer-finish.png",
  ];

  const hitBallRef = useRef(null);

  const playHitBallSound = () => {
    if (hitBallRef.current) {
      hitBallRef.current.currentTime = 0;
      hitBallRef.current.play();
    }
  };

  const handleReset = () => {
    setPower(0);
    setIsCharging(false);
    setBallPosition({ x: 40, y: 40 });
    setGolferPosition({ x: -70, y: -7 });
    setHasWon(false);
    setGolferFrame("./images/golf/golfer-idle.png");
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
        } else {
          if (onComplete) onComplete();
        }
      }
    }, 100);
  };

  const handleMouseDown = () => {
    setIsCharging(true);
    animateFrames(chargingFrames);
  };

  const handleMouseUp = () => {
    if (hasWon) return;
    setIsCharging(false);
    setPower(0);

    animateFrames(
      releaseFrames,
      () => {
        setGolferFrame("./images/golf/golfer-idle.png");
      },
      800,
      (frame) => {
        if (frame === "./images/golf/golfer-idle.png") {
          hitBall();
          playHitBallSound();
        }
      }
    );
  };

  useEffect(() => {
    let interval;
    if (isCharging) {
      interval = setInterval(() => {
        setPower((prev) => Math.min(prev + 1, 100));
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isCharging]);

  const hitBall = () => {
    const startX = ballPosition.x;
    const startY = ballPosition.y;

    const flagEl = flagRef.current;
    const gameEl = gameAreaRef.current;

    let flagX = 0;
    let flagY = 50;

    if (flagEl && gameEl) {
      const flagRect = flagEl.getBoundingClientRect();
      const gameRect = gameEl.getBoundingClientRect();
      flagX = flagRect.left - gameRect.left;
    }

    const targetX = startX + power * 30;
    const targetY = startY;

    let t = 0;
    const duration = 100;

    const animate = () => {
      t++;
      const progress = t / duration;
      const peakHeight = power * 8.5;
      const arc = -4 * peakHeight * progress * (progress - 1);

      const y = startY + (targetY - startY) * progress + arc;
      const x = startX + (targetX - startX) * progress;

      if (Math.abs(x - flagX) < 20 && Math.abs(y - flagY) < 30) {
        setBallPosition({ x: flagX, y: flagY });
        setHasWon(true);

        setGolferFrame("./images/golf/golfer-idle.png");
        setGolferPosition({ x: flagX - 110, y: flagY - 46 });

        cancelAnimationFrame(animationRef.current);
        return;
      }

      setBallPosition({ x, y });

      if (t < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setGolferFrame("./images/golf/golfer-idle.png");
        setGolferPosition({ x: x - 110, y: y - 46 });
      }
    };
    animate();
  };

  const clubOptions = [
    { value: "driver", label: "Driver" },
    { value: "9-iron", label: "9 Iron" },
    { value: "putter", label: "Putter" },
  ];

  if (mobile) return <h1>Sorry, this is only available on desktop.</h1>;

  return (
    <React.Fragment>
      <Hero />
      {hasWon && <div className={styles.winMessage}>You Win!</div>}
      <div className={styles.gameContainer}>
        {/* <Dropdown options={clubOptions} onSelect={setClub} /> */}
        <div
          className={styles.golfArea}
          ref={gameAreaRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <Image
            src="./images/golf/golf-hole.png"
            alt="Golf Hole"
            fill
            style={{ objectFit: "cover", objectPosition: "bottom center" }}
            priority
          />

          <div
            className={styles.golfer}
            style={{
              left: `${golferPosition.x}px`,
              bottom: `${golferPosition.y}px`,
            }}
          >
            <Image src={golferFrame} alt="Golfer" width={200} height={200} />
          </div>

          <div
            className={styles.ball}
            style={{
              left: `${ballPosition.x}px`,
              bottom: `${ballPosition.y}px`,
            }}
          >
            <Image
              src="./images/golf/golf-ball.png"
              alt="Golf Ball"
              width={30}
              height={30}
            />
          </div>

          <div
            ref={flagRef}
            className={styles.flag}
            style={{ right: "50px", bottom: "60px" }}
          >
            🚩
          </div>
        </div>

        <audio
          ref={hitBallRef}
          src="/soundfx/golf/swing-hit.mp3"
          preload="auto"
        />
      </div>
      <Button
        title="Reset Game"
        className={styles.resetButton}
        onClick={handleReset}
      />
    </React.Fragment>
  );
};

export default HoleInOne;
