"use client";
import { useState, useEffect } from "react";
import Cards from "@/components/Cards/Cards";
import styles from "./page.module.css";
import { fetchGitHubRepos } from "@/utils/github/github";

const GitHubRepositories = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      const mainRepos = await fetchGitHubRepos("anthony-baker87");
      const altRepos = await fetchGitHubRepos("memegineer");

      setCardData([
        {
          title: "My Main GitHub Account",
          content:
            "All of my main projects, scripts, and web apps are stored here.",
          link: "https://github.com/anthony-baker87",
          imageLink: mainRepos.length > 0 ? mainRepos[0].owner.avatar_url : "",
        },
        {
          title: "My Alternate GitHub Account",
          content:
            "Experimental and smaller side projects I like to tinker with.",
          link: "https://github.com/memegineer",
          imageLink: altRepos.length > 0 ? altRepos[0].owner.avatar_url : "",
        },
      ]);
    };

    loadCards();
    setLoading(false);
  }, []);

  return (
    <div className={styles.githubContainer}>
      <h1>My GitHub Repositories</h1>
      <div className={styles.cardsContainer}>
        {loading ? "Loading..." : <Cards cardsData={cardData} />}
      </div>
    </div>
  );
};

export default GitHubRepositories;
