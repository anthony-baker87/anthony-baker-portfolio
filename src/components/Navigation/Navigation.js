"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navigation.module.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const Navigation = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/github-repositories", label: "GitHub Repositories" },
    { href: "/resume", label: "Resume" },
    { href: "/hole-in-one", label: "Hole in One" },
    { href: "/rock-paper-scissors", label: "Rock, Paper, Scissors" },
    { href: "/tic-tac-toe", label: "Tic, Tac, Toe" },
  ];

  return (
    <>
      <div className={styles.mobileHeader}>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className={styles.mobileName}>Anthony Baker</span>
      </div>
      <nav className={`${styles.navContainer} ${menuOpen ? styles.open : ""}`}>
        <ProfilePicture />
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.linkWrapper} ${
              pathname === href ? styles.activeLink : ""
            }`}
            onClick={() => setMenuOpen(false)} // <- move here
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
