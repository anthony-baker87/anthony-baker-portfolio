import styles from "./page.module.css";

const skillsData = {
  Languages: ["JavaScript", "TypeScript", "HTML", "CSS", "PHP", "Python", "C#"],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Angular",
    "Node.js",
    "Express.js",
    "React Hook Form",
    "GraphQL",
    "Redux",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "WordPress",
    "Postman",
    "Docker",
    "NGINX",
    "AWS CodePipeline",
    "MongoDB",
    "PostgreSQL",
    "Salesforce",
    "Figma",
    "Jira",
    "Sentry",
    "GitHub Actions",
    "Vercel",
  ],
  "Performance & Web": [
    "Core Web Vitals",
    "Lighthouse",
    "PageSpeed Insights",
    "SEO Optimization",
    "Accessibility (WCAG)",
    "Responsive Design",
    "REST APIs",
    "Data Visualization",
    "Google Analytics",
    "Google Tag Manager",
    "AB Tasty",
  ],
  "Testing": ["Selenium", "BrowserStack", "Playwright", "Jest"],
};

export default function Skills() {
  return (
    <div className={styles.skillsContainer}>
      <h1 className={styles.title}>Technical Skills</h1>
      <p className={styles.subtitle}>
        Core technologies and tools I use to design, build, and optimize modern
        web applications.
      </p>

      <div className={styles.grid}>
        {Object.entries(skillsData).map(([category, items]) => (
          <div key={category} className={styles.card}>
            <h2 className={styles.category}>{category}</h2>
            <div className={styles.badges}>
              {items.map((skill, i) => (
                <span key={i} className={styles.badge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
