import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <h1>Hole in One Golf Game</h1>
      <p>This is a work in progress :)</p>
      <p>
        Click and hold anywhere on the game&apos;s screen and release when
        you&apos;re ready to hit the ball.
      </p>
      <p>See if you can hit the ball on the flag.</p>
      <p>
        Be careful, you can swing too hard and hit the ball off the screen. Hit
        reset to try again.
      </p>
    </div>
  );
};

export default Hero;
