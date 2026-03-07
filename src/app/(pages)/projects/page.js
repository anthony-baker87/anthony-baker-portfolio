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
        Selected projects demonstrating scalable frontend architecture,
        performance optimization, and measurable impact on user engagement and
        conversions.
      </p>
      <div className={styles.cardsContainer}>
        <Cards cardsData={projectsData} />
      </div>
    </div>
  );
};

export default Projects;
