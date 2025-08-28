import Link from "next/link";
import styles from "./Navigation.module.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const Navigation = () => {
  return (
    <nav className={styles.navContainer}>
      <ProfilePicture />
      <Link href="/" title="Home" className={styles.linkWrapper}>
        Home
      </Link>
      <Link href="/about-me" title="About Me" className={styles.linkWrapper}>
        About Me
      </Link>
      <Link href="/projects" title="Projects" className={styles.linkWrapper}>
        Projects
      </Link>
      <Link href="/skills" title="Skills" className={styles.linkWrapper}>
        Skills
      </Link>
      <Link
        href="/github-repositories"
        title="GitHub Repositories"
        className={styles.linkWrapper}
      >
        GitHub Repositories
      </Link>
      <Link href="/contact" title="Contact" className={styles.linkWrapper}>
        Contact
      </Link>
      <Link href="/resume" title="Resume" className={styles.linkWrapper}>
        Resume
      </Link>
      <Link
        href="/hole-in-one"
        title="Hole in One"
        className={styles.linkWrapper}
      >
        Hole in One
      </Link>
      <Link
        href="/rock-paper-scissors"
        title="Rock, Paper, Scissors"
        className={styles.linkWrapper}
      >
        Rock, Paper, Scissors
      </Link>
      <Link
        href="/tic-tac-toe"
        title="Tic, Tac, Toe"
        className={styles.linkWrapper}
      >
        Tic, Tac, Toe
      </Link>
    </nav>
  );
};

export default Navigation;
