import styles from "./page.module.css";

export default function Home() {
  const strengths = [
    {
      title: "Frontend Development",
      description:
        "Building high traffic React and Next.js applications with a strong focus on performance, accessibility, and scalability.",
    },
    {
      title: "Performance Optimization",
      description:
        "Improving Core Web Vitals, SEO, load times, and conversion-focused user experiences across production applications.",
    },
    {
      title: "UI Systems",
      description:
        "Translating design systems into reusable components with responsive layouts, maintainable architecture, and clean user experiences.",
    },
  ];

  return (
    <div className={styles.homepageContainer}>
      <section className={styles.heroContainer}>
        <h1>Frontend React & Next.js Developer</h1>
        <p className={styles.intro}>
          Frontend Developer with 5+ years building high traffic, SEO-optimized
          React and Next.js applications in Agile environments.
        </p>
        <p className={styles.introSecondary}>
          I improve load times, accessibility, and user experience while helping
          drive conversion growth through performant, scalable frontend
          solutions.
        </p>
      </section>

      <section className={styles.strengthsContainer}>
        <h2>Core Strengths</h2>
        <div className={styles.strengthsGrid}>
          {strengths.map((strength) => (
            <div key={strength.title} className={styles.strengthCard}>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
