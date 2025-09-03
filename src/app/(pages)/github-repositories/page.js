"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { fetchGitHubRepos } from "@/utils/github/github";

export default function GitHubRepositories() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      const mainRepos = await fetchGitHubRepos("anthony-baker87");
      const altRepos = await fetchGitHubRepos("memegineer");

      setCardData([
        {
          title: "My Main GitHub Account",
          description:
            "All of my main projects, scripts, and web apps are stored here.",
          link: "https://github.com/anthony-baker87",
          avatar: mainRepos.length > 0 ? mainRepos[0].owner.avatar_url : "",
        },
        {
          title: "My Alternate GitHub Account",
          description:
            "Experimental and smaller side projects I like to tinker with.",
          link: "https://github.com/memegineer",
          avatar: altRepos.length > 0 ? altRepos[0].owner.avatar_url : "",
        },
      ]);

      setLoading(false);
    };

    loadCards();
  }, []);

  return (
    <div className={styles.githubContainer}>
      <h1 className={styles.heading}>My GitHub Repositories</h1>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {cardData.map((repo, i) => (
            <a
              key={i}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              {repo.avatar && (
                <div className={styles.avatarWrapper}>
                  <Image
                    src={repo.avatar}
                    alt={repo.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <h2 className={styles.cardTitle}>{repo.title}</h2>
              <p className={styles.cardDescription}>{repo.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
