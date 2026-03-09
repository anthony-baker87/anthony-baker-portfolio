import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <h1>Hole in One Golf Game</h1>
      <p>
        Click and hold anywhere in the game area to charge your shot, then
        release to swing.
      </p>
      <p>The power meter oscillates, so timing your release matters.</p>
      <p>
        Try to sink the ball in as few strokes as possible. Use Reset Round to
        start over.
      </p>
    </div>
  );
};

export default Hero;
