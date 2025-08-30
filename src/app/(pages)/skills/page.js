import styles from "./page.module.css";

const skillsData = {
  Languages: [
    "JavaScript",
    "HTML",
    "CSS",
    "TypeScript",
    "SQL",
    "PHP",
    "Python",
    "C#",
    "C",
    "C++",
  ],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Angular",
    "Express.js",
  ],
  "Technical Skills": [
    "Agile",
    "Node.js",
    "Git",
    "GitHub",
    "NPM",
    "WordPress",
    "Selenium",
    "Figma",
    "Postman",
    "AWS CodePipeline",
    "Amazon Web Services",
    "MongoDB",
    "Salesforce",
    "AB Tasty",
    "Elfsight",
    "Slack",
    "Confluence",
    "BrowserStack",
    "Docker",
    "NGINX",
    "Sentry",
    "Responsive Web Design",
    "Front-end Component Design",
    "Debugging",
    "CI/CD",
    "RESTful APIs",
    "Data Structures",
    "API Implementation",
    "Teamwork",
    "Scrum",
    "HIPAA Compliance",
    "Google Analytics",
    "Google Tag Manager",
    "CallRail",
    "Data Visualization",
    "PageSpeed Insights",
  ],
};

export default function Skills() {
  return (
    <div className={styles.skillsContainer}>
      <h1 className={styles.title}>Skills</h1>
      <p className={styles.subtitle}>Here’s a breakdown of my technical skillset.</p>

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
