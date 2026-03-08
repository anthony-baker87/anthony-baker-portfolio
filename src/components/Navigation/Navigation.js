"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navigation.module.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const Navigation = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/professional-work", label: "Professional Work" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Technical Skills" },
    { href: "/github-repositories", label: "GitHub Repositories" },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/pdfs/AnthonyBakerResume.pdf`,
      label: "Resume",
      external: true,
    },
    {
      href: "/games",
      label: "Games",
    },
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

        {links.map(({ href, label, external }) =>
          external ? (
            <a
              key={href}
              href={href}
              rel="noopener noreferrer"
              className={styles.linkWrapper}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ) : (
            <Link
              key={href}
              href={href}
              className={`${styles.linkWrapper} ${
                isActiveLink(href) ? styles.activeLink : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ),
        )}
      </nav>
    </>
  );
};

export default Navigation;
