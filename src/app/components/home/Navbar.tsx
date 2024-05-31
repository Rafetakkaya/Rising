import React from "react";
import styles from "./navbar.module.css";
import { paragraphs } from "@/app/constant/constant";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <h3>{paragraphs.main.title[0].text}</h3>
      <ul>
        {paragraphs.main.head.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
