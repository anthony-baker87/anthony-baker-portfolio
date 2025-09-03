import Link from "next/link";
import styles from "./page.module.css";
import { websites } from "@/utils/projects"; // import the array
import Cards from "@/components/Cards/Cards";
import { projectsData } from "@/utils/projects";

const Projects = () => {
  return (
    <div className={styles.projectsContainer}>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.subtitle}>
        Here are some of my professional projects:
      </p>
      <div className={styles.cardsContainer}>
        <Cards cardsData={projectsData} />
      </div>
      <p className={styles.subtitle}>
        Here are the websites I’ve worked on professionally:
      </p>
      <div className={styles.projectsGrid}>
        {websites.map((site, index) => {
          return site.link ? (
            <Link
              key={index}
              href={site.link}
              title={site.title}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div>{site.title}</div>
              {site.note && <div className={styles.note}>{site.note}</div>}
            </Link>
          ) : (
            <div
              key={index}
              className={`${styles.projectCard} ${styles.inactive}`}
            >
              <div>{site.title}</div>
              {site.note && <div className={styles.note}>{site.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
