import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.heroContainer}>
        <h1>Frontend React & Next.js Developer</h1>
        <p className={styles.intro}>
          I build modern, accessible, and high-performance web applications.
          With experience in React and Next.js, I turn complex designs into
          seamless, responsive interfaces.
        </p>
      </div>
      <div className={styles.aboutMeContainer}>
        <h2>About Me</h2>
        <p>
          Over the past 5+ years, I&apos;ve built responsive, scalable, and
          accessible interfaces, collaborating closely with designers and
          engineers to bring ideas to life. I enjoy creating reusable
          components, optimizing performance, and delivering user experiences
          that delight.
        </p>
        <h3>Highlighted Experience</h3>
        <ul>
          <li>
            Built a reusable donut chart component in React/Next.js, increasing
            UI consistency and improving lead-generation performance by 15%.
          </li>
          <li>
            Developed 20+ responsive interfaces at American Addiction Centers,
            reducing load times by 35% and improving accessibility.
          </li>
          <li>
            QA engineer experience with automated testing, ensuring high-quality
            releases and 99% uptime.
          </li>
        </ul>
      </div>
    </div>
  );
}
