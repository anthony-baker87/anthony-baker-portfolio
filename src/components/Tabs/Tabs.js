"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tabs.module.css";

const Tabs = ({ tabData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabRow}>
        {tabData.map((item, key) => (
          <div
            key={key}
            className={`${styles.tabTitle} ${
              activeIndex === key ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(key)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>{tabData[activeIndex]?.content}</div>
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
