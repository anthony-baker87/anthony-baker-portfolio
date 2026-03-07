import Link from "next/link";
import styles from "./page.module.css";
import { websites } from "@/utils/projects";

const ProfessionalWork = () => {
  return (
    <div className={styles.professionalWorkContainer}>
      <h1 className={styles.title}>Professional Work</h1>
      <p className={styles.subtitle}>
        Production websites I helped build and maintain for high traffic
        platforms, focused on performance, usability, and conversion driven
        experiences.
      </p>

      <div className={styles.projectsGrid}>
        {websites.map((site, index) => {
          const domain = site.link
            ? new URL(site.link).hostname.replace("www.", "")
            : "";

          return site.link ? (
            <Link
              key={index}
              href={site.link}
              title={site.title}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div className={styles.externalIcon}>↗</div>
              <div className={styles.cardTitle}>{site.title}</div>
              <div className={styles.domain}>{domain}</div>
              {site.note && <div className={styles.note}>{site.note}</div>}
            </Link>
          ) : (
            <div
              key={index}
              className={`${styles.projectCard} ${styles.inactive}`}
            >
              <div className={styles.cardTitle}>{site.title}</div>
              {site.note && <div className={styles.note}>{site.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalWork;
