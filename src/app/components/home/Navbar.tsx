"use client"; // This line ensures the component is treated as a Client Component
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { paragraphs } from "@/app/constant/constant";

export default function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleNavItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.navbar}>
      <h3>{paragraphs.main.title[0].text}</h3>
      <ul className={styles.navList}>
        {paragraphs.main.head.map((item, index) => (
          <li
            key={index}
            className={`${styles.navItem} ${index === selectedIndex ? styles.selected : ""}`}
            onClick={() => handleNavItemClick(index)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
