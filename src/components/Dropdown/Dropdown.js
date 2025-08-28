"use client";
import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options = [], title = "Choose a club: ", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const list = options.length ? options : mockData;

  // close dropdown if clicking outside of the dropdown component
  useEffect(() => {
    const handleClickOutside = (event) => {
      // check if click is NOT on dropdown elements
      if (
        !event.target.closest(`.${styles.dropdown}`) &&
        !event.target.closest(`.${styles.optionsList}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownTitle}>{title}</div>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <div className={styles.selectedValue}>
          {selected ? selected.label : "Select..."}{" "}
          <span>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className={styles.optionsList}>
            {list
              .filter((option) => !selected || option.value !== selected.value)
              .map((option) => (
                <div
                  key={option.value}
                  className={styles.option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    if (onSelect) onSelect(option?.value);
                  }}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
