"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Accordion.module.css";

const Accordion = ({ accordionData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    /* If active index is equal to the clicked index, then it is already open so we want to close it by setting activeIndex to null.*/
    /* If active index is NOT equal to clicked index, then it is not already open se want it to open by setting activeIndex to the clicked index. */
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordionContainer}>
      {accordionData &&
        accordionData.map((item, key) => (
          <div
            className={styles.accordionSection}
            key={key}
            onClick={() => handleClick(key)}
          >
            <div className={styles.accordionTitleContainer}>
              {item?.title}
              <div className={styles.accordionIcon}>
                {activeIndex === key ? "-" : "+"}
              </div>
            </div>
            {activeIndex === key && (
              <div className={styles.accordionContentContainer}>
                {item?.content}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  accordionData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
